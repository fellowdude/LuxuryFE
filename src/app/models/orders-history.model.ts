export interface IOrder {
  _id: string;
  date: string;
  orderNumber: string;
  productsQuantity: number;
  status: OrderStatus | string;
  totalPrice: number;
}

export enum OrderStatus {
  Paid,
  Pending,
  Rejected,
}

export interface IOrderHistory {
  orderHistory: IOrder[];
}

