import { Component, EventEmitter, Output, inject } from '@angular/core';
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
  @Output() outputItemEvent = new EventEmitter<TodoItem>();
  constructor() {
  }

  clickItem = (item: TodoItem) => {
    this.currentItem = item;
    console.log('output->');
    console.log(item);
    this.outputItemEvent.emit(item);
  }

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

  deleteItem = (item : TodoItem) => {
    console.log(item.todoId)
    this.todoService.removeApiItem(item.todoId).subscribe(data=>{
          console.log(data)
        });
  }
}
