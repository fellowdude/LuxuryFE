import { ButtonComponent } from './button/button.component';
import { ButtonPreloadComponent } from './button-preload/button-preload.component';
import {
  ButtonsModule,
  CollapseModule,
  WavesModule,
} from 'angular-bootstrap-md';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RadioButtonComponent } from './radio-button/radio-button.component';

@NgModule({
  declarations: [
    ButtonComponent,
    ButtonPreloadComponent,
    CheckboxComponent,
    RadioButtonComponent,
  ],
  exports: [
    ButtonComponent,
    ButtonPreloadComponent,
    CheckboxComponent,
    RadioButtonComponent,
  ],
  imports: [
    ButtonsModule,
    CollapseModule,
    CommonModule,
    FormsModule,
    WavesModule,
  ],
})
export class MicroModule {}
