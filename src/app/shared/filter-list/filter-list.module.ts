import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterListComponent } from './filter-list.component';
import { FilterCheckboxComponent } from './filter-checkbox/filter-checkbox.component';
import { FilterRadialComponent } from './filter-radial/filter-radial.component';
import { FilterBooleanComponent } from './filter-boolean/filter-boolean.component';
import { FilterRangeComponent } from './filter-range/filter-range.component';
import { CheckboxModule, IconsModule } from 'angular-bootstrap-md';
import { MicroModule } from 'src/app/micro/micro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FakeFilterComponent } from './fake-filter/fake-filter.component';
import { FakeFilterListComponent } from './fake-filter-list/fake-filter-list.component';



@NgModule({
  declarations: [
    FilterListComponent,
    FilterCheckboxComponent,
    FilterRadialComponent,
    FilterBooleanComponent,
    FilterRangeComponent,
    FakeFilterComponent,
    FakeFilterListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CheckboxModule,
    MicroModule,
    IconsModule,
  ],
  exports: [
    FilterListComponent,
    FakeFilterListComponent,
    FilterRangeComponent,
    FilterCheckboxComponent,
  ]
})
export class FilterListModule { }
