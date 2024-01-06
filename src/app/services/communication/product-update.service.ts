import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProductUpdate } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductUpdateService {

  private productUpdate: BehaviorSubject<IProductUpdate> = new BehaviorSubject<IProductUpdate>({type: ''});
  productUpdated = this.productUpdate.asObservable();

  constructor() { }

  setProductUpdate(value: IProductUpdate): void {
    this.productUpdate.next(value);
  }
}
