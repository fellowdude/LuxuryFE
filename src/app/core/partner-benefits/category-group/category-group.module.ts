import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryGroupComponent } from './category-group.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryGroupResolver } from 'src/app/resolvers/core/store/category-group.resolver';

const routes: Routes = [
  { path: '', component: CategoryGroupComponent, pathMatch: 'full'},
];
@NgModule({
  declarations: [CategoryGroupComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class CategoryGroupModule {}
