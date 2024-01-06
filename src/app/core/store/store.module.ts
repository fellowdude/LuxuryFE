import { BrandResolver } from 'src/app/resolvers/core/store/brand.resolver';
import { CampaignResolver } from 'src/app/resolvers/core/store/campaign.resolver';
import { CategoryGroupResolver } from 'src/app/resolvers/core/store/category-group.resolver';
import { CategoryResolver } from 'src/app/resolvers/core/store/category.resolver';
import { CommonModule } from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ModalModule } from 'angular-bootstrap-md';
import { NgModule } from '@angular/core';
import { ProductDetailResolver } from 'src/app/resolvers/core/store/product-detail.resolver';
import { RouterModule, Routes } from '@angular/router';
import { ProductPreviewResolver } from 'src/app/resolvers/core/store/product-preview.resolver';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/inicio' },
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
    path: ':group/categoria/:category/marca/:brand',
    loadChildren: () =>
      import('./brand/brand.module').then((m) => m.BrandModule),
    resolve: { resolved: BrandResolver },
  },
  {
    path: ':group/categoria/:category/marca/:brand/producto/:product',
    loadChildren: () =>
      import('./product-detail/product-detail.module').then(
        (m) => m.ProductDetailModule
      ),
    resolve: { resolved: ProductDetailResolver },
  },
  {
    path: ':group/camp/:campaign',
    loadChildren: () =>
      import('./campaign/campaign.module').then((m) => m.CampaignModule),
    resolve: { resolved: CampaignResolver },
  },
  {
    path: ':group/camp/:campaign/marca/:brand',
    loadChildren: () =>
      import('./brand/brand.module').then((m) => m.BrandModule),
    resolve: { resolved: BrandResolver },
  },
  {
    path: ':group/camp/:campaign/marca/:brand/producto/:product',
    loadChildren: () =>
      import('./product-detail/product-detail.module').then(
        (m) => m.ProductDetailModule
      ),
    resolve: { resolved: ProductDetailResolver },
  },
  {
    path: ':group/producto/:product',
    loadChildren: () =>
      import('./product-detail/product-detail.module').then(
        (m) => m.ProductDetailModule
      ),
    resolve: { resolved: ProductDetailResolver },
  },

];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LazyLoadImageModule,
    ModalModule.forRoot(),
    RouterModule.forChild(routes),
  ],
})
export class StoreModule {}
