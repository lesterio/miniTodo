import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodobodyComponent } from './todobody/todobody.component';
import { TododetailComponent } from './tododetail/tododetail.component';
import { TodoItem } from './dto/todo-item';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,TodobodyComponent,TododetailComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'miniTodo';
  selectedItem? : TodoItem ;

  getSelectedItem(item : TodoItem) : void {
    this.selectedItem = item;
  }
}
