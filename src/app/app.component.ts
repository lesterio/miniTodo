import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodobodyComponent } from './todobody/todobody.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,TodobodyComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'miniTodo';
}
