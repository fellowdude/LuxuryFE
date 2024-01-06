import { storiesOf, moduleMetadata } from '@storybook/angular';
import {MDBModalRef} from 'angular-bootstrap-md';
import { ProductDetailComponent } from 'src/app/core/store/product-detail/product-detail.component';
import { ProductDetailModule } from 'src/app/core/store/product-detail/product-detail.module';

const productDetail = storiesOf('Core/Product Detail', module).addDecorator(
  moduleMetadata({
    imports: [ProductDetailModule],
	  providers: [MDBModalRef]
  })
);

productDetail.add('Display', () => ({
  component: ProductDetailComponent,
}));
