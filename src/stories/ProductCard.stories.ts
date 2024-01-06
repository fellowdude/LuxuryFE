import { storiesOf, moduleMetadata } from '@storybook/angular';
import { CardProductComponent } from 'src/app/shared/card-product/card-product.component';
import { ProductListComponent } from 'src/app/shared/product-list/product-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

const card = storiesOf('Shared/Product', module).addDecorator(
  moduleMetadata({
    imports: [SharedModule],
  })
);

card.add('Card', () => ({ component: CardProductComponent }));
card.add('List', () => ({ component: ProductListComponent }));
