import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISendPayUMethod } from '../models/checkout.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private api: ApiService) { }

  setPayUMethod(payUInfo: ISendPayUMethod): Observable<any>{
    return this.api.postLogged('/payments/payu-token/confirm', payUInfo)
  }

  setPayUMethodNoToken(payUInfo: ISendPayUMethod): Observable<any>{
    return this.api.postLogged('/payments/payu/confirm', payUInfo);
  }
}
