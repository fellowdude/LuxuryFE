import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class RateProductService {
  constructor(private apiService: ApiService) {}
  rateProduct(idProduct: string, ranking: number): Observable<any> {
    return this.apiService.putLogged(`/product/ranking/${idProduct}`, {
      ranking,
    });
  }
}
