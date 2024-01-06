import { storiesOf, moduleMetadata } from '@storybook/angular';
import { MDBModalRef } from 'angular-bootstrap-md';
import { AddressFormComponent } from 'src/app/modals/account/address-form/address-form.component';
import { ModalsModule } from 'src/app/modals/modals.module';
import { CartComponent } from 'src/app/modals/shopping/cart/cart.component';
import { OtherPaymentMethodComponent } from 'src/app/modals/shopping/other-payment-method/other-payment-method.component';



const card = storiesOf('Modals/Shopping', module).addDecorator(
  moduleMetadata({
    imports: [
      ModalsModule
    ],
    providers: [
      MDBModalRef
    ]
  })
);

card.add('Cart', () => {
  return {
    component: CartComponent,
    props: {}
  }
})

card.add('New Address', () => {
  return {
    component: AddressFormComponent,
    props: {}
  }
})

card.add('New Card', () => {
  return {
    component: OtherPaymentMethodComponent,
    props: {}
  }
})
