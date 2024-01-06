import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductDetailService } from 'src/app/services/product-detail.service';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailResolver implements Resolve<Observable<any>> {
  constructor(
    private productDetailService: ProductDetailService,
    private router: Router
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const product = route.paramMap.get('product');
    return this.productDetailService.getCatalogProduct(product);
  }
}
