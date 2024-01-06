import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(private api: ApiService) {}

  getFavorites(): Observable<IWishListInfo> {
    return this.api.getLogged(`/user/list-wishlist`);
  }

  addFavorite(productId: string) {
    return this.api.postLogged(`/user/add-product-wishlist`, {
      productId: productId,
    });
  }

  removeFavorite(productId: string) {
    return this.api.deleteLogged(`/user/remove-product-wishlist/${productId}`);
  }

  getTotalWishlist() {
    return this.api.getLogged(`/user/count-wishlist`);
  }
}

export interface IWishListInfo {
  wishlist: Wishlist[];
  _id: string;
  url_attachment: string;
}

export interface Wishlist {
  request: Request;
  is_pack: boolean;
  is_variation: boolean;
  has_dedication: boolean;
  stock: number;
  deleted: boolean;
  archive: boolean;
  active: boolean;
  is_product_variation_select: boolean;
  images_link: Array<string[]>;
  videos_link: any[];
  giftcard_available: boolean;
  categories: string[];
  shipping_allowed: boolean;
  shipping_methods: any[];
  featured: boolean;
  additional_variables: any[];
  show_special_offer: boolean;
  show_in_stock_out: boolean;
  last_unit: boolean;
  pending_request: boolean;
  list_method: string[];
  active_discount: boolean;
  related_products: any[];
  product_variation: any[];
  _id: string;
  old_categories_id: number;
  name: string;
  taxBuy: string;
  taxSent: string;
  price: number;
  special_price: number;
  SKU: string;
  friendly_url: string;
  title: string;
  meta_description: string;
  image_cover: string;
  image_cover_mobile: string;
  image_banner_mobile: string;
  image_logo_banner: string;
  image_logo_banner_mobile: string;
  code_ERP: string;
  create_date: Date;
  update_date: Date;
  old_brand: number;
  type: string;
  currency: string;
  supplier: string;
  supplier_delivery: string;
  group: string;
  model_product: string;
  old_id: number;
  tenant: string;
  __v: number;
  detail_list: DetailList[];
  brand: Brand;
  pack_products: any[];
  filter_values: any[];
  ranking: any[];
  request_history: any[];
  discount_amount: null;
  end_date_offer: null;
  image_banner: string;
  initial_date_offer: null;
  product_father: null;
  rules_admin: null;
  small_name: string;
  special_offer: null;
  type_discount: string;
  url_nm_travel: string;
  update_by: string;
  show_discount: boolean;
  variation_father: any[];
  variations: any[];
  countInWishlist?: number;
}

export interface Brand {
  request: Request;
  show_logo_representative: boolean;
  featured: boolean;
  salient: null;
  active: boolean;
  deleted: boolean;
  _id: string;
  name: string;
  friendly_url: string;
  description: string;
  image_link: string;
  image_logo_link: string;
  image_banner: string;
  image_logo_banner: string;
  image_link_mobile?: string;
  code_ERP: string;
  tenant: string;
  create_date: Date;
  old_id?: number;
  have_products: boolean;
  __v: number;
  galery_image: string[];
  image_logo_link_mobile: string;
  galery_videos: string[];
  request_history: any[];
  update_by?: string;
  update_date?: Date;
}

export interface Request {
  approvals: any[];
  create_date: Date;
}

export interface DetailList {
  title: string;
  description: string;
}
