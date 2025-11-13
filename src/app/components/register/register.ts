import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/AuthService';
import { Router } from '@angular/router'; // Importáld a Router-t a átirányításhoz


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
registerForm: FormGroup;
  errorMessage: string | null = null; // Hibaüzenet tárolására

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router // Injektáljuk a Router-t
  ) {
    // 3. Az űrlap felépítése validátorokkal
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  
  // 4. Ez a metódus fut le az űrlap elküldésekor
  onSubmit(): void {
    if (this.registerForm.invalid) {
      return; // Ha az űrlap érvénytelen, ne tegyen semmit
    }

    this.errorMessage = null; // Hibaüzenet törlése

    this.authService.register(this.registerForm.value).subscribe(
      (response) => {
        console.log('Sikeres regisztráció!', response);
        // Sikeres regisztráció után átirányítjuk a login oldalra
        this.router.navigate(['/login']); 
      },
      (error) => {
        console.error('Hiba a regisztráció során:', error);
        // Backend hibaüzenetének megjelenítése
        this.errorMessage = error.error?.message || error.error || 'Ismeretlen hiba történt.'; 
      }
    );
  }
}
