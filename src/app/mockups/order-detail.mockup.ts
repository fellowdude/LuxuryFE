import {IOrderDetail, ISale} from '../models/order-detail.model';
import {
  OrderStatus,
} from '../models/orders-history.model';

export const saleProduct = {
  _id: '4bc25dc',
  productId: '123',
  nameProduct: 'Dr. Pepper',
  imageProduct: 'https://via.placeholder.com/100x100',
  price: 20,
  brand: 'Marca',
};

export const sale1: ISale = {
  supplierName: 'ACME',
  products: [saleProduct],
  shippingCost: 10,
  deliveryTime: 3,
};

export const sale2: ISale = {
  supplierName: 'NERV',
  products: [saleProduct, saleProduct],
  shippingCost: 10,
  deliveryTime: 3,
};

export const orderDetail: IOrderDetail = {
  _id: '12345',
  date: '12/02/2020',
  orderNumber: '0000000000',
  status: OrderStatus.Pending,
  productsQuantity: 3,
  totalPrice: 90,
  sales: [sale1, sale2],
};
