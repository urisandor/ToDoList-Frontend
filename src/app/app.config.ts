import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideReactiveFormsModule } from "@angular/forms";
import { authInterceptor } from './interceptors/auth-interceptor'; // Vagy 'auth' a fájlneved szerint

export const appConfig: ApplicationConfig = {
  providers: [
    provideReactiveFormsModule(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor]) // Hozzáadjuk az auth interceptort
    )
  ]
};
