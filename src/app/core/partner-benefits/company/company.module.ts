import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FilterListModule } from 'src/app/shared/filter-list/filter-list.module';
import { MicroModule } from 'src/app/micro/micro.module';

const routes: Routes = [
  { path: '', component: CompanyComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [CompanyComponent],
  imports: [
    SharedModule,
    MicroModule,
    FilterListModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class CompanyModule {}
