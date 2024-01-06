import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignComponent } from './campaign.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MicroModule } from 'src/app/micro/micro.module';
import { FilterListModule } from 'src/app/shared/filter-list/filter-list.module';
import { RouterModule, Routes } from '@angular/router';
import { GtagModule } from 'src/app/gtag/gtag.module';
import { Constants } from 'src/app/constants';

const routes: Routes = [
  { path: '', component: CampaignComponent, pathMatch: 'full' }
]

@NgModule({
  declarations: [CampaignComponent],
  imports: [
    CommonModule,
    SharedModule,
    MicroModule,
    FilterListModule,
    RouterModule.forChild(routes),
    GtagModule.init({
      targetId: Constants.GTAG
    })
  ]
})
export class CampaignModule { }
