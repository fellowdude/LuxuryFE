import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5';
import { v4 } from 'public-ip';
import { Constants } from 'src/app/constants';
import * as KJUR from 'jsrsasign';
import { IOrderBody, IPayUConfig } from 'src/app/models/checkout.model';
import { ICardForm, ICardItem } from 'src/app/models/card-item.model';
import { IAddressItemCheckout } from 'src/app/models/address.model';

@Injectable({
  providedIn: 'root'
})
export class SendPayuMethodFormatService {

  ipAddress: string
  constructor() { }

  formatDataNoToken(order: IOrderBody, orderCode: string, card: ICardForm, address: IAddressItemCheckout, subtotal: number, discountSubTotal?: number, discountDelivery?: number): IPayUConfig {
    (async () => {
      this.ipAddress = await v4();
    })();

    const oHeader = { alg: 'RS256', typ: 'JWT' };
    const oPayload: any = {
      securityCode: (card.cvv).toString(),
      expirationDate: card.expirationDate,
      number: card.maskedNumber,
      name: card.holderName
    };
    const sHeader = JSON.stringify(oHeader);
    const sPayload = JSON.stringify(oPayload);
    const sJWT = KJUR.jws.JWS.sign('RS256', sHeader, sPayload, Constants.FRONT_KEY);

    let payUConfig: IPayUConfig = {
      transaction: {
        order: {
          referenceCode: orderCode,
          description: "COMPRA REALIZADA EN LUXURY WEB",
          additionalValues: {
            TX_VALUE:{
              value: Number(subtotal + address.amount_total - (discountSubTotal || 0) - (discountDelivery || 0)),
              currency: 'PEN',
            }
          },
          buyer:{
            merchantBuyerId: order.user_id,
            fullName: order.delivery_name_customer,
            emailAddress: order.user_mail,
            contactPhone: order.delivery_phone_customer,
            dniNumber: order.user_document_number
          }
        },
        extraParameters: {
          INSTALLMENTS_NUMBER: card.isCredit? card.installments : 1,
        },
        payer: {
          merchantPayerId: order.user_id,
          fullName: card.holderName,
          emailAddress: card.userMail,
          contactPhone: card.userPhone,
          dniNumber: card.userNumberDocument
        },
        creditCard: sJWT,
        paymentMethod: card.paymentMethod,
        deviceSessionId: Md5.hashAsciiStr(''+(new Date()).getMilliseconds()).toString(),
        ipAddress: this.ipAddress
      }
    };
    return payUConfig;
  }

  formatDataToken(order: IOrderBody, orderCode: string, card: ICardItem, address: IAddressItemCheckout, subtotal: number, discountSubTotal?: number, discountDelivery?: number): IPayUConfig {
    (async () => {
      this.ipAddress = await v4();
    })();

    const oHeader = { alg: 'RS256', typ: 'JWT' };
    const oPayload: any = {
      card_id: card._id,
      securityCode: card.cvv.value,
    };
    const sHeader = JSON.stringify(oHeader);
    const sPayload = JSON.stringify(oPayload);
    const sJWT = KJUR.jws.JWS.sign('RS256', sHeader, sPayload, Constants.FRONT_KEY);

    let payUConfig: IPayUConfig = {
      transaction: {
        order: {
          referenceCode: orderCode,
          description: "COMPRA REALIZADA EN LUXURY WEB",
          additionalValues: {
            TX_VALUE:{
              value: Number(Number(subtotal + address.amount_total - (discountSubTotal || 0) - (discountDelivery || 0)).toFixed(2)),
              currency: 'PEN',
            }
          },
          buyer:{
            merchantBuyerId: order.user_id,
            fullName: order.delivery_name_customer,
            emailAddress: order.user_mail,
            contactPhone: order.delivery_phone_customer,
            dniNumber: order.user_document_number
          }
        },
        payer: {
          merchantPayerId: order.user_id,
          fullName: order.delivery_name_customer,
          emailAddress: order.user_mail,
          contactPhone: order.delivery_phone_customer,
          dniNumber: order.user_document_number
        },
        creditCard: sJWT,
        extraParameters: {
          INSTALLMENTS_NUMBER: 1,
        },
        paymentMethod: card.paymentMethod,
        deviceSessionId: Md5.hashAsciiStr(''+(new Date()).getMilliseconds()).toString(),
        ipAddress: this.ipAddress
      }
    };
    return payUConfig;
  }
}
