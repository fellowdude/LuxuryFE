import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProdcutDetailService {
  constructor(private apiService: ApiService) {}

  getCatalogProduct(product: string): Observable<any> {
    return this.apiService.getLogged(`/product/detail/${product}`);
  }
}
