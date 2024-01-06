import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutPageService } from 'src/app/services/internal/checkout-page.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ICart } from 'src/app/models/cart.model';
import { IOrderBody, IValidationItem } from 'src/app/models/checkout.model';
import { ISupplierOrder } from 'src/app/models/supplier-order.model';
import { IUserInfo } from 'src/app/models/profile.model';
import { ProfileService } from 'src/app/services/profile.service';
import { ReloadCheckoutService } from 'src/app/services/communication/reload-checkout.service';
import { GtagService } from 'src/app/gtag/gtag.service';
import { HeaderCartService } from 'src/app/services/communication/header-cart.service';
import { ToastrControllerService } from 'src/app/services/internal/toastr-controller.service';
import { Messages } from 'src/app/messages';
import { CouponService } from 'src/app/services/coupon.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  supplierList: Array<ISupplierOrder> = [];
  loading: boolean = false;
  aux: boolean = false;
  userInfo: IUserInfo;
  @Input() validationItem: IValidationItem = null;
  @Output() onClick = new EventEmitter<any>(true);

  constructor(
    private cartService: CartService,
    private checkoutPageService: CheckoutPageService,
    private profileService: ProfileService,
    private reloadCheckoutService: ReloadCheckoutService,
    private router: Router,
    private route: ActivatedRoute,
    private headerCartService: HeaderCartService,
    private toastrService: ToastrControllerService,
    private couponService: CouponService
  ) {
    this.reloadCheckoutService.checkoutReloadUpdated.subscribe((response) => {
      if (response.type === 'CART') {
        this.initializeCart();
      }
    });
  }

  ngOnInit(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { step: 'cart' },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
    this.loading = true;
    this.profileService.getProfile().subscribe((result: IUserInfo) => {
      this.userInfo = result;
      this.initializeCart();
    });
  }

  initializeCart(): void {
    this.loading = true;
    this.cartService
      .cartList(0, this.validationItem)
      .subscribe((response: any) => {
        let rawResponse: ICart = response as ICart;
        // initialize coupon if there is
        this.couponService.setCurrentCouponCode(
          rawResponse.infoShoppingCart[0]?.coupon?.code
        );
        // set loadingCoupon to false
        this.supplierList = this.checkoutPageService.cartSupplierStructure(
          rawResponse?.infoShoppingCart,
          rawResponse?.productToSend
        );
        let paymentInfo: IOrderBody = {
          shopping_cart_id: rawResponse?.infoShoppingCart[0]?._id,
          currency: rawResponse?.infoShoppingCart[0]?.info_product?.currency,
          type_payment: 'Pendiente de Pago',
          user_phone: this.userInfo?.phone,
          address_id: null,
          delivery_name_customer:
            this.userInfo?.name +
            ' ' +
            this.userInfo?.last_name_father +
            ' ' +
            this.userInfo?.last_name_mother,
          delivery_phone_customer: null,
          delivery_type_address: null,
          delivery_address: null,
          delivery_reference: null,
          delivery_district_id: null,
          delivery_province_id: null,
          delivery_department_id: null,
          invoice_send: false,
          invoice_ruc: null,
          invoice_business_name: null,
          invoice_address: null,
          invoice_district: null,
          invoice_province: null,
          invoice_department: null,
          method_send_id: null,
          user_id: this.userInfo?._id,
          user_document_number: this.userInfo?.number_document,
          user_mail: this.userInfo?.email,
          current_step: 0,
          detail: [],
        };
        let saved = 0;
        rawResponse.infoShoppingCart.forEach((item, index) => {
          paymentInfo.detail.push({
            discount:
              item?.price * item?.quantity -
              rawResponse?.productToSend[index]?.price,
            discount_price: rawResponse?.productToSend[index]?.price,
            method_send:
              item?.populate_method_send.length > 0
                ? item?.populate_method_send[0]
                : null,
            price: item?.price,
            quantity: item?.quantity,
            product_id: item?.id_product,
            origin: rawResponse?.productToSend[index]?.origin,
            entity: rawResponse?.productToSend[index]?.entity?._id,
          });

          saved +=
            item?.info_product?.price * item?.quantity -
            rawResponse?.productToSend[index]?.price;
        });
        this.onClick.emit({
          subtotal: rawResponse?.subtotal,
          paymentInfo: paymentInfo,
          discount: 0,
          delivery_discount:
            rawResponse?.resultCoupon?.entity?.delivery_discount_amount || 0,
          type_products: rawResponse?.resultCoupon?.entity?.coupon_discount_type?.value || '',
          type_delivery: rawResponse?.resultCoupon?.entity?.delivery_discount_type?.value || '',
          max_coupon: rawResponse?.resultCoupon?.entity?.max_coupon_discount_amount || 0,
          max_delivery: rawResponse?.resultCoupon?.entity?.max_delivery_discount_amount || 0,
          coupon_name: rawResponse?.resultCoupon?.entity?.name || '',
          saved: saved,
          gtagList: rawResponse.infoShoppingCart?.map((product, index) => {
            return {
              id: product.info_product?.SKU,
              brand: product.info_product?.brand?.name,
              name: product.name_product,
              price: product.total_price,
              quantity: product.quantity,
              list_position: index,
              category:
                product?.info_product?.campaign?.name ||
                product?.info_product?.categories?.[0]?.name,
            };
          }),
        });
        this.loading = false;
        this.couponService.setLoadingCoupon(false);
        this.headerCartService.setCartUpdate({ type: 'UPDATE' });

        if (rawResponse?.resultCoupon) {
          // console.log("Ete es el cupon",rawResponse?.resultCoupon)
          if (!rawResponse?.resultCoupon?.error) {
            this.aux = true;
            this.toastrService.successToastr(
              Messages.couponValidated,
              Messages.congratTitle
            );
            this.couponService.setIsCouponValid(true);
          } else {
            this.toastrService.warningToastr(
              rawResponse?.resultCoupon?.error,
              Messages.warningTitle
            );

            if (rawResponse.infoShoppingCart[0]?.coupon?.code) {
              this.couponService.setCurrentCouponCode(
                rawResponse?.infoShoppingCart[0]?.coupon?.code
              );
              this.couponService.setIsCouponValid(true);
            }
          }
        }
      }, (error: any) => { this.couponService.setLoadingCoupon(false) });
  }

  cartChange(event: any): void {
    if (event.type == 'quantity') {
      this.loading = true;
      event.product.quantity = event.quantity;
      this.cartService.updateCartItem(event.product).subscribe(() => {
        this.initializeCart();
      });
    }
    if (event.type == 'delete') {
      this.loading = true;
      this.cartService
        .deleteCartItem(event.idProduct, event.quantity)
        .subscribe(() => {
          this.initializeCart();
        });
    }
  }
}
