import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of, zip } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CampaignService } from 'src/app/services/campaign.service';
import { CarouselService } from 'src/app/services/carousel.service';
import { CategoryGroupService } from 'src/app/services/category-group.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryGroupResolver
  implements Resolve<Observable<IStoreCategoryGroup>> {
  constructor(
    private categoryGroupService: CategoryGroupService,
    private campaignService: CampaignService,
    private carouselService: CarouselService,
    private router: Router
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<IStoreCategoryGroup> {
    const isMobile = navigator.userAgent.match(
      /(iPhone|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini)/i
    );

    const prefix = isMobile ? 'banner_mobile_' : 'banner_';
    const group = route.paramMap.get('group');

    return zip(
      this.categoryGroupService.getListCategoryOfGroup(group),
      this.carouselService
        .getCarouselData(prefix + group)
        .pipe(catchError((_) => of(null))),
      this.campaignService
        .getAllCampaigns({ active: true, group })
        .pipe(catchError((_) => of(null))),
      this.carouselService
        .getCarouselData('popup_' + group)
        .pipe(catchError((_) => of(null)))
    ).pipe(
      map(([categoriesData, carouselData, campaignData, popupData]) => {
        return {
          categoriesData,
          carouselData,
          campaignData,
          popupData,
        };
      })
    );
  }
}

export interface IStoreCategoryGroup {
  categoriesData: ICategoriesData;
  carouselData: ICarouselData;
  campaignData: ICampaignData;
  popupData: IPopupData;
}

export interface IPopupData {
  transition_time: number;
  content: PopupContent[];
}

export interface PopupContent {
  type: string;
  value: string;
  transition_second: number;
  button_label: null;
  redirect: string;
  text_info: string;
  subtitle: string;
  list_detail: ListDetail[];
  redirectOption: string;
  url_attachment: string;
}

export interface ListDetail {
  description: string;
}

export interface ICategoriesData {
  url_attachment: string;
  image_category: string;
  categoryGroupName: string;
  data: CategoryData[];
}

export interface CategoryData {
  _id: string;
  images_banner_link: ImagesBannerLink[];
  images_banner_link_app: any[];
  active_stamp: boolean;
  have_products: boolean;
  visibility: boolean;
  nivel: number;
  active_discount: boolean;
  name: string;
  type: string;
  flow: Flow[];
  title: string;
  meta_description: string;
  friendly_url: string;
  group: string;
  image_link: string;
  image_stamp: string;
  image_banner: string;
  image_link_mobile: string;
  image_banner_mobile: string;
  position: number;
  parent: null;
  filters: any[];
  type_discount: string;
  discount_amount: null;
  rules_admin: null;
  code_ERP: string;
  create_date: Date;
  __v: number;
  brands: CategoryBrand[];
  url_attachment: string;
  childs: any[];
}

export interface CategoryBrand {
  _id: string;
  featured: boolean;
  active: boolean;
  deleted: boolean;
  name: string;
  friendly_url: string;
  description: string;
  image_link: string;
  image_logo_link: string;
  image_banner: string;
  image_logo_banner: string;
  image_link_mobile: string;
  code_ERP: string;
  tenant: string;
  create_date: Date;
  old_id: number;
  have_products: boolean;
  __v: number;
  galery_image: string[];
  galery_videos: any[];
  image_logo_link_mobile: string;
  request: Request;
  request_history: any[];
  salient: boolean;
  update_by: string;
  update_date: Date;
  show_logo_representative: boolean;
}

export interface Request {
  approvals: any[];
  create_date: Date;
}

export interface Flow {
  id_flow: IDFlow;
  name: Name;
  position: number;
}

export enum IDFlow {
  The5D322B5D8C2Efa2C0Deaec27 = '5d322b5d8c2efa2c0deaec27',
  The5D322B948C2Efa2C0Deaec7E = '5d322b948c2efa2c0deaec7e',
}

export enum Name {
  Marca = 'Marca',
  Producto = 'Producto',
}

export interface ImagesBannerLink {
  link: string;
  urlredirect: string;
  title: string;
  subtitle: string;
}

export interface ICarouselData {
  transition_time: number;
  content: Content[];
}

export interface Content {
  type: string;
  value: string;
  transition_second: number;
  button_label: null;
  redirect: null | string;
  text_info: null | string;
  subtitle: null | string;
  list_detail: ListDetail[];
  redirect_mobile?: null | string;
  value_mobile?: null | string;
  title_mobile?: null | string;
  category_mobile?: null | string;
  redirectOption?: string;
  url_attachment: string;
}

export interface ListDetail {
  description: string;
}

export interface ICampaignData {
  totalItem: number;
  url_attachment: string;
  data: CampaignDatum[];
  quantityPage: null;
}

export interface CampaignDatum {
  _id: string;
  active: boolean;
  deleted: boolean;
  delivery: boolean;
  active_stamp: boolean;
  images_banner_link: ImagesBannerLink[];
  images_banner_link_app: ImagesBannerLink[];
  name: string;
  image_stamp: string;
  discount_name: string;
  friendly_url: string;
  products: Product[];
  rules_admin: RulesAdmin;
  flow: Flow[];
  group: string;
  image_thumbnail: string;
  image_thumbnail_mobile: string;
  image_button: string;
  image_banner: string;
  image_banner_mobile: string;
  tenant: string;
  created_by: string;
  position: number;
  create_date: Date;
  __v: number;
  brands: any[];
  url_attachment: string;
}

export interface ImagesBannerLink {
  link: string;
  urlredirect: string;
  title: string;
  subtitle: string;
}

export interface Product {
  exclusive: boolean;
  _id: string;
  productId: ProductID;
  price: number;
  stock: number;
  sold: number;
}

export interface ProductID {
  _id: string;
  is_pack: boolean;
  stock: number;
  deleted: boolean;
  archive: boolean;
  active: boolean;
  old_categories_id: number;
  shipping_allowed: boolean;
  featured: boolean;
  last_unit: boolean;
  active_discount: boolean;
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
  images_link: Array<string[]>;
  list_method: string[];
  detail_list: DetailList[];
  additional_variables: any[];
  brand: CampaignBrand;
  categories: string[];
  pack_products: PackProduct[];
  filter_values: any[];
  giftcard_available: boolean;
  has_dedication: boolean;
  is_variation: boolean;
  pending_request: boolean;
  product_variation: any[];
  ranking: any[];
  related_products: any[];
  request: Request;
  request_history: any[];
  shipping_methods: any[];
  show_in_stock_out: boolean;
  show_special_offer: boolean | null;
  videos_link: any[];
  discount_amount?: number | null;
  end_date_offer?: null;
  image_banner?: string;
  initial_date_offer?: null;
  product_father?: null;
  rules_admin?: null | string;
  small_name?: string;
  special_offer?: null;
  type_discount?: string;
  url_nm_travel?: string;
  update_by?: string;
  show_discount?: boolean;
  campaign: string;
  campaign_price: number;
  is_product_variation_select: boolean;
  variation_father: any[];
  variations: any[];
  description_discount?: string;
  father_base_variation?: string;
  image_background_discount?: string;
  type_variation?: null;
  countInWishlist?: number;
}

export interface CampaignBrand {
  _id: string;
  name: string;
  friendly_url: string;
}

export interface DetailList {
  title: string;
  description: string;
}

export interface PackProduct {
  _id: string;
  product: string;
  quantity: number;
  code_ERP: string;
}

export interface Rule {
  _id: string;
  operator: null | string;
  rddId: RulesAdmin;
}

export interface RulesAdmin {
  _id: string;
  name: string;
  rules?: Rule[];
  tenant: string;
  created_by: string;
  create_date: Date;
  __v: number;
  values?: Date[];
  tipo?: Tipo;
}

export interface Tipo {
  _id: string;
  code: string;
  value: string;
  active: boolean;
  __v: number;
}
