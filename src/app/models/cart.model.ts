import { IMethodSend } from './method-send.model';
import { IProductDetail } from './product.model';

export interface ICartItem {
  _id: string;
  delivery_method_price?: number;
  discountApply?: {
    message: string;
    apply: boolean;
    proceed: boolean;
  };
  entity?: string;
  id?: string;
  id_product: string;
  image_product: string;
  info_product?: IProductDetail;
  method_send?: IMethodSend;
  name_product: string;
  origin?: string;
  populate_method_send?: Array<string>;
  price: number;
  quantity: number;
  rangeMax?: number;
  rangeMin?: number;
  total_price: number;
  coupon?: {
    code?: string;
    code_id?: string;
    coupon_id?: string;
  };
}

export interface IProductToSend {
  entity: any;
  is_valid: boolean;
  nameCampaign: string;
  origin: string;
  pendding_state: boolean;
  preventNextStep: boolean;
  price: number;
  reason: Array<any>;
}

export interface ICart {
  infoShoppingCart: Array<ICartItem>;
  productToSend: Array<IProductToSend>;
  subtotal: number;
  resultCoupon?: IResultCoupon;
}

export interface IResultCoupon {
  amount_delivery_coupon: number;
  amount_discount_coupon: number;
  delivery_coupon: Array<{
    method_id: string;
    price: number;
    discount: number;
  }>;
  entity?: any;
  succefully?: string;
  error?: string;
}

export interface ICartBody {
  id_product: string;
  product: any;
  quantity: number;
  url_attachment: string;
}
