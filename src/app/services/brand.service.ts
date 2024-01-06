import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private apiService: ApiService) {}

  getBrandBySlug(
    categorySlug: string,
    brandSlug: string,
    page: number = 1,
    quantity: number = 1,
    filter: any = null
  ): Observable<any> {
    let params: any = { page, quantity };
    if (filter) params.filter = filter;
    const query = this.apiService.createHttpParams(params);
    return this.apiService.getLogged(
      `/category/v2/api/list/${categorySlug}/brand/${brandSlug}`,
      query
    );
  }

  getCampaignProductsByBrand(
    campaignSlug: string,
    brandSlug: string,
    page: number = 1,
    quantity: number = 12,
    filter: any = null
  ) {
    let params: any = { page, quantity };
    if (filter) params.filter = filter;
    const query = this.apiService.createHttpParams(params);
    return this.apiService.getLogged(
      `/campaign/v2/api/list/${campaignSlug}/brand/${brandSlug}`,
      query
    );
  }

  getAssociatedBrands(): Observable<any> {
    const query = new HttpParams().set('quantity', '9');
    return this.apiService.getLogged('/brand/random-list/', query);
  }
}
