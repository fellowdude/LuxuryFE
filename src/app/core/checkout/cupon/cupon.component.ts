import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { CouponService } from 'src/app/services/coupon.service';

@Component({
  selector: 'app-cupon',
  templateUrl: './cupon.component.html',
  styleUrls: ['./cupon.component.scss'],
})
export class CuponComponent implements OnInit {
  @Input() couponCode: string = '';
  @Input() hasCoupon: boolean = false;
  couponForm: FormGroup;
  isCouponValid: boolean = false;
  isMobile: boolean;
  action: Subject<any> = new Subject();
  loadingCoupon: boolean = false;
  @Output() onClick = new EventEmitter<any>(true);
  @Output() onRemove = new EventEmitter();

  constructor(private couponService: CouponService) { }

  ngOnInit(): void {
    this.couponForm = new FormGroup({
      coupon: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
      ]),
    });
    this.checkCouponValidation();
    this.couponService.loadingCoupon$.subscribe((value) => {
      this.loadingCoupon = value;
    });
  }

  checkCouponValidation() {
    this.couponService.isCouponValid$.subscribe((value) => {
      this.isCouponValid = value;
    });
  }

  validateCoupon(): void {
    if (this.couponForm.invalid) return;
    if (!this.isMobile)
      this.onClick.emit({
        valid: true,
        value: this.couponForm.value['coupon'],
      });
    else
      this.action.next({ valid: true, value: this.couponForm.value['coupon'] });

    // just initiliaze the validation of coupon in false, this doesn't mean that the coupon is invalid
    this.couponService.setIsCouponValid(false);
    this.couponForm.reset();
  }

  get isThereCoupon() {
    return this.couponCode && this.hasCoupon && this.isCouponValid;
  }
  get buttonLabel() {
    return this.isThereCoupon ? 'Cambiar código' : 'Aplicar código';
  }

  get couponField() {
    return this.couponForm.get('coupon').value;
  }

  removeCoupon() {
    this.onRemove.emit();
  }
}
