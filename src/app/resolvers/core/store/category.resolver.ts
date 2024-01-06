import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of, zip } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CampaignService } from 'src/app/services/campaign.service';
import { CategoryGroupService } from 'src/app/services/category-group.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { CategoriesData } from '../partner-benefits/category-group.resolver';
import { ICampaignData } from './category-group.resolver';

@Injectable({
  providedIn: 'root',
})
export class CategoryResolver implements Resolve<Observable<IStoreCategory>> {
  constructor(
    private categoryService: CategoryService,
    private categoryGroupService: CategoryGroupService,
    private campaignService: CampaignService,
    private router: Router,
    private productService: ProductService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<IStoreCategory> {
    const category = route.paramMap.get('category');
    const group = route.paramMap.get('group');
    const page = Number(route.queryParamMap.get('page')) || 1;
    const filter = JSON.parse(route.queryParamMap.get('filter')) || null;
    const sort = JSON.parse(route.queryParamMap.get('sort')) || null;
    if (!filter)
      return zip(
        this.categoryService.getCategoryBySlug(category, page, 12, sort).pipe(
          catchError((_) => {
            this.router.navigate(['/not-found']);
            return EMPTY;
          })
        ),
        this.categoryGroupService.getListCategoryOfGroup(group).pipe(
          catchError((_) => {
            return of(null);
          })
        ),
        this.campaignService.getAllCampaigns({ active: true, group }).pipe(
          catchError((_) => {
            return of(null);
          })
        )
      ).pipe(
        map(([categoryInfo, categoryGroupData, campaignsData]) => ({
          categoryInfo,
          categoryGroupData,
          campaignsData,
        }))
      );
    else
      return zip(
        this.categoryService.getCategoryBySlug(category, page, 12, sort).pipe(
          catchError((_) => {
            this.router.navigate(['/not-found']);
            return EMPTY;
          })
        ),
        this.categoryGroupService.getListCategoryOfGroup(group).pipe(
          catchError((_) => {
            return of(null);
          })
        ),
        this.campaignService.getAllCampaigns({ active: true, group }).pipe(
          catchError((_) => {
            return of(null);
          })
        ),
        this.productService.getProductByFilter(
          filter,
          page,
          12,
          sort
        ).pipe(
          catchError((_) => {
            return of(null);
          })
        ),
      ).pipe(
        map(([categoryInfo, categoryGroupData, campaignsData, filteredProducts]) => ({
          categoryInfo,
          categoryGroupData,
          campaignsData,
          filteredProducts
        }))
      );
  }
}

export interface IStoreCategory {
  categoryInfo: IStoreCategoryInfo;
  categoryGroupData: CategoriesData;
  campaignsData: ICampaignData;
  filteredProducts?: any
}

export interface IStoreCategoryInfo {
  entity: Entity;
  brands: Brands | undefined;
  subCategories: SubCategories;
  url_attachment: string;
  products: Products | undefined;
  filters: Array<any>;
}

export interface Entity {
  _id: string;
  active_stamp: boolean;
  visibility: boolean;
  nivel: number;
  active_discount: boolean;
  name: string;
  type: string;
  flow: Flow[];
  title: string;
  meta_description: string;
  friendly_url: string;
  group: Group;
  image_link: string;
  image_stamp: string;
  image_banner: string;
  image_link_mobile: string;
  image_banner_mobile: string;
  position: number;
  parent: string;
  filters: any[];
  type_discount: TypeDiscount;
  sort: string;
  discount_amount: number;
  rules_admin: string;
  tenant: string;
  code_ERP: string;
  have_products: boolean;
  images_banner_link: any;
  images_banner_link_app: any[];
  string_id: string;
  subcategories: any[];
}

export interface Flow {
  id_flow: string;
  name: string;
  position: number;
}
export interface IFoundCategory {
  _id: string;
  active_stamp: boolean;
  visibility: boolean;
  active_discount: boolean;
  name: string;
  friendly_url: string;
  group: Group;
  image_stamp: string;
  type_discount: TypeDiscount;
  discount_amount: null;
  category_discount_amount: null;
}
export interface Group {
  _id: string;
  active: boolean;
  deleted: boolean;
  name: string;
  typeGroupCategory: string;
  friendly_url: string;
  position: number;
  create_by: string;
  create_date: Date;
  __v: number;
  description: string;
  image_app: string;
  image_intro: string;
  image_web: string;
}

export interface TypeDiscount {
  _id: string;
  code: string;
  value: string;
  active: boolean;
  __v: number;
}

export interface Products {
  data: Datum[];
  quantityPage: number;
  totalItem: number;
  label: string;
  richlabel: string;
}

export interface Datum {
  _id: string;
  is_pack: boolean;
  stock: any;
  featured: boolean;
  last_unit: boolean;
  active_discount: boolean;
  name: string;
  price: number;
  special_price: number;
  SKU: string;
  friendly_url: string;
  title: string;
  image_cover: string;
  image_cover_mobile: string;
  image_logo_banner: string;
  currency: string;
  campaign: any;
  found_category?: IFoundCategory;
  campaign_price: any;
  brand: Brand;
  categories: any[];
  pack_products: any[];
  giftcard_available: boolean;
  show_special_offer: boolean;
  image_banner: string;
  show_discount: boolean;
  real_stock: any;
  discount: number;
  separation_out_stock: number;
  category_active_discount: boolean;
  category_discount_amount: number;
  text_price: string;
  image_stamp?: string;
}

export interface Brand {
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
  galery_videos: string[];
  image_logo_link_mobile: string;
  request: Request;
  request_history: any[];
  salient: any;
  update_by: string;
  update_date: Date;
  show_logo_representative: boolean;
}

export interface Request {
  approvals: any[];
  create_date: Date;
}

export interface SubCategories {
  data: any[];
  label: string;
  richlabel: string;
}

export interface Brands {
  data: Brand[];
  label: string;
  richlabel: string;
}

export interface Brand {
  _id: string;
  featured: boolean;
  name: string;
  friendly_url: string;
  image_link: string;
  image_logo_link: string;
  image_banner: string;
  image_logo_banner: string;
  image_link_mobile: string;
  create_date: Date;
  have_products: boolean;
  __v: number;
  image_logo_link_mobile: string;
  update_by: string;
  update_date: Date;
  show_logo_representative: boolean;
}
