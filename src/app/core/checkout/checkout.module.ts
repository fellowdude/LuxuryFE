import { AdditionalAdComponent } from './additional-ad/additional-ad.component';
import { AdditionalProductsComponent } from './additional-products/additional-products.component';
import { AdditionalProductsItemComponent } from './additional-products/additional-products-item/additional-products-item.component';
import { AddressComponent } from './address/address.component';
import { AddressFormComponent } from 'src/app/modals/account/address-form/address-form.component';
import { CardSelectComponent } from './card-select/card-select.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout.component';
import { CheckoutResolver } from 'src/app/resolvers/core/checkout/checkout.resolver';
import { CommonModule } from '@angular/common';
import { CuponComponent } from './cupon/cupon.component';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { DrawerComponent } from './drawer/drawer.component';
import { DrawerDirective } from './drawer/drawer.directive';
import { DrawerService } from './drawer/drawer.service';
import { ErrorComponent } from './error/error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IconsModule,
  InputsModule,
  InputUtilitiesModule,
  ModalModule,
} from 'angular-bootstrap-md';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MicroModule } from 'src/app/micro/micro.module';
import { ModalsModule } from 'src/app/modals/modals.module';
import { NgModule } from '@angular/core';
import { OrderConfirmComponent } from './order-confirm/order-confirm.component';
import { OtherPaymentMethodComponent } from 'src/app/modals/shopping/other-payment-method/other-payment-method.component';
import { OverviewComponent } from './overview/overview.component';
import { RecieptComponent } from './reciept/reciept.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { SuccessComponent } from './success/success.component';
import { SummaryComponent } from './summary/summary.component';
import { GtagModule } from 'src/app/gtag/gtag.module';
import { Constants } from 'src/app/constants';
import { CouponValidationComponent } from './coupon-validation/coupon-validation.component';

const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    resolve: { resolved: CheckoutResolver },
  },
  { path: 'exito', component: SuccessComponent },
  { path: 'error', component: ErrorComponent },
];

@NgModule({
  declarations: [
    AdditionalAdComponent,
    AdditionalProductsComponent,
    AdditionalProductsItemComponent,
    AddressComponent,
    CardSelectComponent,
    CartComponent,
    CheckoutComponent,
    CuponComponent,
    DrawerComponent,
    DrawerDirective,
    ErrorComponent,
    OrderConfirmComponent,
    OverviewComponent,
    RecieptComponent,
    SuccessComponent,
    SummaryComponent,
    CouponValidationComponent,
  ],
  entryComponents: [
    AddressComponent,
    AddressFormComponent,
    CardSelectComponent,
    CartComponent,
    OtherPaymentMethodComponent,
    RecieptComponent,
    SummaryComponent,
  ],
  exports: [
    AddressComponent,
    CardSelectComponent,
    CartComponent,
    RecieptComponent,
    SummaryComponent,
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    FormsModule,
    IconsModule,
    InputsModule,
    InputUtilitiesModule,
    LazyLoadImageModule,
    MicroModule,
    ModalModule.forRoot(),
    ModalsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule,
    GtagModule.init({
      targetId: Constants.GTAG,
    }),
  ],
  providers: [DrawerService],
})
export class CheckoutModule {}
