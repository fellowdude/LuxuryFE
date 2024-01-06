import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { IAddressItemCheckout } from 'src/app/models/address.model';
import { ICardForm, ICardItem } from 'src/app/models/card-item.model';
import { Messages } from 'src/app/messages';
import { IDrawer } from 'src/app/models/drawer.model';
import { DrawerComponent } from './drawer/drawer.component';
import { DrawerService } from './drawer/drawer.service';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { CuponComponent } from './cupon/cupon.component';
import {
  IAdditionalProductItem,
  ICheckoutAd,
  IOrderBody,
  ISendPayUMethod,
  IValidationItem,
} from 'src/app/models/checkout.model';
import { CheckoutService } from 'src/app/services/checkout.service';
import { SendPayuMethodFormatService } from 'src/app/services/internal/send-payu-method-format.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICheckoutPage } from 'src/app/resolvers/core/checkout/checkout.resolver';
import { FormatCheckoutAdService } from 'src/app/services/internal/format-checkout-ad.service';
import { FormatCheckoutAdditionalProductsService } from 'src/app/services/internal/format-checkout-additional-products.service';
import { ReloadCheckoutService } from 'src/app/services/communication/reload-checkout.service';
import { OtherPaymentMethodComponent } from 'src/app/modals/shopping/other-payment-method/other-payment-method.component';
import { HeaderCartService } from 'src/app/services/communication/header-cart.service';
import { GtagService } from 'src/app/gtag/gtag.service';
import { Product } from 'src/app/gtag/gtag-definitions';
import { CouponService } from 'src/app/services/coupon.service';
import { ToastrControllerService } from 'src/app/services/internal/toastr-controller.service';
import { HolidayService } from 'src/app/services/holiday.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  get resolvedData() {
    return this.route.snapshot.data['resolved'] as ICheckoutPage;
  }

  drawers: any;
  currentStep: number = 1;
  maxStep: number = 6;
  subtotal: number = 0;
  selectedAddress: IAddressItemCheckout = null;
  selectedCard: ICardItem | ICardForm = null;
  continueStep: boolean = true;
  hasCoupon: boolean = false;
  couponValue: string = null;
  isCouponValid: boolean = false;
  invoiceForm: FormGroup;
  modalRef: MDBModalRef;
  validationItem: IValidationItem;
  codeValidationItem: IValidationItem;
  paymentInfo: IOrderBody;
  orderId: string;
  orderCode: string;
  orderVerification: boolean = false;
  sendPayUMethod: ISendPayUMethod;
  checkoutAd: ICheckoutAd = null;
  noToken: boolean = true;
  additionalProductsList: Array<IAdditionalProductItem>;
  discountAmount: number = 0;
  discountDeliveryAmount: number = 0;
  couponName: string = '';
  maxCoupon: number = 0;
  maxDelivery: number = 0;
  typeCoupon: string = '';
  typeDelivery: string = '';
  inSummary: boolean = false;
  loadingOverview: boolean = false;
  loadingCoupon: boolean = false;
  gtagList: Array<Product> = [];
  sellerDiscount: any = null;
  savedValue: number = 0;
  calendarSelect: any;
  listCalendar: any;
  @ViewChild('reciept') reciept: DrawerComponent;
  @ViewChild('overview') overview: ElementRef;

  constructor(
    private checkoutService: CheckoutService,
    private drawerService: DrawerService,
    private sendPayUMethodFormatService: SendPayuMethodFormatService,
    private paymentService: PaymentService,
    private formatCheckoutAdService: FormatCheckoutAdService,
    private formatCheckoutAdditionalProductsService: FormatCheckoutAdditionalProductsService,
    private reloadCheckoutService: ReloadCheckoutService,
    private headerCartService: HeaderCartService,
    private modalService: MDBModalService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private gtag: GtagService,
    private couponService: CouponService,
    private toastrService: ToastrControllerService,
    private serviceHoliday: HolidayService
  ) { this.calendarSelect = {}; }

  ngOnInit(): void {
    this.drawers = this.drawerService.getDrawers();
    this.checkoutAd = this.formatCheckoutAdService.formatCheckoutAd(
      this.resolvedData.adInfo
    );
    this.additionalProductsList = this.formatCheckoutAdditionalProductsService.formatAdditionalProductsList(
      this.resolvedData.additionalProducts
    );
    this.drawersToggle();
    this.verifyInitialCoupon();
    this.checkCouponValidation();
    this.couponService.loadingCoupon$.subscribe((value) => {
      this.loadingCoupon = value;
    });
    this.calendarSelect.month = new Date().getMonth() + 1;
    this.calendarSelect.year = new Date().getFullYear();
    this.getCalendar();
  }

  get isThereCoupon() {
    return this.couponValue && this.hasCoupon && this.isCouponValid;
  }

  get couponButtonLabel() {
    return this.isThereCoupon
      ? 'Cambiar código de descuento'
      : '¿Tiene un cupón Luxury?';
  }

  getCalendar() {
    //this.couponService.setLoadingCoupon(true);
    this.serviceHoliday
      .getCalendar(this.calendarSelect.month, this.calendarSelect.year)
      .subscribe(
        listCalendar => {
          //this.couponService.setLoadingCoupon(false);
          this.listCalendar = listCalendar;
        },
        error => {
          //this.couponService.setLoadingCoupon(false);
          console.log(error);
        }
      );
  }

  checkCouponValidation() {
    this.couponService.isCouponValid$.subscribe((value) => {
      this.isCouponValid = value;
    });
  }

  verifyInitialCoupon() {
    this.couponService.setLoadingCoupon(true);
    this.couponService.currentCouponCode$.subscribe((code) => {
      if (code) {
        if (!this.codeValidationItem)
          this.codeValidationItem = {
            code,
          };
        this.couponValue = code;
        this.hasCoupon = true;
      }
      //this.couponService.setLoadingCoupon(false);
    });
  }

  validCoupon(event: any): void {
    this.couponService.setLoadingCoupon(true);
    this.hasCoupon = event?.valid;
    this.couponValue = event?.value;
    this.codeValidationItem = {
      ...this.codeValidationItem,
      code: this.couponValue,
    };
  }

  removeCoupon() {
    this.couponService.setLoadingCoupon(true);
    this.couponService
      .removeCoupon(this.couponValue)
      .subscribe((data: { updated: boolean }) => {
        if (data?.updated) {
          this.toastrService.successToastr(
            Messages.couponRemoved,
            Messages.congratTitle
          );
          this.hasCoupon = false;
          this.couponValue = '';
          this.codeValidationItem = {};
          this.couponService.setLoadingCoupon(false);
        }
      });
  }

  showValidateCouponModal(): void {
    this.modalRef = this.modalService.show(CuponComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-dialog modal-md modal-dialog-centered modal-coupon',
      animated: true,
      data: {
        isMobile: true,
      },
    });
    this.modalRef.content.action.subscribe((response: any) => {
      this.validCoupon(response);
      this.modalRef.hide();
    });
  }

  stepChangeForward(): void {
    this.currentStep++;
    if (this.currentStep > this.maxStep) {
      this.currentStep = this.maxStep;
    } else {
      this.drawersToggle();
    }
  }

  stepChangeBackward(): void {
    this.currentStep--;
    if (this.currentStep < 1) {
      this.currentStep = 1;
      this.location.back();
    } else {
      this.continueStep = true;
      this.loadingOverview = false;

      if (this.currentStep == 1 || this.currentStep == 2) {
        this.selectedAddress = null;
        this.inSummary = false;
      }
      if (this.currentStep == 4) this.selectedCard = null;

      this.drawersToggle();
    }
  }

  drawersToggle(): void {
    Object.values(this.drawers).forEach((e: IDrawer) => {
      if (this.currentStep != e.step) {
        e.opened = false;
      } else {
        e.opened = true;
      }
    });
    this.cdRef.detectChanges();
  }

  recieveCartState(event): void {
    if (event) {
      console.log("evento", event)
      this.inSummary = false;
      this.continueStep = true;
      this.subtotal = event?.subtotal || 0;
      this.validationItem = {
        cart: {
          total_amount: this.subtotal,
        },
        code: this.couponValue,
      };
      if (event.discount != null) this.discountAmount = event.discount;
      if (event.coupon_name != null)
        this.couponName = event.coupon_name;
      if (event.max_coupon != null)
        this.maxCoupon = event.max_coupon;
      if (event.max_delivery != null)
        this.maxDelivery = event.max_delivery;
      if (event.type_products != null)
        this.typeCoupon = event.type_products;
      if (event.type_delivery != null)
        this.typeDelivery = event.type_delivery;
      if (event.delivery_discount != null)
        this.discountDeliveryAmount = event.delivery_discount;
      this.paymentInfo = event?.paymentInfo;
      this.gtagList = event?.gtagList;
      if (this.subtotal == 0) this.continueStep = false;
      if (event?.saved) this.savedValue = event?.saved;
    } else {
      this.continueStep = false;
    }
  }

  recieveAddress(event): void {
    // console.log("AQUI ESSS DONDE DEBO LLAMAR AL 1", event);
    if (event) {
      this.overview?.nativeElement?.scrollIntoView({ behavior: 'smooth' });
      this.inSummary = false;
      this.selectedAddress = event;
      if (event.discount != null)
          this.discountAmount = event.discount;
      this.validationItem = {
        cart: {
          total_amount: this.subtotal + this.selectedAddress.amount_total,
        },
        delivery_price: this.selectedAddress.amount_total,
        address: this.selectedAddress.district._id,
        ubigeo: this.selectedAddress.ubigeo,
        type_address_ERP: this.selectedAddress.type_address_ERP || null,
        code: this.couponValue,
      };
      this.paymentInfo.current_step = 1;
      this.paymentInfo.address_id = this.selectedAddress?._id;
      this.paymentInfo.delivery_address = this.selectedAddress?.address;
      this.paymentInfo.delivery_type_address = this.selectedAddress?.type_address;
      this.paymentInfo.delivery_department_id = this.selectedAddress?.department._id;
      this.paymentInfo.delivery_district_id = this.selectedAddress?.district._id;
      this.paymentInfo.delivery_province_id = this.selectedAddress?.province._id;
      this.paymentInfo.delivery_reference = this.selectedAddress?.reference;
      this.paymentInfo.delivery_phone_customer = this.selectedAddress?.cellphone;
      this.paymentInfo.ubigeo = this.selectedAddress.ubigeo;
      this.continueStep = false;
      this.loadingOverview = true;
      this.checkoutService
        .setOrderInfo(this.paymentInfo, this.orderId)
        .subscribe(
          (result: any) => {
            this.orderId = result?._id;
            this.orderCode = result?.code;
            sessionStorage.setItem('code', result?.code);
            this.continueStep = true;
            this.loadingOverview = false;
            this.gtag.beginCheckout({
              checkout_step: 1,
              items: this.gtagList,
              currency: 'PEN',
              value: this.subtotal + this.selectedAddress.amount_total,
              affiliation: 'Luxury Web',
              shipping: this.selectedAddress.amount_total,
              tax: 0,
              transaction_id: this.orderCode,
            });
            this.gtag.checkoutProgress({
              checkout_step: 2,
              value: this.subtotal + this.selectedAddress.amount_total,
              affiliation: 'Luxury Web',
              currency: 'PEN',
              shipping: this.selectedAddress.amount_total,
              transaction_id: this.orderCode,
              items: this.gtagList,
              tax: 0,
            });
          },
          (error: any) => {
            this.loadingOverview = false;
          }
        );
    } else {
      this.continueStep = false;
    }
  }

  recieveSummaryState(event): void {
    // console.log("AQUI ESSS DONDE DEBO REASIGNAR");
    if (event) {
      this.inSummary = true;
      this.paymentInfo.detail = event?.detailList;
      this.subtotal = event?.subtotal || 0;
      this.gtagList = event?.gtagList;
      if (event?.selectedAddress) {
        this.selectedAddress = event?.selectedAddress;
      }
      if (event?.saved) this.savedValue = event?.saved;
      if (this.subtotal != 0) {
        // AGREGADO
        if (event.discount != null)
          this.discountAmount = event.discount;
        if (event.delivery_discount != null)
          this.discountDeliveryAmount = event.delivery_discount;
        // FIN
        if (this.selectedAddress?.amount_total >= 0) {
          this.validationItem.cart.total_amount =
            this.subtotal + this.selectedAddress.amount_total;
          this.continueStep = false;
          this.loadingOverview = true;
          this.checkoutService
            .setOrderInfo(this.paymentInfo, this.orderId)
            .subscribe(
              (result: any) => {
                if (event?.preventNextStep) return;
                this.gtag.checkoutProgress({
                  checkout_step: 3,
                  items: this.gtagList,
                  currency: 'PEN',
                  value: this.subtotal + this.selectedAddress.amount_total,
                  affiliation: 'Luxury Web',
                  shipping: this.selectedAddress.amount_total,
                  tax: 0,
                  transaction_id: this.orderCode,
                });
                this.continueStep = true;
                this.loadingOverview = false;
              },
              (error: any) => {
                this.loadingOverview = false;
              }
            );
        } else {
          this.continueStep = false;
        }
      } else {
        this.currentStep = 1;
        this.drawersToggle();
        //MESSAGE CART EXPIRED
      }
    } else {
      this.continueStep = false;
    }
  }

  recieveRecieptState(event): void {
    if (event) {
      this.gtag.checkoutProgress({
        checkout_step: 4,
        value: event.subtotal + this.selectedAddress.amount_total,
        affiliation: 'Luxury Web',
        currency: 'PEN',
        shipping: this.selectedAddress.amount_total,
        transaction_id: this.orderCode,
        items: this.gtagList,
        tax: 0,
      });
      if (event?.isInvoice) {
        this.continueStep = false;
        this.invoiceForm = event?.form;
        if (this.invoiceForm) {
          this.paymentInfo.invoice_business_name = this.invoiceForm.get(
            'name'
          ).value;
          this.paymentInfo.invoice_ruc = this.invoiceForm.get('ruc').value;
          this.paymentInfo.invoice_address = this.invoiceForm.get(
            'address'
          ).value;
          this.paymentInfo.invoice_department = this.invoiceForm.get(
            'department'
          ).value;
          this.paymentInfo.invoice_province = this.invoiceForm.get(
            'province'
          ).value;
          this.paymentInfo.invoice_district = this.invoiceForm.get(
            'district'
          ).value;
          this.paymentInfo.invoice_send = true;
          this.loadingOverview = true;
          this.checkoutService
            .setOrderInfo(this.paymentInfo, this.orderId)
            .subscribe((result: any) => {
              this.continueStep = true;
              this.loadingOverview = false;
            });
        }
      } else {
        this.continueStep = true;
      }
    } else {
      this.continueStep = false;
    }
  }

  recieveCardState(event): void {
    if (event) {
      if (event?.noToken) {
        if (event?.card?.cvv?.valid) {
          this.overview?.nativeElement?.scrollIntoView({ behavior: 'smooth' });
          this.continueStep = true;
          this.selectedCard = event.card as ICardItem;
          this.validationItem.number_card = this.selectedCard.maskedNumber;
          this.noToken = true;
          this.sendPayUMethod = {
            order: {
              orderId: this.orderId,
            },
            payment: this.sendPayUMethodFormatService.formatDataToken(
              this.paymentInfo,
              this.orderCode,
              this.selectedCard,
              this.selectedAddress,
              this.subtotal
            ),
          };
          this.gtag.checkoutProgress({
            checkout_step: 5,
            value: event.subtotal + this.selectedAddress.amount_total,
            affiliation: 'Luxury Web',
            currency: 'PEN',
            shipping: this.selectedAddress.amount_total,
            transaction_id: this.orderCode,
            items: this.gtagList,
            tax: 0,
          });
        } else {
          this.continueStep = false;
        }
      } else {
        this.modalRef = this.modalService.show(OtherPaymentMethodComponent, {
          backdrop: true,
          keyboard: true,
          focus: true,
          show: false,
          ignoreBackdropClick: false,
          class: 'modal-full-height modal-right mh-100 my-0',
          containerClass: 'right modal-dialog-scrollable mh-100 my-0',
          animated: true,
          data: {
            bodyInfo: {
              orderId: this.orderId,
              paymentInfo: this.paymentInfo,
              orderCode: this.orderCode,
              selectedAddress: this.selectedAddress,
              subtotal: this.subtotal,
              coupon: this.couponValue,
            },
          },
        });

        this.modalRef.content.action.subscribe((result: any) => {
          if (result) {
            this.selectedCard = result.cardForm as ICardForm;
            this.noToken = false;
            this.orderVerification = true;
            this.continueStep = true;
            this.validationItem.number_card = this.selectedCard.maskedNumber;
            this.sendPayUMethod = {
              order: {
                orderId: this.orderId,
              },
              payment: this.sendPayUMethodFormatService.formatDataNoToken(
                this.paymentInfo,
                this.orderCode,
                this.selectedCard,
                this.selectedAddress,
                this.subtotal
              ),
            };
            this.gtag.checkoutProgress({
              checkout_step: 5,
              value: event.subtotal + this.selectedAddress.amount_total,
              affiliation: 'Luxury Web',
              currency: 'PEN',
              shipping: this.selectedAddress.amount_total,
              transaction_id: this.orderCode,
              items: this.gtagList,
              tax: 0,
            });
            this.stepChangeForward();
          }
        });
      }
    } else {
      this.continueStep = false;
    }
  }

  recieveConfirmationState(event): void {
    // console.log("ESTO ES LO QUE DEBERIA DE GUIARME");
    if (event) {
      this.paymentInfo.number_card = this.selectedCard.maskedNumber;
      this.paymentInfo.couponCode = this.couponValue;
      this.paymentInfo.detail = event?.detailList;
      this.subtotal = event?.subtotal || 0;
      if (this.subtotal != 0) {
        this.validationItem.cart.total_amount =
          this.subtotal + this.selectedAddress.amount_total;
        this.continueStep = false;
        this.loadingOverview = true;
        if (event.discount != null)
          this.discountAmount = event.discount;
        if (event.delivery_discount != null)
          this.discountDeliveryAmount = event.delivery_discount;
        if (event.coupon_name != null)
          this.couponName = event.coupon_name;
        if (event.max_coupon != null)
          this.maxCoupon = event.max_coupon;
        if (event.max_delivery != null)
          this.maxDelivery = event.max_delivery;
        if (event.type_products != null)
          this.typeCoupon = event.type_products;
        if (event.type_delivery != null)
          this.typeDelivery = event.type_delivery;
        // if (event.delivery_discount != null)
        //   this.discountDeliveryAmount = event.delivery_discount;
        if (event.sellerDeliveryDiscounts != null)
          this.sellerDiscount = event.sellerDeliveryDiscounts;
        if (event?.saved != null) this.savedValue = event?.saved;
        this.checkoutService
          .setOrderInfo(this.paymentInfo, this.orderId)
          .subscribe((result: any) => {
            this.continueStep = true;
            this.loadingOverview = false;
            if (this.noToken) {
              this.sendPayUMethod = {
                order: {
                  orderId: this.orderId,
                },
                payment: this.sendPayUMethodFormatService.formatDataToken(
                  this.paymentInfo,
                  this.orderCode,
                  this.selectedCard as ICardItem,
                  this.selectedAddress,
                  this.subtotal,
                  this.discountAmount,
                  this.discountDeliveryAmount
                ),
              };
            } else {
              this.sendPayUMethod = {
                order: {
                  orderId: this.orderId,
                },
                payment: this.sendPayUMethodFormatService.formatDataNoToken(
                  this.paymentInfo,
                  this.orderCode,
                  this.selectedCard as ICardForm,
                  this.selectedAddress,
                  this.subtotal,
                  this.discountAmount,
                  this.discountDeliveryAmount
                ),
              };
            }
          });
      } else {
        this.currentStep = 1;
        this.drawersToggle();
        //MESSAGE CART EXPIRED
      }
    } else {
      this.continueStep = false;
    }
  }

  pay(): void {
    this.continueStep = false;
    if (this.currentStep != this.maxStep) {
      this.loadingOverview = true;
      this.checkoutService
        .validateCardBines(this.validationItem)
        .pipe()
        .subscribe((result) => {
          if (result) {
            this.doPayment();
          } else {
            this.orderVerification = true;
            this.continueStep = true;
            this.loadingOverview = false;
            this.stepChangeForward();
          }
        });
    } else {
      this.doPayment();
    }
  }

  doPayment(): void {
    if (this.noToken) {
      this.loadingOverview = true;
      this.paymentService
        .setPayUMethod(this.sendPayUMethod)
        .pipe()
        .subscribe(
          (result) => {
            this.gtag.purchase({
              items: this.gtagList,
              shipping: this.selectedAddress.amount_total,
              value: this.subtotal + this.selectedAddress.amount_total,
              transaction_id: this.orderCode,
              currency: 'PEN',
              affiliation: 'Luxury Web',
            });
            this.loadingOverview = false;
            this.continueStep = true;
            this.router.navigate(['/checkout/exito']);
            this.codeValidationItem = {};
            this.couponService.setCurrentCouponCode('');
            this.couponService.setIsCouponValid(false);
            this.couponService.setErrorCoupon('');
            this.headerCartService.setCartUpdate({ type: 'UPDATE' });
          },
          (error) => {
            this.loadingOverview = false;
            this.router.navigate(['/checkout/error']);
          }
        );
    } else {
      this.loadingOverview = true;
      this.paymentService
        .setPayUMethodNoToken(this.sendPayUMethod)
        .pipe()
        .subscribe(
          (result) => {
            this.gtag.purchase({
              items: this.gtagList,
              shipping: this.selectedAddress.amount_total,
              value: this.subtotal + this.selectedAddress.amount_total,
              transaction_id: this.orderCode,
              currency: 'PEN',
              affiliation: 'Luxury Web',
            });
            this.loadingOverview = false;
            this.continueStep = true;
            this.router.navigate(['/checkout/exito']);
            this.headerCartService.setCartUpdate({ type: 'UPDATE' });
          },
          (error) => {
            this.loadingOverview = false;
            this.router.navigate(['/checkout/error']);
          }
        );
    }
  }

  addedProductOnCheckout(): void {
    if (this.currentStep === 1) {
      this.reloadCheckoutService.setCheckoutReloadUpdate({ type: 'CART' });
    }
    if (this.currentStep === 3) {
      this.reloadCheckoutService.setCheckoutReloadUpdate({ type: 'SUMMARY' });
    }
  }
}
