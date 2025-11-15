// src/app/components/login/login.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// 1. Importok (ugyanazok kellenek, mint a regisztrációnál)
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/AuthService'; // A szolgáltatásod
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  // 2. Importok hozzáadása itt is
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html', // A te fájlneved
  styleUrl: './login.css'    // A te fájlneved
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // 3. Az űrlap felépítése (itt csak email és jelszó kell)
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  // 4. Ez a metódus fut le az űrlap elküldésekor
  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.errorMessage = null;

    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        console.log('Sikeres bejelentkezés!', response);
        // Sikeres bejelentkezés után átirányítjuk a főoldalra
        // Később ez lesz a teendők listája (pl. '/todos')
        this.router.navigate(['/todos']); 
      },
      (error) => {
        console.error('Hiba a bejelentkezés során:', error);
        // A backend "Unauthorized" üzenetét jelenítjük meg
        this.errorMessage = error.error?.message || error.error || 'Hibás email cím vagy jelszó.';
      }
    );
  }
}