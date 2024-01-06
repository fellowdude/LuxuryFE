import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductsSearchedData } from '../resolvers/core/search/search.resolver';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private apiService: ApiService) {}

  getProductsResults(
    searchValue: string,
    page: number = 1,
    quantity: number = 12,
    filter: any = {},
    listBrandSearch : string[] = [],
    listPriceSearch : number[] = []
  ): Observable<any> {
    const query = new HttpParams()
      .set('filter', JSON.stringify(filter))
      .set('page', page.toString())
      .set('quantity', quantity.toString())
      .set('searchValue', searchValue)
      .set('listBrandSearch', JSON.stringify(listBrandSearch))
      .set('listPriceSearch', JSON.stringify(listPriceSearch))

    return this.apiService.getLogged('/product/v2/api/search/', query);
  }

  getBrandsResults(
    searchValue: string,
    page: number = 1,
    quantity: number = 12,
    field: string = 'name',
    mode: string = 'allField',
    visibility: number = 1
  ): Observable<IProductsSearchedData> {
    const searchObject = {
      filter: [{ field, value: searchValue }],
      mode,
    };
    const queryParams = new HttpParams()
      .set('search', JSON.stringify(searchObject))
      .set('page', page.toString())
      .set('quantity', quantity.toString())
      .set('visibility', visibility.toString());

    return this.apiService.getLogged('/experience/search/', queryParams);
  }


}
