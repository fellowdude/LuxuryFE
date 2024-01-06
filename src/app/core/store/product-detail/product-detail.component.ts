import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { IBreadcrumbItem } from 'src/app/models/breadcrumb.model';
import { IProductDetailPage } from 'src/app/models/product.model';
import { ProductUpdateService } from 'src/app/services/communication/product-update.service';
import { ProductDetailPageService } from 'src/app/services/internal/product-detail-page.service';
import { ProductDetailService } from 'src/app/services/product-detail.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  get resolvedData() {
    return this.route.snapshot.data['resolved'] as any;
  }

  productDetail: IProductDetailPage;
  breadcrumb: Array<IBreadcrumbItem> = [];

  constructor(
    private productDetailService: ProductDetailService,
    private route: ActivatedRoute,
    private router: Router,
    private productDetailPageService: ProductDetailPageService,
    private productUpdateService: ProductUpdateService,
  ) {
    this.productUpdateService.productUpdated.subscribe((result) => {
      if (result.type === 'UPDATE') {
        this.updateProduct();
      }
    });
  }

  ngOnInit(): void {
    const urlTree = this.router.parseUrl(this.router.url);
    const urlWithoutParams =
      '/' +
      urlTree.root.children['primary'].segments.map((it) => it.path).join('/');

    this.productDetail = this.productDetailPageService.transformProductDetail(
      this.resolvedData
    );

    let fullUrl = this.router.url.split('/');
    this.breadcrumb = [
      {
        name: this.productDetail.category,
        link:
          '/tienda/' +
          fullUrl[2] +
          (this.productDetail.isCampaign ? '/camp/' : '/categoria/') +
          this.productDetail.category_friendly_url,
      },
      {
        name: this.productDetail.brand,
        link:
          '/tienda/' +
          fullUrl[2] +
          (this.productDetail.isCampaign ? '/camp/' : '/categoria/') +
          this.productDetail.category_friendly_url +
          '/marca/' +
          this.productDetail.brand_friendly_url,
      },
      {
        name: this.productDetail.name,
        link: urlWithoutParams,
      },
    ];
  }

  updateProduct(): void {
    this.productDetailService
      .getCatalogProduct(this.route.snapshot.params['product'])
      .subscribe((result: any) => {
        this.productDetail = this.productDetailPageService.transformProductDetail(
          result
        );
      });
  }

  detailChange(event: any): void {
    this.productDetail = event;
  }
}
