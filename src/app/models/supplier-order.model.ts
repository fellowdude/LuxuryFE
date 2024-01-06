import { ICartItem } from './cart.model';

export interface ISupplierInfo {
  _id?: string;
  email?: string;
  email_sales?: string;
  method_send?: Array<string>;
  name: string;
  phone_number?: string;
  post_sell_representative?: string;
  post_sell_representative_name?: string;
}
export interface ISupplierOrder {
  delivery_description?: string;
  delivery_price: number;
  delivery_discount?: number;
  delivery_time: string;
  discountError?: boolean;
  id?: string;
  method_id?: string;
  name: string;
  products: Array<ICartItem>;
}
