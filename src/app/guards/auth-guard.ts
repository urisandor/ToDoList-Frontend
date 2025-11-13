// src/app/guards/auth.guard.ts (vagy auth.ts)

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/AuthService'; // A te auth.service fájlod

/**
 * Ez a Guard eldönti, hogy a felhasználó beléphet-e egy adott útvonalra.
 */
export const authGuard: CanActivateFn = (route, state) => {
  
  // Behúzzuk (inject) a szolgáltatásokat
  const authService = inject(AuthService);
  const router = inject(Router);

  // 1. Ellenőrizzük, hogy be van-e jelentkezve?
  if (authService.isLoggedIn()) {
    return true; // Igen, beléphet.
  }

  // 2. Ha nincs bejelentkezve, átirányítjuk a login oldalra
  console.log('Access denied! Redirecting to login.');
  router.navigate(['/login']);
  return false; // Nem, nem léphet be.
};