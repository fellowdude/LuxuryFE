import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  private currentCouponCode: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  currentCouponCode$ = this.currentCouponCode.asObservable();

  private isCouponValid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  isCouponValid$ = this.isCouponValid.asObservable();

  private loadingCoupon = new BehaviorSubject<boolean>(false);
  loadingCoupon$ = this.loadingCoupon.asObservable();

  private errorCoupon = new BehaviorSubject<string>('');
  errorCoupon$ = this.errorCoupon.asObservable();

  constructor(private apiService: ApiService) { }

  setCurrentCouponCode(value: string) {
    this.currentCouponCode.next(value);
  }

  setIsCouponValid(value: boolean) {
    this.isCouponValid.next(value);
  }

  setLoadingCoupon(value: boolean) {
    this.loadingCoupon.next(value);
  }

  setErrorCoupon(value: string) {
    this.errorCoupon.next(value);
  }

  removeCoupon(couponCode: string): Observable<any> {
    return this.apiService.postLogged('/discount-code/decrease', {
      coupon_code: couponCode,
    });
  }
}
