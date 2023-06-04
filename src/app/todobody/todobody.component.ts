import { Component, inject } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
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
  currentItem ? : TodoItem | undefined;
  constructor() {
  }

  clickItem = (item: TodoItem) => { this.currentItem = item; }

  getItem = () => {
    this.todoService.getApiItems().subscribe(data =>
      {
        this.data = data;
      });
      this.todoService.setItems(this.data)
      this.data = this.todoService.getItems();
  }

  updateItem = (item : TodoItem) => {
    console.log(`updateIte start:`)
    console.log(item)

    if(this.currentItem) {
      this.todoService.setApiItem(item).subscribe(data=>{
        console.log(data)

      });
    }

    console.log('updateIte end')
  }
  getItemCount = () => this.data.length;
}
