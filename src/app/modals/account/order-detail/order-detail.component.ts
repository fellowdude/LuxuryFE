import { Component, Inject, Input, OnInit } from '@angular/core';
import { IOrderDetail } from 'src/app/models/order-detail.model';
import { IOrder } from 'src/app/models/orders-history.model';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ORDER_HISTORY_TOKEN } from '../order-history/order-history';
import { ProfileService } from 'src/app/services/profile.service';
import { OrderService } from 'src/app/services/internal/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  loading: boolean = false;
  @Input() orderDetail: IOrderDetail;

  orderBasics: IOrder;
  constructor(
    private modalRef: MDBModalRef,
    private modalService: MDBModalService,
    private profileService: ProfileService,
    private orderService: OrderService,
    @Inject(ORDER_HISTORY_TOKEN) private orderHistoryComponent: any
  ) {}

  ngOnInit(): void {
    //this.orderDetail = orderDetail;
    this.profileService.getOrderInfo(this.orderDetail._id).subscribe(
      (res) => {
        this.orderDetail.sales = this.orderService.transformOrderDetail(res);
      }
    );
    this.orderBasics = {
      _id: this.orderDetail?._id,
      date: this.orderDetail?.date,
      orderNumber: this.orderDetail?.orderNumber,
      status: this.orderDetail?.status,
      productsQuantity: this.orderDetail?.productsQuantity,
      totalPrice: this.orderDetail?.totalPrice,
    };
  }

  closeModal() {
    this.modalRef.hide();
  }

  returnModal() {
    this.closeModal();
    this.modalRef = this.modalService.show(this.orderHistoryComponent, {
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
}
