import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MDBModalRef } from 'angular-bootstrap-md';
import { GtagService } from 'src/app/gtag/gtag.service';
import { ICart } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { HeaderCartService } from 'src/app/services/communication/header-cart.service';
import { CouponService } from 'src/app/services/coupon.service';

declare var gtag;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: ICart;
  subtotal: number = 0;

  proceedNext: boolean = true;
  loading: boolean = false;

  constructor(
    private router: Router,
    private modalRef: MDBModalRef,
    private cartService: CartService,
    private headerCartService: HeaderCartService,
    private couponService: CouponService
  ) {}

  ngOnInit(): void {
    this.initializeCart();
  }

  initializeCart(): void {
    this.loading = true;
    this.cartService.cartList(0).subscribe((response: any) => {
      this.cart = response as ICart;
      if (!this.cart.infoShoppingCart.length) {
        // If there aren't products in the cart remove the current coupon
        this.couponService.setCurrentCouponCode(null);
      }

      this.subtotal = this.cart?.subtotal;
      this.cart.infoShoppingCart.forEach((item, index) => {
        item.total_price = this.cart.productToSend[index].price;
      });
      this.headerCartService.setCartUpdate({ type: 'UPDATE' });
      this.loading = false;
    });
  }

  checkout(): void {
    this.router.navigate(['checkout']);
    this.closeModal();
  }

  cartChange(event: any): void {
    if (event.type == 'quantity') {
      this.loading = true;
      event.product.quantity = Number(event.quantity);
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

  closeModal(): void {
    this.modalRef.hide();
  }
}
