import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nextLine'
})
export class CustomNextLinePipe implements PipeTransform {

  transform(value: string): string {
    return value.replace('|','<br>');
  }

}
