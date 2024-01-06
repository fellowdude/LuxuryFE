import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NoPasteDirective } from './no-paste.directive';
import { OnlyNumbersDirective } from './only-numbers.directive';

@NgModule({
  declarations: [NoPasteDirective, OnlyNumbersDirective],
  exports: [NoPasteDirective, OnlyNumbersDirective],
  imports: [CommonModule],
})
export class DirectivesModule {}
