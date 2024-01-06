import { AssociatedBrandsComponent } from './associated-brands/associated-brands.component';
import { CommonModule } from '@angular/common';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { HeaderSubtitleComponent } from './header-subtitle/header-subtitle.component';
import { HomeAdvantagesComponent } from './home-advantages/home-advantages.component';
import { HomeComponent } from './home.component';
import { HomeResolver } from '../../resolvers/core/home/home.resolver';
import { HowToEnjoyComponent } from './how-to-enjoy/how-to-enjoy.component';
import { HteBannerComponent } from './how-to-enjoy/hte-banner/hte-banner.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CarouselModule as CarouselModule2 } from 'ngx-owl-carousel-o';
import { GtagModule } from 'src/app/gtag/gtag.module';
import { Constants } from 'src/app/constants';
import { AdCarouselBannerComponent } from './ad-carousel-banner/ad-carousel-banner.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AdsBannersComponent } from './ads-banners/ads-banners.component';

const routes: Routes = [
  {
    path: '',
    resolve: { resolved: HomeResolver },
    component: HomeComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [
    AssociatedBrandsComponent,
    FeaturedProductsComponent,
    HeaderSubtitleComponent,
    HomeAdvantagesComponent,
    HomeComponent,
    HowToEnjoyComponent,
    HteBannerComponent,
    AdCarouselBannerComponent,
    AdsBannersComponent,
  ],
  imports: [
    CommonModule,
    LazyLoadImageModule,
    RouterModule.forChild(routes),
    SharedModule,
    CarouselModule,
    CarouselModule2,
    GtagModule.init({
      targetId: Constants.GTAG,
    }),
  ],
})
export class HomeModule {}
