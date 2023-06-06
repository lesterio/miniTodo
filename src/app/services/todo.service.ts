import { Injectable,inject } from '@angular/core';
import { TodoItem } from '../dto/todo-item';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  httpClient = inject( HttpClient );
  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8'
    })
  };
  data : TodoItem[] =[];
  endpoint = `/api`

  constructor() { }
  getApiItems = () => { return this.httpClient.get<TodoItem[]>(`${this.endpoint}/todo/getItem`,this.httpOption)}
  addApiItem = (item:TodoItem) => {
    return this.httpClient.post<TodoItem[]>(`${this.endpoint}/todo/Item` , item , this.httpOption)
  }
  setApiItem = ( item : TodoItem) => {
    return this.httpClient.put<TodoItem[]>(`${this.endpoint}/todo/Item/` , item , this.httpOption)}
  removeApiItem = (id : number) => {
    return this.httpClient.delete(`${this.endpoint}/todo/Item/${id}` ,this.httpOption)
  }
  setItems = ( data : TodoItem[] ) => {
    this.data = data;
    console.log(`setItems:${this.data}`)
    return this.data;
  }
  setItem = (item : TodoItem) =>  { return this.data.filter(i => i.todoId!== item.todoId).push(item);}

  getItems = () => { return this.data;}
  removeItem = (id : number) => { return this.data.filter(i => i.todoId !== id)};

  existItem = (item: TodoItem) => { return this.data.filter(i => item.todoId === i.todoId).length > 0};
  addItem = (item: TodoItem) => { return this.data.push(item); };
  getItemCount = () => {return this.data.length;}
  getStateCount = (state : string) => {return this.data.filter(i => i.itemCompleted === state).length;}
}
