import { Injectable } from '@angular/core';
import { ICheckoutDrawers } from 'src/app/models/checkout.model';
import { AddressComponent } from '../address/address.component';
import { CardSelectComponent } from '../card-select/card-select.component';
import { CartComponent } from '../cart/cart.component';
import { OrderConfirmComponent } from '../order-confirm/order-confirm.component';
import { RecieptComponent } from '../reciept/reciept.component';
import { SummaryComponent } from '../summary/summary.component';
import { DrawerItem } from './drawer-item';

@Injectable()
export class DrawerService {

  getDrawers(): ICheckoutDrawers {
    return {
      cart: {
        opened: false,
        value: new DrawerItem(CartComponent,{}),
        step: 1,
      },
      address: {
        opened: false,
        value:new DrawerItem(AddressComponent,{}),
        step: 2,
      },
      summary: {
        opened: false,
        value:new DrawerItem(SummaryComponent,{}),
        step: 3,
      },
      reciept: {
        opened: false,
        value:new DrawerItem(RecieptComponent,{}),
        step: 4,
      },
      card: {
        opened: false,
        value:new DrawerItem(CardSelectComponent,{}),
        step: 5,
      },
      confirm: {
        opened: false,
        value: new DrawerItem(OrderConfirmComponent,{}),
        step: 6,
      },
    };
  }
}
