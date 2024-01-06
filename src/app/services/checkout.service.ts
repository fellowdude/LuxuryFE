import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICardForm } from '../models/card-item.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private api: ApiService) { }

  setOrderInfo(orderInfo, orderId?): Observable<any>{
    let params = orderId && this.api.createHttpParams({ orderId })
    return this.api.postLogged('/order', orderInfo, params );
  }

  getDeliveryPrices(state?: number, info?: any): Observable<any>{
    let params = this.api.createHttpParams({ state, info })
    return this.api.getLogged('/order/v2/api/delivery-price',  params );
  }

  getSingleDeliveryAddressPrice(addressId: string, state?: number, info?: any): Observable<any>{
    let params = this.api.createHttpParams({ state, info, addressId })
    return this.api.getLogged('/order/v2/api/delivery-price',  params );
  }

  getUserCards(): Observable<any>{
    return this.api.getLogged('/user/credit-card-list');
  }

  addUserCard(cardInfo: any): Observable<any>{
    return this.api.postLogged('/payments/save_card', cardInfo);
  }

  deleteUserCard(id: string){
    return this.api.deleteLogged(`/payments/delete_card_token/${id}`);
  }

  validateCardBines(info?: any): Observable<any>{
    let params = this.api.createHttpParams({ info })
    return this.api.getLogged('/shopping-cart/validateBines', params);
  }

  getAdditionalProducts(): Observable<any>{
    return this.api.getLogged('/product/v2/api/product-deals');
  }
}
