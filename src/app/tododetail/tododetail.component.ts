import { TodoService } from './../services/todo.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoItem } from '../dto/todo-item';

@Component({
  selector: 'app-tododetail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tododetail.component.html',
  styleUrls: ['./tododetail.component.css']
})
export class TododetailComponent implements OnInit{

  todoService = inject(TodoService);
  displayItem : TodoItem | undefined;

  private _id = 0;
  get ID() { return this._id}
  set ID(value) { this._id = value; }

  private _descrpition = '';
  get Description() { return this._descrpition; }
  set Description(value) { this._descrpition = value; }
  setDescription = (value: string) => { this._descrpition = value; }

  private _state = '';
  get State() { return this._state; }
  set State(value : string) { this._state = value; }
  setState = (value : string) => { this.State = value; }

  private _item? : TodoItem | undefined;
  @Input() public set Item(item : TodoItem  | undefined) {
    this._item = item;
    this.displayItem = item;
    this.Description = item!.itemDescription;
    this.State = item!.itemCompleted;
    this.ID = item!.todoId;
  }
  public get Item() : TodoItem| undefined{
    return this._item;
  }

  ngOnInit(): void {
    console.log(this._item);
  }

  canCreate = () => { return !(this._item===undefined || this._item?.todoId===0) };
  canModify = () => { return (this._item===undefined || this._item?.todoId===0) };

  CreateItem = () => {
    let newItem : TodoItem = { todoId : 0 , itemDescription : this._descrpition, itemCompleted : this._state ,itemCreatetime : new Date() , itemUpdatedtime: new Date() };
    console.log(newItem);
    this.todoService.addApiItem(newItem).subscribe(res => {
      console.log(res);
    });
  }

  ModifyItem = () =>{
    let newItem : TodoItem = { todoId : this.ID, itemDescription : this.Description, itemCompleted : this.State,itemCreatetime : new Date(), itemUpdatedtime: new Date() };
    this.todoService.setApiItem(newItem).subscribe(res => {
      console.log(res);
    });
  }

  DeleteItem =() =>{
    this.todoService.removeApiItem(this.ID).subscribe(res => {
      console.log(res);
    });
  }

  getSelectedItem(item:TodoItem)
  {
    console.log(item);
    this._item = item;
  }

  clearItem = () => {
    this._item = undefined;
    this.Description = '';
    this.State = '0';
    this.ID = 0;
  }
}
