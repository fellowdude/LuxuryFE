import { FormControl } from '@angular/forms';

export interface ICardItem {
  _id?: string;
  checked?: boolean;
  cvv?: FormControl;
  expirationDate: string;
  holderName: string;
  maskedNumber: string;
  paymentMethod: string;
}

export interface ICardForm {
  cvv: number;
  expirationDate: string;
  holderName: string;
  installments: number;
  isCredit: boolean;
  maskedNumber: string;
  paymentMethod: string;
  userMail: string;
  userNumberDocument: string;
  userPhone: string;
}

export interface ICardSave {
  expirationDate: string;
  identificationNumber: string;
  name: string;
  number: string;
  paymentMethod: string;
}
