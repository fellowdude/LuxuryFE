import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private apiServe: ApiService) {}

  getCategoryBySlug(
    categoryFriendlyUrl: string,
    page: number = 1,
    quantity: number = 12,
    filter?: any
  ): Observable<any> {
    let params: any = {
      page: page,
      quantity: quantity
    }
    if(filter) { params.filter = filter }

    const query = this.apiServe.createHttpParams(params);
    return this.apiServe.getLogged(
      `/category/v2/api/list/${categoryFriendlyUrl}`,
      query
    );
  }
}
