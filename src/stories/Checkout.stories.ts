import { RouterTestingModule } from '@angular/router/testing';
import { storiesOf, moduleMetadata } from '@storybook/angular';
import { MDBModalRef, ModalModule } from 'angular-bootstrap-md';
import { AddressComponent } from 'src/app/core/checkout/address/address.component';
import { CardSelectComponent } from 'src/app/core/checkout/card-select/card-select.component';
import { CartComponent } from 'src/app/core/checkout/cart/cart.component';
import { CheckoutComponent } from 'src/app/core/checkout/checkout.component';
import { CheckoutModule } from 'src/app/core/checkout/checkout.module';
import { DrawerComponent } from 'src/app/core/checkout/drawer/drawer.component';
import { ErrorComponent } from 'src/app/core/checkout/error/error.component';
import { OverviewComponent } from 'src/app/core/checkout/overview/overview.component';
import { RecieptComponent } from 'src/app/core/checkout/reciept/reciept.component';
import { SuccessComponent } from 'src/app/core/checkout/success/success.component';
import { SummaryComponent } from 'src/app/core/checkout/summary/summary.component';
import { ModalsModule } from 'src/app/modals/modals.module';
import { SharedModule } from 'src/app/shared/shared.module';

const components = storiesOf('Checkout/Components', module).addDecorator(
  moduleMetadata({
    imports: [
      CheckoutModule,
      RouterTestingModule,
      ModalModule.forRoot(),
      ModalsModule
    ],
    providers: [
      MDBModalRef
    ]
  })
);

components.add('Cart', () => {
  return {
    component: CartComponent,
    props: {}
  }
})

components.add('Address', () => {
  return {
    component: AddressComponent,
    props: {}
  }
})

components.add('Summary', () => {
  return {
    component: SummaryComponent,
    props: {}
  }
})

components.add('Reciept', () => {
  return {
    component: RecieptComponent,
    props: {}
  }
})

components.add('Cards Select', () => {
  return {
    component: CardSelectComponent,
    props: {}
  }
})

components.add('Overview', () => {
  return {
    component: OverviewComponent,
    props: {}
  }
})

const page = storiesOf('Checkout/Pages', module).addDecorator(
  moduleMetadata({
    imports: [
      CheckoutModule,
      RouterTestingModule,
      ModalModule.forRoot(),
      ModalsModule
    ],
    providers: [
      MDBModalRef
    ]
  })
);

page.add('Checkout', () => {
  return {
    component: CheckoutComponent,
    props: {}
  }
})

page.add('Error', () => {
  return {
    component: ErrorComponent,
    props: {}
  }
})

page.add('Success', () => {
  return {
    component: SuccessComponent,
    props: {}
  }
})
