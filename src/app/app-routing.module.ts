import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ProductPreviewResolver } from './resolvers/core/store/product-preview.resolver';
import { CatalogBrandRedirectComponent } from './shared/catalog-brand-redirect/catalog-brand-redirect.component';
import { CatalogCategoryRedirectComponent } from './shared/catalog-category-redirect/catalog-category-redirect.component';
import { CatalogProductRedirectComponent } from './shared/catalog-product-redirect/catalog-product-redirect.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'inicio' },
  {
    path: 'ingreso',
    loadChildren: () =>
      import('./core/login-and-register/login-and-register.module').then(
        (m) => m.LoginAndRegisterModule
      ),
  },
  {
    path: 'inicio',
    loadChildren: () =>
      import('./core/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'producto/preview/:product',
    loadChildren: () =>
      import('./core/store/product-detail/product-detail.module').then(
        (m) => m.ProductDetailModule
      ),
    resolve: { resolved: ProductPreviewResolver },
  },
  {
    path: 'tienda',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./core/store/store.module').then((m) => m.StoreModule),
  },
  {
    path: 'beneficios',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./core/partner-benefits/partner-benefits.module').then(
        (m) => m.PartnerBenefitsModule
      ),
  },
  {
    path: 'busqueda',
    loadChildren: () =>
      import('./core/search/search.module').then((m) => m.SearchModule),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./core/checkout/checkout.module').then((m) => m.CheckoutModule),
  },
  {
    path: 'informacion',
    loadChildren: () =>
      import('./static-pages/static-pages.module').then(
        (m) => m.StaticPagesModule
      ),
  },
  // OLDs routes
  {
    path: 'principal/experience/:group/:category/empresa/:company/:benefit',
    redirectTo:
      '/beneficios/:group/categoria/:category/empresa/:company/beneficio/:benefit',
  },
  {
    path: 'principal/experience/:group/:category/empresa/:company',
    redirectTo: '/beneficios/:group/categoria/:category/empresa/:company',
  },
  {
    path: 'principal/experience/:group/:category',
    redirectTo: '/beneficios/:group/categoria/:category',
  },
  {
    path: 'principal/experience/:group',
    redirectTo: '/beneficios/:group',
  },
  {
    path: 'principal/product/:group/:category',
    component: CatalogCategoryRedirectComponent,
  },
  {
    path: 'principal/product/:group/:category/marca/:brand',
    component: CatalogBrandRedirectComponent,
  },
  {
    path: 'principal/product/:group/:category/marca/:brand/producto/:product',
    component: CatalogProductRedirectComponent,
  },
  {
    path: 'principal/product/:group',
    redirectTo: '/tienda/:group',
  },
  {
    path: 'in',
    redirectTo: 'ingreso',
  },
  {
    path: 'intro',
    redirectTo: 'inicio',
  },
  {
    path: 'cart',
    redirectTo: 'checkout',
  },
  {
    path: 'not-found',
    loadChildren: () =>
      import('./core/not-found/not-found.module').then((m) => m.NotFoundModule),
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'inicio',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
