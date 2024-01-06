import { storiesOf, moduleMetadata } from '@storybook/angular';
import { OrderDetailComponent } from 'src/app/modals/account/order-detail/order-detail.component';
import { ModalsModule } from 'src/app/modals/modals.module';
import { SharedModule } from 'src/app/shared/shared.module';

const modal = storiesOf('/Modals/Account', module).addDecorator(
  moduleMetadata({
    imports: [ModalsModule],
  })
);

modal.add('OrderDetail', () => ({ component: OrderDetailComponent }));
