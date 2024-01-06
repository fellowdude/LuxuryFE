import { ITextTypeVariation } from '../core/store/product-detail/text-type-variation/text-type-variation.component';
import { ISupplierInfo } from './supplier-order.model';

export interface IProductColor {
  colorHex: string;
  colorName: string;
  active: boolean;
}

export interface IStockColorSize {
  color: string;
  size: string;
  stock: number;
}

export interface IStockColor {
  color: string;
  stock: number;
}

export interface IStockSize {
  size: string;
  stock: number;
}

export interface IProductItem {
  _id?: string;
  brand: any;
  friendly_url?: string;
  image_cover: string;
  name: string;
  price: number;
  special_price: number;
  stock?: number;
}

export interface IProductDetail {
  brand: any;
  currency?: string;
  friendly_url: string;
  image_cover: string;
  list_method?: Array<any>;
  name: string;
  price: number;
  special_price: number;
  stock: number;
  supplier_delivery?: ISupplierInfo;
  SKU?: string;
  campaign?: any;
  categories?: Array<any>;
}

export type ProductItemType = 'simple' | 'star' | 'discount' | 'scotia';

export interface ISort {
  filter: string;
  value: number;
}

export interface IProductSpecs {
  description: string;
  isOpen?: boolean;
  title: string;
}

export interface IProductDetailPage extends IProductItem {
  campaignName?: string;
  campaignPrice?: number;
  category?: string;
  category_friendly_url?: string;
  brand_friendly_url?: string;
  colors?: IProductColor[];
  detail_list: IProductSpecs[];
  deliveryInformation: {
    deliveryBody: string;
    deliveryTitle: string;
  };
  discount?: number;
  extraImages: string[];
  favorited?: boolean;
  giftCardName?: string;
  giftCardPrice?: number;
  isCampaign?: boolean;
  isGiftCard?: boolean;
  imagesVariation?: any[];
  sizes?: ITextTypeVariation[];
  stockPerColor?: IStockColor[];
  stockPerColorAndSize?: IStockColorSize[];
  stockPerSize?: IStockSize[];
  supplier: string;
  type_variation?: string | null;
  url_attachment?: string;
  userRating?: number | null;
  variation_father?:
    | {
        _id: string;
        type: string;
        variation_name: string;
        value: {
          _id: string;
          value: string;
          description: string;
        }[];
      }[]
    | null;
  variations?: any[] | null;
  SKU?: string;
  discountRaw?: number;
}

export interface IProductUpdate {
  type: 'UPDATE' | '';
}
