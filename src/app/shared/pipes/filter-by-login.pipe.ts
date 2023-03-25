import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';

@Pipe({
  name: 'filterByLogin',
})
export class FilterByLoginPipe implements PipeTransform {
  transform(value: User[], login: string): any {
    const arr = value.filter((user) => user.login === login);
    return Object(arr[0]).name;
  }
}
