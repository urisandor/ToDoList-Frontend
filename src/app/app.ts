import { Component, signal, OnInit } from '@angular/core';
import { TodoService, TodoItem } from './services/todo.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})


export class App implements OnInit {

  title = 'ToDoList-Frontend';
  // 6. Hozz létre egy változót a teendők tárolására
  public todos: TodoItem[] = [];

  // 7. Injektáld a TodoService-t a konstruktorba
  constructor(private todoService: TodoService) {}

  // 8. Ez a metódus lefut, amikor a komponens betöltődik
  ngOnInit(): void {
    // Itt hívjuk meg a szolgáltatást
    this.todoService.getTodos().subscribe(
      (result) => {
        // Ha sikeres a hívás, a 'result' tartalmazza a teendők listáját
        this.todos = result;
        console.log('Sikeresen lekért adatok:', result);
      },
      (error) => {
        // Hiba esetén kiírjuk a konzolra
        console.error('Hiba történt az adatok lekérésekor:', error);
      }
    );
  }

  deleteTodo(id: number): void {
    // 1. Meghívjuk a szolgáltatás deleteTodo metódusát
    this.todoService.deleteTodo(id).subscribe(
      () => {
        // 2. Ha a törlés sikeres volt (a backend 'NoContent'-et küldött),
        // frissítenünk kell a listánkat a képernyőn.
        // Eltávolítjuk az elemet a 'this.todos' tömbből.
        this.todos = this.todos.filter(todo => todo.id !== id);
        console.log(`Todo (id: ${id}) sikeresen törölve.`);
      },
      (error) => {
        // Hiba esetén kiírjuk a konzolra
        console.error(`Hiba történt a(z) ${id} azonosítójú todo törlésekor:`, error);
      }
    );
  }

}
