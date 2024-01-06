import { BenefitDetailResolver } from 'src/app/resolvers/core/partner-benefits/benefit-detail.resolver';
import { CategoryGroupResolver } from 'src/app/resolvers/core/partner-benefits/category-group.resolver';
import { CategoryResolver } from 'src/app/resolvers/core/partner-benefits/category.resolver';
import { CommonModule } from '@angular/common';
import { CompanyResolver } from 'src/app/resolvers/core/partner-benefits/company.resolver';
import { ModalModule } from 'angular-bootstrap-md';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/inicio' },
  { path: ':group/categoria', pathMatch: 'full', redirectTo: '/inicio' },
  {
    path: ':group/categoria/:category/empresa',
    pathMatch: 'full',
    redirectTo: '/inicio',
  },
  {
    path: ':group/categoria/:category/empresa/:company/beneficio',
    pathMatch: 'full',
    redirectTo: '/inicio',
  },
  {
    path: ':group',
    loadChildren: () =>
      import('./category-group/category-group.module').then(
        (m) => m.CategoryGroupModule
      ),
    resolve: { resolved: CategoryGroupResolver },
  },
  {
    path: ':group/categoria/:category',
    loadChildren: () =>
      import('./category/category.module').then((m) => m.CategoryModule),
    resolve: { resolved: CategoryResolver },
  },
  {
    path: ':group/categoria/:category/empresa/:company',
    loadChildren: () =>
      import('./company/company.module').then((m) => m.CompanyModule),
    resolve: { resolved: CompanyResolver },
  },
  {
    path: ':group/categoria/:category/empresa/:company/beneficio/:benefit',
    loadChildren: () =>
      import('./benefit-detail/benefit-detail.module').then(
        (m) => m.BenefitDetailModule
      ),
    resolve: { resolved: BenefitDetailResolver },
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ModalModule, RouterModule.forChild(routes)],
})
export class PartnerBenefitsModule {}
