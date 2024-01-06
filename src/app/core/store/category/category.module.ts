import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MicroModule } from 'src/app/micro/micro.module';
import { FilterListModule } from 'src/app/shared/filter-list/filter-list.module';
import { RouterModule, Routes } from '@angular/router';
import { GtagModule } from 'src/app/gtag/gtag.module';
import { Constants } from 'src/app/constants';

const routes: Routes = [
  { path: '', component: CategoryComponent, pathMatch: 'full' }
]
@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    MicroModule,
    FilterListModule,
    RouterModule.forChild(routes),
    GtagModule.init({
      targetId: Constants.GTAG
    })
  ],
})
export class CategoryModule {}
