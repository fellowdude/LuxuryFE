import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MainImageZoomComponent } from './main-image-zoom/main-image-zoom.component';
import { MicroModule } from 'src/app/micro/micro.module';
import { MobileProductDetailImagesGaleryComponent } from './mobile-product-detail-images-galery/mobile-product-detail-images-galery.component';
import { ModalModule } from 'angular-bootstrap-md';
import { ModalsModule } from 'src/app/modals/modals.module';
import { NgModule } from '@angular/core';
import { ProductDetailBodyComponent } from './product-detail-body/product-detail-body.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductDetailHeaderComponent } from './product-detail-header/product-detail-header.component';
import { ProductDetailImagesGaleryComponent } from './product-detail-images-galery/product-detail-images-galery.component';
import { RatingModule } from 'ngx-bootstrap/rating';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { StarsRatingProductComponent } from './stars-rating-product/stars-rating-product.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { ColorTypeVariationComponent } from './color-type-variation/color-type-variation.component';
import { TextTypeVariationComponent } from './text-type-variation/text-type-variation.component';
import { ImageTypeVariationComponent } from './image-type-variation/image-type-variation.component';
import { GtagModule } from 'src/app/gtag/gtag.module';
import { Constants } from 'src/app/constants';

const routes: Routes = [
  { path: '', component: ProductDetailComponent, pathMatch: 'full' },
];
@NgModule({
  declarations: [
    ProductDetailComponent,
    MobileProductDetailImagesGaleryComponent,
    ProductDetailHeaderComponent,
    ProductDetailBodyComponent,
    ProductDetailImagesGaleryComponent,
    MainImageZoomComponent,
    StarsRatingProductComponent,
    ColorTypeVariationComponent,
    TextTypeVariationComponent,
    ImageTypeVariationComponent,
  ],
  imports: [
    ModalsModule,
    RatingModule,
    CommonModule,
    FormsModule,
    LazyLoadImageModule,
    MicroModule,
    ModalModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    SwiperModule,
    GtagModule.init({
      targetId: Constants.GTAG
    })
  ],
})
export class ProductDetailModule {}
