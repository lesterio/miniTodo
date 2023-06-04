import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoItem } from '../dto/todo-item';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todobody',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todobody.component.html',
  styleUrls: ['./todobody.component.css']
})
export class TodobodyComponent {
  data : TodoItem[] = [];
  todoService = inject(TodoService);
  constructor() {
  }

  getItem = () => {
    this.todoService.getApiItems().subscribe(data =>
      {
        this.data = data;
      });
      this.todoService.setItems(this.data)
      this.data = this.todoService.getItems();
  }
  getItemCount = () => this.data.length;
}
