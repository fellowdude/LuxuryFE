import {IOrder} from './orders-history.model';

export interface ISale {
  deliveryTime: number | string;
  products: ISaleProduct[];
  shippingCost: number;
  supplierName: string;
}


export interface ISaleProduct {
  _id?: string;
  brand: string;
  imageProduct: string;
  nameProduct: string;
  price: number;
  productId?: string;
}

export interface IOrderDetail extends IOrder {
  sales: ISale[];
}
