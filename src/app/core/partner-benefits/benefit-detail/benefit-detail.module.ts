import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenefitDetailComponent } from './benefit-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MicroModule } from 'src/app/micro/micro.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: BenefitDetailComponent, pathMatch: 'full' }
]
@NgModule({
  declarations: [BenefitDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    MicroModule,
    RouterModule.forChild(routes)
  ]
})
export class BenefitDetailModule { }
