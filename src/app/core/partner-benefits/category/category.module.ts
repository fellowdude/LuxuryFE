import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FilterListModule } from 'src/app/shared/filter-list/filter-list.module';

const routes: Routes = [
  { path: '', component: CategoryComponent, pathMatch: 'full' },
];
@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    FilterListModule,
    RouterModule.forChild(routes),
  ],
})
export class CategoryModule {}
