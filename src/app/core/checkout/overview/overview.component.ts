import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CouponService } from 'src/app/services/coupon.service';
import { IAddressItem, IAddressItemCheckout } from 'src/app/models/address.model';
import { ICardItem } from 'src/app/models/card-item.model';
import { IMethodSend } from 'src/app/models/method-send.model';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  @Input() hasCoupon: boolean;
  @Input() continueStep: boolean;
  @Input() subtotal: number = 0;
  @Input() discountAmount: number = 0;
  @Input() discountDeliveryAmount: number = 0;
  @Input() haveValidCoupon: boolean = false;
  @Input() selectedAddress: IAddressItemCheckout = null;
  @Input() invoiceForm: FormGroup;
  @Input() selectedCard: ICardItem = null;
  @Input() inSummary: boolean = false;
  @Input() loading: boolean = false;
  @Input() sellerDiscount: any = null;
  @Input() savedValue: number = null;
  @Input() currentStep: number = null;
  @Input() couponName: string = '';
  @Input() maxCoupon: number = null;
  @Input() maxDelivery: number = null;
  @Input() typeCoupon: string = '';
  @Input() typeDelivery: number = null;
  @Output() onClick = new EventEmitter<any>(true);
  @Output() onPay = new EventEmitter<any>(true);

  constructor(
    private couponService: CouponService,
  ) { }

  ngOnInit(): void {
    // console.log("couponName", this.couponName);
    // console.log("maxCoupon", this.maxCoupon);
    // console.log("maxDelivery", this.maxDelivery);
    // console.log("typeCoupon", this.typeCoupon);
    // console.log("typeDelivery", this.typeDelivery);
    // console.log("discountAmount", this.discountAmount);
    // console.log("discountDeliveryAmount", this.discountDeliveryAmount);
    this.couponService.errorCoupon$.subscribe((value) => {
      this.haveValidCoupon = value == '' ? true : false;
    });
  }

  continue(): void {
    this.onClick.emit();
  }

  pay(): void {
    this.onPay.emit();
  }

  validateMethodTime(method: IMethodSend): string{
    if(method.rangeMax == method.rangeMin)
      if(method.rangeMin == 1) return '24 horas';
      else return method.rangeMin + ' días habiles';
    else return method.rangeMin + ' - ' + method.rangeMax + ' días habiles';
  }
}
