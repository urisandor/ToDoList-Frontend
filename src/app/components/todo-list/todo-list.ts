// src/app/components/todo-list/todo-list.ts
import { Component, OnInit } from '@angular/core'; // Adj 'OnInit'-et az importokhoz
import { CommonModule } from '@angular/common'; // Ezt is importáljuk
import { TodoService, TodoItem } from '../../services/todo.service'; // A szolgáltatásunk

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule], // Ide került a CommonModule az *ngFor miatt
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css'
})
export class TodoListComponent implements OnInit { // Implementáljuk az OnInit-et

  // --- Ide kerültek a logikai részek ---
  public title: string = 'Teendők listája';
  public todos: TodoItem[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(
      (result) => {
        this.todos = result;
        console.log('Sikeresen lekért adatok:', result);
      },
      (error) => {
        console.error('Hiba történt az adatok lekérésekor:', error);
      }
    );
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe(
      () => {
        this.todos = this.todos.filter(todo => todo.id !== id);
        console.log(`Todo (id: ${id}) sikeresen törölve.`);
      },
      (error) => {
        console.error(`Hiba történt a(z) ${id} azonosítójú todo törlésekor:`, error);
      }
    );
  }
  // --- Eddig ---
}