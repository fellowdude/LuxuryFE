import { CommonModule } from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MicroModule } from 'src/app/micro/micro.module';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    LazyLoadImageModule,
    MicroModule,
    RouterModule.forChild(routes),
  ],
})
export class NotFoundModule {}
