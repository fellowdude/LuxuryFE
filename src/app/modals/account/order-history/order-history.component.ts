import { Component, Inject, OnInit } from '@angular/core';
import { IOrderHistory } from 'src/app/models/orders-history.model';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';

import { ProfileService } from 'src/app/services/profile.service';
import { OrderService } from 'src/app/services/internal/order.service';
import { CartService } from 'src/app/services/cart.service';
import { MENU_ACCOUNT_TOKEN } from '../menu-account/menu-account';
import { ORDER_DETAIL_TOKEN } from '../order-detail/order-detail';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit {
  // initialize orderHistory empty
  orders: IOrderHistory = {
    orderHistory: [],
  };

  carts: any = [];

  loading: boolean = false;
  canBack: boolean = true;

  constructor(
    private modalRef: MDBModalRef,
    private cartService: CartService,
    private modalService: MDBModalService,
    private profileService: ProfileService,
    private orderInternalService: OrderService,
    @Inject(MENU_ACCOUNT_TOKEN) private menuAccountComponent: any,
    @Inject(ORDER_DETAIL_TOKEN) private orderDetailComponent: any
  ) {}

  ngOnInit(): void {
    this.initializeCart();
    this.profileService.getOrderHistory().subscribe((res) => {
      this.orders.orderHistory = this.orderInternalService.transformOrderHistory(
        res
      );
    });
  }

  initializeCart(): void {
    this.cartService.cartSize().subscribe((res) => {
      this.carts = res.total_item;
      // console.log("res.total_item", res.total_item)
    });
  }

  returnModal(): void {
    this.closeModal();
    this.modalRef = this.modalService.show(this.menuAccountComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-full-height modal-right mh-100 my-0',
      containerClass: 'right modal-dialog-scrollable mh-100 my-0',
      animated: true,
    });
  }

  closeModal() {
    this.modalRef.hide();
  }

  ordersChange(event) {
    this.closeModal();
    this.modalRef = this.modalService.show(this.orderDetailComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-full-height modal-right mh-100 my-0',
      containerClass: 'right modal-dialog-scrollable mh-100 my-0',
      animated: true,
      data: {
        orderDetail: event,
      },
    });
  }
}
