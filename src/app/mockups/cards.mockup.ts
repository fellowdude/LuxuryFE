import { ICardItem } from "../models/card-item.model";

export const cardItem: ICardItem = {
  _id: '001',
  holderName: 'Nombre',
  maskedNumber: '**** **** **** 1234',
  expirationDate: '11/21',
  paymentMethod: 'VISA',
  checked: false
}

export const cardsList: Array<ICardItem> = [ cardItem, cardItem, cardItem ]
