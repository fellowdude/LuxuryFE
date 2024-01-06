import { IDrawer } from './drawer.model';
import { IProductCard } from './product-card.model';

export interface ICheckoutDrawers {
  address: IDrawer;
  card: IDrawer;
  cart: IDrawer;
  confirm: IDrawer;
  reciept: IDrawer;
  summary: IDrawer;
}

export interface IValidationItem {
  address?: string;
  cart?: {
    total_amount: number;
  };
  number_card?: string;
  type_address_ERP?: string;
  ubigeo?: string;
  delivery_price?: number;
  code?: string;
}

export interface IOrderBodyItem {
  discount: number;
  discount_price: number;
  entity: string;
  method_send: string;
  origin: string;
  price: number;
  product_id: string;
  quantity: number;
}

export interface IOrderBody {
  address_id: string;
  currency: string;
  current_step?: number;
  delivery_address: string;
  delivery_department_id: string;
  delivery_district_id: string;
  delivery_name_customer: string;
  delivery_phone_customer: string;
  delivery_province_id: string;
  delivery_reference: string;
  delivery_type_address: string;
  detail: Array<IOrderBodyItem>;
  invoice_address: string;
  invoice_business_name: string;
  invoice_department: string;
  invoice_district: string;
  invoice_province: string;
  invoice_ruc: string;
  invoice_send: boolean;
  lyra?: boolean;
  method_send_id?: string;
  shopping_cart_id: string;
  type_payment: string;
  user_document_number: string;
  user_id?: string;
  user_mail: string;
  user_phone: string;
  ubigeo?: string;
  couponCode?: string;
  number_card?: string;
}

export interface ISendPayUMethod {
  order: {
    orderId: string;
  };
  payment: IPayUConfig;
}

export interface IPayUConfig {
  transaction: {
    creditCard?:
      | {
          card_id?: string;
          expirationDate?: string; //2022/05
          name?: string;
          number?: string;
          securityCode: string;
        }
      | string;
    deviceSessionId: string;
    extraParameters?: {
      INSTALLMENTS_NUMBER?: number;
    };
    ipAddress?: string;
    order: {
      additionalValues: {
        TX_VALUE: {
          currency: 'PEN' | 'USD';
          value: number;
        };
      };
      buyer: {
        contactPhone: string;
        dniNumber: string;
        emailAddress: string;
        fullName: string;
        merchantBuyerId?: string;
      };
      description: string;
      referenceCode?: string;
    };
    payer: {
      merchantPayerId?: string;
      fullName: string;
      emailAddress: string;
      contactPhone: string;
      dniNumber: string;
    };
    paymentMethod: string; //"VISA" | "MASTERCARD" | "AMEX" | "DINERS" | "VISA_DEBIT" | "MASTERCARD_DEBIT"
  };
}

export interface ICheckoutAd {
  imageURL: string;
  internal: boolean;
  link: string;
}

export interface IAdditionalProductItem {
  backgroundImage: string;
  normalPrice: number;
  productInfo: IProductCard;
  saleMessage: string;
  specialPrice: number;
  specialSalePrice: number;
}

export interface ICheckoutReloadUpdate {
  type: 'CART' | 'SUMMARY' | '';
}
