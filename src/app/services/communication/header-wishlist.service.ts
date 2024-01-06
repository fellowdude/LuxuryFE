import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IHeaderWishlistUpdate } from 'src/app/models/header.model';

@Injectable({
  providedIn: 'root',
})
export class HeaderWishlistService {
  private wishlistUpdate: BehaviorSubject<IHeaderWishlistUpdate> = new BehaviorSubject<IHeaderWishlistUpdate>(
    { type: '' }
  );
  wishlistUpdated = this.wishlistUpdate.asObservable();

  constructor() {}

  setWishlistUpdate(value: IHeaderWishlistUpdate): void {
    this.wishlistUpdate.next(value);
  }
}
