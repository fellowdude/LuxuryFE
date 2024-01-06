import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Messages } from 'src/app/messages';
import { ICart } from 'src/app/models/cart.model';
import { IOrderBodyItem, IValidationItem } from 'src/app/models/checkout.model';
import { ISupplierOrder } from 'src/app/models/supplier-order.model';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutPageService } from 'src/app/services/internal/checkout-page.service';
import { ToastrControllerService } from 'src/app/services/internal/toastr-controller.service';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.scss'],
})
export class OrderConfirmComponent implements OnInit {
  supplierList: Array<ISupplierOrder> = [];
  loading: boolean = false;

  @Input() validationItem: IValidationItem;
  @Output() onClick = new EventEmitter<any>(true);

  constructor(
    private toastrService: ToastrControllerService,
    private cartService: CartService,
    private checkoutPageService: CheckoutPageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { step: 'summary' },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
    this.initializeCartList(true);
    if (this.validationItem)
      if (!this.validationItem.code)
        this.toastrService.warningToastr(
          Messages.warningConfirmationOrden,
          Messages.warningTitle
        );
  }

  initializeCartList(sendInfo: boolean): void {
    this.loading = true;
    if (this.validationItem)
      this.cartService
        .cartList(3, this.validationItem)
        .subscribe((response: any) => {
          let rawResponse: ICart = response as ICart;
          this.supplierList = this.checkoutPageService.checkoutSupplierStructure(
            rawResponse.infoShoppingCart,
            rawResponse.productToSend,
            rawResponse.resultCoupon
          );
          let proceedNext = this.checkoutPageService.checkProceed(
            this.supplierList
          );
          if (sendInfo) {
            let detailList: Array<IOrderBodyItem> = [];
            let saved = 0;
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

              saved +=
                item?.info_product?.price * item?.quantity -
                rawResponse?.productToSend[index]?.price;
            });
            let supplierDiscountList = null;
            if (rawResponse.resultCoupon) {
              supplierDiscountList = {};
              this.supplierList.forEach((supplier) => {
                supplierDiscountList[supplier.method_id] = {
                  discount: supplier.delivery_discount || 0,
                };
              });

              if (rawResponse?.resultCoupon?.error) {
                this.toastrService.warningToastr(
                  rawResponse?.resultCoupon?.error,
                  Messages.warningTitle,
                  {
                    timeOut: 5000,
                    progressBar: true,
                  }
                );
              }
            }
            this.onClick.emit({
              proceedNext: proceedNext,
              detailList: detailList,
              subtotal: rawResponse.subtotal,
              discount: rawResponse?.resultCoupon?.amount_discount_coupon || 0,
              delivery_discount:
                rawResponse?.resultCoupon?.amount_delivery_coupon || 0,
              sellerDeliveryDiscounts: supplierDiscountList,
              saved: saved,
            });
          }
          this.loading = false;
        });
  }

  cartChange(event: any): void {
    if (event.type == 'delete') {
      this.loading = true;
      this.cartService
        .deleteCartItem(event.idProduct, event.quantity)
        .subscribe(() => {
          this.initializeCartList(true);
        });
    }
  }
}
