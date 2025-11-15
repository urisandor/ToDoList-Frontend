// src/app/app.routes.ts
import { Routes } from '@angular/router';
// 1. Importáljuk az összes komponenst, amire szükségünk van
import { RegisterComponent } from './components/register/register';
import { LoginComponent } from './components/login/login';
import { TodoListComponent } from './components/todo-list/todo-list';

// 2. Beállítjuk az útvonalakat
export const routes: Routes = [
  { 
    path: 'login', // Ha a böngészőben /login-t írnak be
    component: LoginComponent // Akkor a LoginComponent-et töltjük be
  },
  { 
    path: 'register', // Ha /register-t írnak be
    component: RegisterComponent // Akkor a RegisterComponent-et
  },
  {
    path: 'todos', // Ha /todos-t írnak be
    component: TodoListComponent // Akkor a TodoListComponent-et (az új helye)
  },
  { 
    path: '', // Az alapértelmezett (üres) útvonal
    redirectTo: '/login', // Irányítson át a /login oldalra
    pathMatch: 'full' // Ez kell, hogy pontosan csak az üres útvonalra reagáljon
  }
];