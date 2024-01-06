import { BannerService } from 'src/app/services/banner.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Injectable } from '@angular/core';
import { Observable, of, zip } from 'rxjs';
import { Resolve } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CheckoutResolver implements Resolve<ICheckoutPage> {
  constructor(
    private bannerService: BannerService,
    private checkoutService: CheckoutService
  ) {} //private checkoutService: CheckoutService

  resolve(): Observable<ICheckoutPage> {
    return zip(
      this.bannerService.getBanner('ads_cart').pipe(
        catchError((_) => {
          return of(null);
        })
      ),
      this.checkoutService.getAdditionalProducts().pipe(
        catchError((_) => {
          return of(null);
        })
      )
    ).pipe(
      map(([adInfo, additionalProducts]) => {
        return {
          adInfo,
          additionalProducts,
        };
      })
    );
  }
}

export interface ICheckoutPage {
  adInfo: any;
  additionalProducts: any;
}
