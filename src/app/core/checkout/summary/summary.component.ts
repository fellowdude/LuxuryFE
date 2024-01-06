import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutPageService } from 'src/app/services/internal/checkout-page.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICart } from 'src/app/models/cart.model';
import { IOrderBodyItem, IValidationItem } from 'src/app/models/checkout.model';
import { ISupplierOrder } from 'src/app/models/supplier-order.model';
import { ReloadCheckoutService } from 'src/app/services/communication/reload-checkout.service';
import { Product } from 'src/app/gtag/gtag-definitions';
import { CheckoutService } from 'src/app/services/checkout.service';
import { HeaderCartService } from 'src/app/services/communication/header-cart.service';
import { CouponService } from 'src/app/services/coupon.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  @Input() validationItem: IValidationItem;
  @Output() onClick = new EventEmitter<any>(true);

  supplierList: Array<ISupplierOrder> = [];
  loading: boolean = false;
  deletedItem: boolean = false;
  gtagList: Array<Product> = [];

  constructor(
    private checkoutService: CheckoutService,
    private cartService: CartService,
    private checkoutPageService: CheckoutPageService,
    private reloadCheckoutService: ReloadCheckoutService,
    private route: ActivatedRoute,
    private router: Router,
    private headerCartService: HeaderCartService,
    private couponService: CouponService
  ) {
    this.reloadCheckoutService.checkoutReloadUpdated.subscribe((response) => {
      if (response.type === 'SUMMARY') {
        this.initializeCart();
      }
    });
  }

  ngOnInit(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { step: 'summary' },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
    // console.log("SUMMARY-COMPONENT")
    this.initializeCart();
  }

  initializeCart(): void {
    this.loading = true;
    if(this.validationItem)
      this.cartService
        .cartList(2, this.validationItem)
        .subscribe((response: any) => {

          let rawResponse: ICart = response as ICart;
          this.supplierList = this.checkoutPageService.checkoutSupplierStructure(
            rawResponse.infoShoppingCart,
            rawResponse.productToSend,
            rawResponse.resultCoupon,
            false
          );
          let proceedNext = this.checkoutPageService.checkProceed(
            this.supplierList
          );
          let saved = 0;
          let detailList: Array<IOrderBodyItem> = [];
          rawResponse?.infoShoppingCart.forEach((item, index) => {
            detailList.push({
              discount:
                item.price * item.quantity -
                rawResponse.productToSend[index].price,
              discount_price: rawResponse.productToSend[index].price,
              method_send:
                item.populate_method_send.length > 0
                  ? item.populate_method_send[0]
                  : null,
              price: item.price,
              quantity: item.quantity,
              product_id: item.id_product,
              origin: rawResponse.productToSend[index].origin,
              entity: rawResponse.productToSend[index].entity,
            });

            saved += item?.info_product?.price * item?.quantity - rawResponse?.productToSend[index]?.price
          });
          this.loading = false;
          this.gtagList = rawResponse.infoShoppingCart?.map(
            (product, index)=>{
              return {
                id: product.info_product?.SKU,
                brand: product.info_product?.brand?.name,
                name: product.name_product,
                price: product.total_price,
                quantity: product.quantity,
                list_position: index + 1,
                category: product?.info_product?.campaign?.name || product?.info_product?.categories?.[0]?.name,
              }
            }
          )

          if(this.deletedItem){
            this.checkoutService
            .getDeliveryPrices(1, this.validationItem)
            .subscribe(
              (response: any) => {
                this.deletedItem = false;
                let address = response.find((e)=>{ return e.ubigeo == this.validationItem?.ubigeo})
                this.onClick.emit({
                  proceedNext: proceedNext,
                  detailList: detailList,
                  subtotal: rawResponse.subtotal,
                  gtagList: this.gtagList,
                  selectedAddress: address,
                  saved: saved
                });
              }
            )
          }else{
            this.onClick.emit({
              proceedNext: proceedNext,
              detailList: detailList,
              subtotal: rawResponse.subtotal,
              discount: rawResponse?.resultCoupon?.amount_discount_coupon || 0,
              delivery_discount:
                rawResponse?.resultCoupon?.amount_delivery_coupon || 0,
              gtagList: this.gtagList,
              saved: saved
            });
          }

          this.headerCartService.setCartUpdate({ type: 'UPDATE' });
          
          if (rawResponse?.resultCoupon?.error) {
            this.couponService.setIsCouponValid(false);
            this.couponService.setErrorCoupon(rawResponse?.resultCoupon?.error);
          } else{
            this.couponService.setIsCouponValid(true);
            this.couponService.setErrorCoupon('');
          }
        });
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
          this.deletedItem = true;
          this.initializeCart();
        });
    }
  }
}
