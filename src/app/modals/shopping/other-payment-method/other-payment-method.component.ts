import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { Constants } from 'src/app/constants';
import { IAddressItemCheckout } from 'src/app/models/address.model';
import { ICardForm, ICardSave } from 'src/app/models/card-item.model';
import {
  IOrderBody,
  ISendPayUMethod,
  IValidationItem,
} from 'src/app/models/checkout.model';
import { CheckoutService } from 'src/app/services/checkout.service';
import { SendPayuMethodFormatService } from 'src/app/services/internal/send-payu-method-format.service';
import { PaymentService } from 'src/app/services/payment.service';
import * as KJUR from 'jsrsasign';
import { HeaderCartService } from 'src/app/services/communication/header-cart.service';
import { ToastrControllerService } from 'src/app/services/internal/toastr-controller.service';
import { Messages } from 'src/app/messages';

declare var require: any;
var lookup = require('binlookup')();

@Component({
  selector: 'app-other-payment-method',
  templateUrl: './other-payment-method.component.html',
  styleUrls: ['./other-payment-method.component.scss'],
})
export class OtherPaymentMethodComponent implements OnInit, OnDestroy {
  cardForm: FormGroup;
  bodyInfo: IBodyInfo;
  selectCardForm: ICardForm;
  action: Subject<any> = new Subject();
  loadingPayment: boolean = false;

  constructor(
    private toastrService: ToastrControllerService,
    private checkoutService: CheckoutService,
    private paymentService: PaymentService,
    private sendPayUMethodFormatService: SendPayuMethodFormatService,
    private headerCartService: HeaderCartService,
    private router: Router,
    public modalRef: MDBModalRef
  ) {}

