import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandComponent } from './brand.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MicroModule } from 'src/app/micro/micro.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { IconsModule } from 'angular-bootstrap-md';
import { FilterListModule } from 'src/app/shared/filter-list/filter-list.module';
import { RouterModule, Routes } from '@angular/router';
import { GtagModule } from 'src/app/gtag/gtag.module';
import { Constants } from 'src/app/constants';

const routes: Routes = [
  { path: '', component: BrandComponent, pathMatch: 'full' },
];
@NgModule({
  declarations: [BrandComponent],
  imports: [
    CommonModule,
    SharedModule,
    MicroModule,
    LazyLoadImageModule,
    IconsModule,
    FilterListModule,
    RouterModule.forChild(routes),
    GtagModule.init({
      targetId: Constants.GTAG
    })
  ],
})
export class BrandModule {}
