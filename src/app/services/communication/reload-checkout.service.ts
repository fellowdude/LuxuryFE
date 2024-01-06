import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICheckoutReloadUpdate } from 'src/app/models/checkout.model';

@Injectable({
  providedIn: 'root'
})
export class ReloadCheckoutService {

  private checkoutReloadUpdate: BehaviorSubject<ICheckoutReloadUpdate> = new BehaviorSubject<ICheckoutReloadUpdate>({type: ''});
  checkoutReloadUpdated = this.checkoutReloadUpdate.asObservable();

  constructor() { }

  setCheckoutReloadUpdate(value: ICheckoutReloadUpdate): void {
    this.checkoutReloadUpdate.next(value);
  }
}
