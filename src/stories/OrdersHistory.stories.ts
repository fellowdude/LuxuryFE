import { storiesOf, moduleMetadata } from '@storybook/angular';
import { OrderHistoryComponent } from 'src/app/modals/account/order-history/order-history.component';
import { ProfileComponent } from 'src/app/modals/account/profile/profile.component';
import { ModalsModule } from 'src/app/modals/modals.module';
import { ModalOrderItemComponent } from 'src/app/modals/shared/modal-order-item/modal-order-item.component';
import { MyAddressesComponent } from 'src/app/modals/account/my-addresses/my-addresses.component';
import { SharedModule } from 'src/app/shared/shared.module';

const orderModal = storiesOf('/Modals/Account', module).addDecorator(
  moduleMetadata({
    imports: [ModalsModule],
  })
);

const modalItem = storiesOf('/Modals/Shared', module).addDecorator(
  moduleMetadata({
    imports: [ModalsModule],
  })
);

modalItem.add('OrdersHistoryComponent', () => {
  return {
    component: ModalOrderItemComponent,
  };
});

orderModal.add('OrderHistoryModal', () => {
  return {
    component: OrderHistoryComponent,
  };
});

orderModal.add('Profile', () => {
  return {
    component: ProfileComponent,
  };
});

orderModal.add('My Addresses', () => {
  return {
    component: MyAddressesComponent,
  };
});
