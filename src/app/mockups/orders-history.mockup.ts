import {
  IOrder,
  IOrderHistory,
  OrderStatus,
} from '../models/orders-history.model';

export const order1: IOrder = {
  _id: '12345',
  date: '12/02/2020',
  orderNumber: '0000000000',
  status: OrderStatus.Pending,
  productsQuantity: 3,
  totalPrice: 90,
};

export const order2: IOrder = {
  _id: '23456',
  date: '12/02/2020',
  orderNumber: '0000000000',
  status: OrderStatus.Paid,
  productsQuantity: 3,
  totalPrice: 270,
};

export const order3: IOrder = {
  _id: '34567',
  date: '12/02/2020',
  orderNumber: '0000000000',
  status: OrderStatus.Rejected,
  productsQuantity: 3,
  totalPrice: 90,
};

export const ordersHistory: IOrderHistory = {
  orderHistory: [order1, order2, order3],
};
