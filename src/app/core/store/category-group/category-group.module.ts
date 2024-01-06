import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CategoryGroupComponent } from './category-group.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: CategoryGroupComponent, pathMatch: 'full' }
]
@NgModule({
  declarations: [
    CategoryGroupComponent,
  ],
  imports: [
    CommonModule,
    CarouselModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
})
export class CategoryGroupModule {}
