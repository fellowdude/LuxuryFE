import { Component, Input, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { IProductDetailPage } from 'src/app/models/product.model';

@Component({
  selector: 'app-mobile-product-detail-images-galery',
  templateUrl: './mobile-product-detail-images-galery.component.html',
  styleUrls: ['./mobile-product-detail-images-galery.component.scss'],
})
export class MobileProductDetailImagesGaleryComponent implements OnInit {
  productDetail: IProductDetailPage;
  productDetailImages: string[];

  get prodDetail(): IProductDetailPage {
    return this.productDetail;
  }
  @Input('productDetail') set prodDetail(value: IProductDetailPage) {
    this.productDetail = value;
    this.initialize();
  }

  constructor() {}

  swiperConfig: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    autoplay: {
      delay: 1000,
      reverseDirection: false,
      disableOnInteraction: false,
    },
    // navigation: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  };

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    this.productDetailImages = [
      this.productDetail.image_cover,
      ...this.productDetail.extraImages,
    ];
  }
}
