// src/app/services/todo.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TodoItem {
  id: number;
  name: string;
  isComplete: boolean;
  userId: number; // Ezt a .NET modellben hoztuk létre
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // 2. Addj hozzá egy "private readonly" API URL-t
  private readonly apiUrl = 'http://localhost:7230/api/TodoItems'; // <-- Cseréld le a .NET API-d portjára!

  // 3. Injektáld a HttpClient-t a konstruktorba
  constructor(private http: HttpClient) { }

  // Ide jönnek majd a metódusok (pl. getTodos, addTodo...)
  getTodos(): Observable<TodoItem[]> {
    // Egy GET kérést küldünk a backend /api/TodoItems végpontjára
    // (A végpont nevét ellenőrizni kell a .NET Controllerben!)
    return this.http.get<TodoItem[]>(`${this.apiUrl}/api/TodoItems`);
  }
  //deleteTodo metódus hozzáadva
  deleteTodo(id: number): Observable<void> {
    // Egy DELETE kérést küldünk a backend /api/TodoItems/{id} végpontjára
    // Pl: https://localhost:7230/api/TodoItems/5
    return this.http.delete<void>(`${this.apiUrl}/api/TodoItems/${id}`);
  }

  addTodo(todoName: string): Observable<TodoItem> {
    // A backend egy { "name": "..." } objektumot vár
    const todoDto = { name: todoName };
    
    // Egy POST kérést küldünk a backend /api/TodoItems végpontjára
    return this.http.post<TodoItem>(`${this.apiUrl}`, todoDto);
  }


}