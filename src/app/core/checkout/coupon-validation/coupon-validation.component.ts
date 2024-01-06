import { Component, Input, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { InformationModalComponent } from 'src/app/modals/information-modal/information-modal.component';
import { CouponService } from 'src/app/services/coupon.service';

@Component({
  selector: 'app-coupon-validation',
  templateUrl: './coupon-validation.component.html',
  styleUrls: ['./coupon-validation.component.scss']
})
export class CouponValidationComponent implements OnInit {
  @Input() isCouponValid: boolean;
  @Input() currentStep: number;
  modalRef: MDBModalRef;
  errorCoupon: string = '';
  constructor(
    private modalService: MDBModalService,
    private couponService: CouponService,
  ) { }
  ngOnInit(): void {
    if (this.couponService.errorCoupon$) {
      this.couponService.errorCoupon$.subscribe((value) => {
        this.errorCoupon = value;
      });
    } else {
      this.errorCoupon = '';
    }
  }

  testModal(): void {
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
        modalTitle: "Cupones",
        modalBody: "El cupón tiene requisitos previos a cumplir para ser válido",
      },
    });
  }

}
