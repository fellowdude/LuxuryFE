import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private api: ApiService) { }

  getRandomProducts(quantity: number): Observable<any> {
    const params = this.api.createHttpParams({
      quantity: quantity
    });
    return this.api.getLogged('/product/random-featured/', params)
  }

  getProductByFilter(filterObject: any, page: number = 1, quantity: number = 12, sort: any = null): Observable<any> {
    let params: any = {
      data: filterObject,
      page: page,
      quantity: quantity
    }
    if(sort) { params.sort = sort }
    const query = this.api.createHttpParams(params);
    return this.api.getLogged('/product/api/v2/category-filter', query);
  }

  getCampaginProductByFilter(filterObject: any, page: number = 1, quantity: number = 12, sort: any = null): Observable<any> {
    let params: any = {
      data: filterObject,
      page: page,
      quantity: quantity
    }
    if(sort) { params.sort = sort }
    const query = this.api.createHttpParams(params);
    return this.api.getLogged('/product/api/v2/campaign-filter', query);
  }

  getProductById(productId: string) {
    return this.api.getLogged('/product/' + productId);
  }
}
