import { ActivatedRoute, Router } from '@angular/router';
import { AddressFormComponent } from 'src/app/modals/account/address-form/address-form.component';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAddressItemCheckout } from 'src/app/models/address.model';
import { IOrderBodyItem, IValidationItem } from 'src/app/models/checkout.model';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ProfileService } from 'src/app/services/profile.service';
import { CartService } from '../../../services/cart.service';
import { ICart } from 'src/app/models/cart.model';
import { ISupplierOrder } from 'src/app/models/supplier-order.model';
import { CheckoutPageService } from 'src/app/services/internal/checkout-page.service';
import { CouponService } from 'src/app/services/coupon.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  @Input() validationItem: IValidationItem;
  @Output() onClick = new EventEmitter<any>(true);

  supplierList: Array<ISupplierOrder> = [];
  addressList: Array<IAddressItemCheckout> = [];
  hideAddButton: boolean = false;
  loading: boolean = false;
  modalRef: MDBModalRef;
  selectedAddress: IAddressItemCheckout;

  constructor(
    private checkoutService: CheckoutService,
    private checkoutPageService: CheckoutPageService,
    private cartService: CartService,
    private modalService: MDBModalService,
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private couponService: CouponService
  ) {}

  ngOnInit(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { step: 'address' },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
    this.initializeCart();
  }

  initializeCart(): void {
    this.hideAddButton = false;
    this.profileService.getTypeAddress().subscribe((addressTypes) => {
      addressTypes?.length <= 0 && (this.hideAddButton = true);
    });

    let validationItem = {
      cart: {
        total_amount: this.validationItem?.cart?.total_amount,
      },
      code: this.validationItem?.code
    };

    if(this.validationItem)
      this.cartService
        .cartList(1, this.validationItem)
        .subscribe((response: any) => {
          let rawResponse: ICart = response as ICart;
          this.supplierList = this.checkoutPageService.checkoutSupplierStructure(
            rawResponse.infoShoppingCart,
            rawResponse.productToSend,
            rawResponse.resultCoupon,
            false
          );
          this.onClick.emit({
            discount: rawResponse.resultCoupon.amount_discount_coupon,
          });
          if (rawResponse?.resultCoupon?.error) {
            this.couponService.setIsCouponValid(false);
            this.couponService.setErrorCoupon(rawResponse?.resultCoupon?.error);
          }else{
            this.couponService.setIsCouponValid(true);
            this.couponService.setErrorCoupon('');
          }
        });

    this.checkoutService
      .getDeliveryPrices(1, validationItem)
      .subscribe((response: any) => {
        this.addressList = response as Array<IAddressItemCheckout>;
        this.addressList.forEach((e) => {
          e.checked = false;
        });
        /* if (this.addressList.length > 0) {
          this.addressList[0].checked = true;
          this.selectedAddress = this.addressList[0];
        } */
        this.onClick.emit(null);
      });
  }

  changeChecked(event): void {
    this.addressList.forEach((e) => {
      e.checked = false;
    });
    this.addressList[event].checked = true;
    this.selectedAddress = this.addressList[event];
    this.onClick.emit(this.selectedAddress);
  }

  addNewAddress(): void {
    this.modalRef = this.modalService.show(AddressFormComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-full-height modal-right mh-100 my-0',
      containerClass: 'right modal-dialog-scrollable mh-100 my-0',
      animated: true,
      data: {
        isCheckout: true,
      },
    });

    this.modalRef.content.action.subscribe((result: any) => {
      if (result) {
        this.initializeCart();
      }
    });
  }
}
