import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ICartItem } from 'src/app/models/cart.model';
import { ISupplierOrder } from 'src/app/models/supplier-order.model';
import { InformationModalComponent } from '../../information-modal/information-modal.component';

@Component({
  selector: 'app-checkout-supplier',
  templateUrl: './checkout-supplier.component.html',
  styleUrls: ['./checkout-supplier.component.scss']
})
export class CheckoutSupplierComponent implements OnInit {

  modalRef: MDBModalRef;
  @Input() supplierOrder: ISupplierOrder;
  @Input() isSummary: boolean = false;
  @Output() onClick = new EventEmitter<any>();

  constructor(private modalService: MDBModalService) { }

  ngOnInit(): void {
  }

  itemChange(event: any, product: ICartItem): void{
    this.onClick.emit({... event, product: product});
  }

  showInfoModel(): void {
    this.modalRef = this.modalService.show(InformationModalComponent, {
      animated: true,
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      class: 'modal-information modal-dialog modal-dialog-centered',
      containerClass: 'modal fade',
      ignoreBackdropClick: false,
      data: {
        modalTitle: this.supplierOrder?.delivery_time,
        modalBody: this.supplierOrder?.delivery_description,
      },
    });
  }

}
