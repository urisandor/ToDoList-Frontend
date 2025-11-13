// src/app/interceptors/auth.interceptor.ts (vagy auth.ts)

import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/AuthService'; // A te auth.service fájlod

/**
 * Ez az elfogó (Interceptor) automatikusan hozzáadja a JWT tokent
 * minden kimenő HTTP kérés fejlécéhez.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  // 1. Behúzzuk (inject) az AuthService-t
  const authService = inject(AuthService);

  // 2. Lekérjük az aktuális tokent
  const token = authService.getToken();

  // 3. Ha van tokenünk...
  if (token) {
    // ...létrehozunk egy másolatot az eredeti kérésből (req),
    // de kiegészítjük egy új 'Authorization' fejléccel.
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}` // Ez a "Bearer" séma
      }
    });
    // 4. A módosított kérést (clonedReq) küldjük tovább
    return next(clonedReq);
  }

  // 5. Ha nincs token, az eredeti kérést küldjük tovább módosítás nélkül
  return next(req);
};
