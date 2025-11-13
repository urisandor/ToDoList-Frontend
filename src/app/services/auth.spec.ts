import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs'; // Importáljuk a 'tap'-et a mellékhatásokhoz

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Az API URL-je most az 'Auth' kontrollerre mutat
  private readonly apiUrl = 'https://localhost:7230/api/Auth'; // Ellenőrizd a portot!
  private readonly TOKEN_KEY = 'auth_token'; // Kulcs a token tárolásához

  constructor(private http: HttpClient) { }

  /**
   * Regisztrációs kérés küldése a backendnek.
   * @param userData A felhasználó adatai (username, email, password)
   */
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  /**
   * Bejelentkezési kérés küldése a backendnek.
   * @param credentials A felhasználó adatai (email, password)
   */
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      // A 'tap' operátorral "belesünk" a válaszba anélkül, hogy módosítanánk.
      // Itt mentjük el a tokent, ha sikeres a bejelentkezés.
      tap((response: any) => {
        if (response && response.token) {
          this.saveToken(response.token);
        }
      })
    );
  }

  /**
   * Kijelentkezés: egyszerűen töröljük a tokent.
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  /**
   * Elmenti a kapott tokent a böngésző localStorage-ába.
   */
  private saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /**
   * Visszaadja a mentett tokent.
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Ellenőrzi, hogy a felhasználó be van-e jelentkezve (van-e érvényes token).
   * (Később ezt ki lehet egészíteni a token lejáratának ellenőrzésével).
   */
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}