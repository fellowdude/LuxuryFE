import { ADDRESS_FORM_TOKEN } from './account/address-form/address-form';
import { AddressFormComponent } from './account/address-form/address-form.component';
import { AddressListComponent } from './account/address-list/address-list.component';
import { BenefitFormComponent } from './benefit-form/benefit-form.component';
import { CartComponent } from './shopping/cart/cart.component';
import { CheckoutAddressItemComponent } from './shared/checkout-address-item/checkout-address-item.component';
import { CheckoutCardItemComponent } from './shared/checkout-card-item/checkout-card-item.component';
import { CheckoutSupplierComponent } from './shared/checkout-supplier/checkout-supplier.component';
import { CheckoutSupplierProductComponent } from './shared/checkout-supplier-product/checkout-supplier-product.component';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact/contact.component';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { FilterListModule } from '../shared/filter-list/filter-list.module';
import { FilterMobileComponent } from './products/filter-mobile/filter-mobile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsModule, ModalModule, TooltipModule } from 'angular-bootstrap-md';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';
import { InformationModalComponent } from './information-modal/information-modal.component';
import {
  InputsModule,
  CheckboxModule,
  ButtonsModule,
} from 'angular-bootstrap-md';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MENU_ACCOUNT_TOKEN } from './account/menu-account/menu-account';
import { MY_ADDRESSES_TOKEN } from './account/my-addresses/my-addresses';
import { MenuAccountComponent } from './account/menu-account/menu-account.component';
import { MicroModule } from '../micro/micro.module';
import { ModalCartItemComponent } from './shared/modal-cart-item/modal-cart-item.component';
import { ModalHeaderComponent } from './shared/modal-header/modal-header.component';
import { ModalLoadingComponent } from './shared/modal-loading/modal-loading.component';
import { ModalOrderItemComponent } from './shared/modal-order-item/modal-order-item.component';
import { ModalWishlistItemComponent } from './shared/modal-wishlist-item/modal-wishlist-item.component';
import { MyAddressesComponent } from './account/my-addresses/my-addresses.component';
import { NgModule } from '@angular/core';
import { ORDER_DETAIL_TOKEN } from './account/order-detail/order-detail';
import { ORDER_HISTORY_TOKEN } from './account/order-history/order-history';
import { OrderDetailComponent } from './account/order-detail/order-detail.component';
import { OrderHistoryComponent } from './account/order-history/order-history.component';
import { OrderStatusPipe } from './pipes/order-status.pipe';
import { OtherPaymentMethodComponent } from './shopping/other-payment-method/other-payment-method.component';
import { PROFILE_TOKEN } from './account/profile/profile';
import { ProfileComponent } from './account/profile/profile.component';
import { RATE_EXPERIENCE } from './account/rate-experience/rate-experience';
import { RateExperienceComponent } from './account/rate-experience/rate-experience.component';
import { RatingModule } from 'ngx-bootstrap/rating';
import { SaleSupplierComponent } from './shared/sale-supplier/sale-supplier.component';
import { SaleSupplierProductComponent } from './shared/sale-supplier-product/sale-supplier-product.component';
import { SaveVideoPipe } from './pipes/save-video.pipe';
import { StarsRatingComponent } from './shared/stars-rating/stars-rating.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { WishlistComponent } from './shopping/wishlist/wishlist.component';
import { RecoverMemberCardComponent } from './register/recover-member-card/recover-member-card.component';
import { ClipboardModule } from 'ngx-clipboard';
import { NewMemberCardFormComponent } from './register/new-member-card-form/new-member-card-form.component';
import { NEW_MEMBER_CARD } from './register/new-member-card-form/new-member-card';
import { GtagModule } from '../gtag/gtag.module';
import { Constants } from '../constants';
import { OpenInMobileComponent } from './products/open-in-mobile/open-in-mobile.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [
    AddressFormComponent,
    AddressListComponent,
    BenefitFormComponent,
    CartComponent,
    CheckoutAddressItemComponent,
    CheckoutCardItemComponent,
    CheckoutSupplierComponent,
    CheckoutSupplierProductComponent,
    ContactComponent,
    FilterMobileComponent,
    ImageGalleryComponent,
    InformationModalComponent,
    MenuAccountComponent,
    ModalCartItemComponent,
    ModalHeaderComponent,
    ModalLoadingComponent,
    ModalOrderItemComponent,
    ModalWishlistItemComponent,
    MyAddressesComponent,
    OrderDetailComponent,
    OrderHistoryComponent,
    OrderStatusPipe,
    OtherPaymentMethodComponent,
    ProfileComponent,
    RateExperienceComponent,
    SaleSupplierComponent,
    SaleSupplierProductComponent,
    SaveVideoPipe,
    StarsRatingComponent,
    WishlistComponent,
    RecoverMemberCardComponent,
    NewMemberCardFormComponent,
    OpenInMobileComponent,
    ConfirmationModalComponent
  ],
  exports: [
    AddressFormComponent,
    CartComponent,
    CheckoutAddressItemComponent,
    CheckoutCardItemComponent,
    CheckoutSupplierComponent,
    CheckoutSupplierProductComponent,
    ContactComponent,
    FilterMobileComponent,
    ImageGalleryComponent,
    InformationModalComponent,
    OtherPaymentMethodComponent,
    SaleSupplierComponent,
    SaleSupplierProductComponent,
    WishlistComponent,
    RecoverMemberCardComponent,
    NewMemberCardFormComponent
  ],
  imports: [
    ButtonsModule,
    CheckboxModule,
    CommonModule,
    DirectivesModule,
    DirectivesModule,
    FilterListModule,
    FormsModule,
    IconsModule,
    InputsModule,
    LazyLoadImageModule,
    MicroModule,
    ModalModule.forRoot(),
    RatingModule.forRoot(),
    ReactiveFormsModule,
    SwiperModule,
    TooltipModule,
    TooltipModule,
    ClipboardModule,
    GtagModule.init({
      targetId: Constants.GTAG
    })
  ],
  providers: [
    { provide: ADDRESS_FORM_TOKEN, useValue: AddressFormComponent },
    { provide: MENU_ACCOUNT_TOKEN, useValue: MenuAccountComponent },
    { provide: MY_ADDRESSES_TOKEN, useValue: MyAddressesComponent },
    { provide: ORDER_DETAIL_TOKEN, useValue: OrderDetailComponent },
    { provide: ORDER_HISTORY_TOKEN, useValue: OrderHistoryComponent },
    { provide: PROFILE_TOKEN, useValue: ProfileComponent },
    { provide: RATE_EXPERIENCE, useValue: RateExperienceComponent },
    { provide: NEW_MEMBER_CARD, useValue: NewMemberCardFormComponent },
  ],
})
export class ModalsModule {}