  ngOnInit(): void {
    let today = new Date();
    this.cardForm = new FormGroup({
      holderName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      paymentMethod: new FormControl(null, [Validators.required]),
      maskedNumber: new FormControl(null, [Validators.required]),
      expYear: new FormControl(null, [
        Validators.required,
        Validators.min(today.getFullYear()),
        Validators.max(today.getFullYear() + 25),
      ]),
      expMonth: new FormControl(null, [
        Validators.required,
        Validators.min(1),
        Validators.max(12),
      ]),
      cvv: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(4),
      ]),
      isCredit: new FormControl(false, [Validators.required]),
      userMail: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50),
        Validators.email,
      ]),
      userPhone: new FormControl(null, [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(9),
      ]),
      userNumberDocument: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(10),
      ]),
      installments: new FormControl(0, [Validators.min(0), Validators.max(36)]),
      accept: new FormControl(true),
      terms: new FormControl(true, [Validators.requiredTrue]),
    });
  }

  ngOnDestroy(): void {
    this.action.unsubscribe();
  }

  confirmPayment(): void {
    if (this.cardForm.valid) {
      this.selectCardForm = this.cardForm.value as ICardForm;
      this.selectCardForm.expirationDate =
        this.cardForm.get('expYear').value +
        '/' +
        String(this.cardForm.get('expMonth').value).padStart(2, '0');
      if (this.cardForm.value['accept']) {
        let cardSave: ICardSave = {
          name: this.selectCardForm.holderName,
          number: this.selectCardForm.maskedNumber,
          identificationNumber: this.selectCardForm.userNumberDocument,
          paymentMethod: this.selectCardForm.paymentMethod,
          expirationDate: this.selectCardForm.expirationDate,
        };
        const oHeader = { alg: 'RS256', typ: 'JWT' };
        const oPayload: any = cardSave;
        const sHeader = JSON.stringify(oHeader);
        const sPayload = JSON.stringify(oPayload);
        const sJWT = KJUR.jws.JWS.sign(
          'RS256',
          sHeader,
          sPayload,
          Constants.FRONT_KEY
        );
        let cardBody = {
          data: sJWT,
        };
        this.loadingPayment = true;
        this.checkoutService.addUserCard(cardBody).subscribe(
          (result) => {
            this.toastrService.successToastr(
              Messages.successCardSaveAndPay,
              Messages.successTitle
            );
            this.payment();
          },
          (_) => {
            this.loadingPayment = false;
          }
        );
      } else {
        this.payment();
      }
    } else {
      //MESSAGE
      this.toastrService.warningToastr(
        Messages.warningInvalidForm,
        Messages.warningTitle
      );
    }
  }

  payment(): void {
    let validateData: IValidationItem = {
      address: this.bodyInfo.selectedAddress._id,
      type_address_ERP: this.bodyInfo.selectedAddress.type_address_ERP,
      ubigeo: this.bodyInfo.selectedAddress.ubigeo,
      number_card: this.selectCardForm.maskedNumber,
      cart: {
        total_amount:
          this.bodyInfo.subtotal + this.bodyInfo.selectedAddress.amount_total,
      },
      code: this.bodyInfo.coupon || null
    };
    console.log(validateData)
    this.checkoutService
      .validateCardBines(validateData)
      .pipe()
      .subscribe((result) => {
        console.log("HERE" + result)
        if (result) {
          this.pay();
        } else {
          this.loadingPayment = false;
          this.modalRef.hide();
          this.action.next({
            cardForm: this.selectCardForm,
          });
        }
      });
  }

  pay(): void {
    let sendPayUMethod: ISendPayUMethod = {
      order: {
        orderId: this.bodyInfo.orderId,
      },
      payment: this.sendPayUMethodFormatService.formatDataNoToken(
        this.bodyInfo.paymentInfo,
        this.bodyInfo.orderCode,
        this.selectCardForm,
        this.bodyInfo.selectedAddress,
        this.bodyInfo.subtotal
      ),
    };
    this.paymentService
      .setPayUMethodNoToken(sendPayUMethod)
      .pipe()
      .subscribe(
        (result) => {
          this.loadingPayment = false;
          this.headerCartService.setCartUpdate({ type: 'UPDATE' });
          this.modalRef.hide();
          this.router.navigate(['/checkout/exito']);
        },
        (error) => {
          this.loadingPayment = false;
          this.headerCartService.setCartUpdate({ type: 'UPDATE' });
          this.modalRef.hide();
          this.router.navigate(['/checkout/error']);
        }
      );
  }

  checkCard(): void {
    let card = this.cardForm.get('maskedNumber').value
      ? (this.cardForm.get('maskedNumber').value.toString() as string).substr(
          0,
          6
        )
      : null;
    if (card) {
      lookup(card, (err, data) => {
        if (!err) {
          if (data.type == 'debit') {
            this.cardForm.get('isCredit').setValue(false);
            this.cardForm.get('installments').setValue(0);
            this.cardForm
              .get('installments')
              .setValidators([
                Validators.required,
                Validators.min(0),
                Validators.max(36),
              ]);
          }
          if (data.type == 'credit') {
            this.cardForm.get('isCredit').setValue(true);
            this.cardForm.get('installments').setValue(1);
            this.cardForm
              .get('installments')
              .setValidators([
                Validators.required,
                Validators.min(1),
                Validators.max(36),
              ]);
          }
          this.cardForm
            .get('paymentMethod')
            .setValue((data.scheme as string).toUpperCase());
        } else {
          this.cardForm.get('maskedNumber').setValue(null);
          this.cardForm.get('cvv').setValue(null);
          this.cardForm.get('expYear').setValue(null);
          this.cardForm.get('expMonth').setValue(null);
          //MESSAGE CARD ERROR
        }
      });
    }
  }

  closeModal(): void {
    this.modalRef.hide();
  }
}

export interface IBodyInfo {
  orderId: string;
  paymentInfo: IOrderBody;
  orderCode: string;
  selectedAddress: IAddressItemCheckout;
  subtotal: number;
  coupon?: string;
}
