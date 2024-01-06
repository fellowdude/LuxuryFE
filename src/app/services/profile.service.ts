import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private api: ApiService) {}

  getProfile(): Observable<any> {
    return this.api.getLogged('/user/profile-info');
  }

  getSuffix(): Observable<any> {
    return this.api.getLogged('/list-of-values/detail/TYPE-SUFFIX');
  }

  getDocType(): Observable<any> {
    return this.api.getLogged('/list-of-values/detail/TYPE-DOCUMENT-CUSTOMER');
  }

  updateProfile(profileData): Observable<any> {
    return this.api.putLogged('/user', profileData);
  }

  changePassword(sJWT): Observable<any> {
    return this.api.postLogged('/authentication/change-password', {
      jwt: sJWT,
    });
  }

  getAddresses(): Observable<any> {
    return this.api.getLogged('/user/customer-address');
  }

  getTypeAddress(): Observable<any> {
    return this.api.getLogged('/user/available-type-address');
  }

  updateAddress(address_id, address_data): Observable<any> {
    return this.api.putLogged('/user-address/' + address_id, address_data);
  }

  saveAddress(address_data): Observable<any> {
    return this.api.postLogged('/user-address', address_data);
  }

  deleteAddress(id): Observable<any> {
    return this.api.deleteLogged('/user-address/' + id);
  }

  /*getOrderHistory(): Observable<any> {
    return this.api.getLogged('/order/user')
  }*/

  getOrderHistory(): Observable<any> {
    return this.api.getLogged('/order/api/v2/paid-user-history');
  }

  getOrderInfo(orderId: string): Observable<any> {
    return this.api.getLogged('/order/' + orderId);
  }

  getAvailableAddresses(): Observable<any> {
    return this.api.getLogged('/user/available-type-address');
  }
}
