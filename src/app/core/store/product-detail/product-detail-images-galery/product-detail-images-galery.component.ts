import { Component, Input, OnInit } from '@angular/core';
import { IProductDetailPage } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-detail-images-galery',
  templateUrl: './product-detail-images-galery.component.html',
  styleUrls: ['./product-detail-images-galery.component.scss'],
})
export class ProductDetailImagesGaleryComponent implements OnInit {
  productDetail: IProductDetailPage;
  productDetailImages: string[];
  imageSelected: string;
  get prodDetail(): IProductDetailPage {
    return this.productDetail;
  }
  @Input('productDetail') set prodDetail(value: IProductDetailPage) {
    this.productDetail = value;
    this.initialize();
  }
  constructor() {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize(): void {
    this.productDetailImages = [...this.productDetail.extraImages];
    this.imageSelected = this.productDetailImages[0];
  }

  selectMainImage(path: string) {
    this.imageSelected = path;
  }
}
