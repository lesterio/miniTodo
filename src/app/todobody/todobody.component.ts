import { TodoItem } from './../dto/todo-item';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { TodoService } from '../services/todo.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todobody',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './todobody.component.html',
  styleUrls: ['./todobody.component.css']
})
export class TodobodyComponent {
  filterState = '';
  todoService = inject(TodoService);
  data : TodoItem[] = [];
  filterData :  TodoItem[] =[];
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

  setItems = ( items :  TodoItem[]) => {
    this.data = this.todoService.setItems(items);
  }
  filterItem = (state : string , items : TodoItem[] ) => {
    if(state === '') {
      this.filterData = this.data
    }
    else{
      this.filterData = this.data.filter(item => item.itemCompleted === state);
    }
  }

  getItem = (state : string) => {
    this.todoService.getApiItems().subscribe(data =>
      {
        this.setItems(data)
        this.filterItem(state, this.data)
      });
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
  getItemCount_Create = () => this.data.filter(item => item.itemCompleted === '0').length;
  getItemCount_Processing = () => this.data.filter(item => item.itemCompleted === '1').length
  getItemCount_Completed = () => this.data.filter(item => item.itemCompleted === '9').length

  deleteItem = (item : TodoItem) => {
    console.log(item.todoId)
    this.todoService.removeApiItem(item.todoId).subscribe(data=>{
          console.log(data)
        });
  }
}
