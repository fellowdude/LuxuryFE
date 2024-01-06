import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IHeaderCartUpdate } from 'src/app/models/header.model';

@Injectable({
  providedIn: 'root',
})
export class HeaderCartService {
  private cartUpdate: BehaviorSubject<IHeaderCartUpdate> = new BehaviorSubject<IHeaderCartUpdate>(
    { type: '' }
  );
  cartUpdated = this.cartUpdate.asObservable();

  constructor() {}

  setCartUpdate(value: IHeaderCartUpdate): void {
    this.cartUpdate.next(value);
  }
}
