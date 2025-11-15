// src/app/components/todo-list/todo-list.ts
import { Component, OnInit } from '@angular/core'; // Adj 'OnInit'-et az importokhoz
import { CommonModule } from '@angular/common'; // Ezt is importáljuk
import { TodoService, TodoItem } from '../../services/todo.service'; // A szolgáltatásunk
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule], // Ide került a CommonModule az *ngFor miatt
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css'
})
export class TodoListComponent implements OnInit { // Implementáljuk az OnInit-et

  // --- Ide kerültek a logikai részek ---
  public title: string = 'Teendők listája';
  public todos: TodoItem[] = [];
  public newTaskName: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }
  loadTodos(): void {
  this.todoService.getTodos().subscribe(
      (result) => {
        this.todos = result;
      },
      (error) => {
        console.error('Hiba történt az adatok lekérésekor:', error);
      }
    );
  }
  onAddTask(): void {
    // Ellenőrizzük, hogy nem üres-e a mező
    if (!this.newTaskName || this.newTaskName.trim() === '') {
      return; 
    }

    this.todoService.addTodo(this.newTaskName.trim()).subscribe(
      (newTask) => {
        // Ha a backend sikeresen létrehozta,
        // hozzáadjuk a listánkhoz a képernyőn
        this.todos.push(newTask);
        
        // Kiürítjük az input mezőt
        this.newTaskName = ''; 
      },
      (error) => {
        console.error('Hiba a teendő hozzáadásakor:', error);
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
}