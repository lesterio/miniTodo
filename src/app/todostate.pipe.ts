import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'todoState',
  standalone: true
})
export class TodoStatePipe implements PipeTransform {

  transform(value : string): string {
    switch (value) {
      case '0' : return 'Create';
      case '1' : return 'Processing';
      case '9' : return 'Completed';
      default : return value.toString();
    }
  }
}
