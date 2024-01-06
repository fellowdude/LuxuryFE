import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noNextLine'
})
export class CustomEraseNextLineCharacterPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace('|','');
  }

}
