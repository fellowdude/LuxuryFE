import { CategoriesData } from './category-group.resolver';
import { CategoryGroupService } from 'src/app/services/category-group.service';
import { CategoryService } from 'src/app/services/category.service';
import { EMPTY, Observable, of, zip } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryResolver implements Resolve<IPartnerBenefitsCategoryPage> {
  constructor(
    private categoryService: CategoryService,
    private categoryGroupService: CategoryGroupService,
    private router: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<IPartnerBenefitsCategoryPage> {
    const category = route.paramMap.get('category');
    const group = route.paramMap.get('group');
    const page = Number(route.queryParamMap.get('page')) || 1;
    return zip(
      this.categoryGroupService
        .getListCategoryOfGroup(group)
        .pipe(catchError((_) => of(null))),
      this.categoryService.getCategoryBySlug(category, page, 8).pipe(
        catchError((_) => {
          this.router.navigate(['/not-found']);
          return EMPTY;
        })
      )
    ).pipe(
      map(([categoriesData, categoryInfo]) => {
        return {
          categoriesData,
          categoryInfo,
        };
      })
    );
  }
}

export interface IPartnerBenefitsCategoryPage {
  categoriesData: CategoriesData;
  categoryInfo: IPartnerBenefitsCategory;
}

export interface IPartnerBenefitsCategory {
  entity: Entity;
  brands: Experiences;
  subCategories: SubCategories;
  benefits: any;
  url_attachment: string;
}

export interface Entity {
  _id: string;
  active_discount: boolean;
  active_stamp: boolean;
  code_ERP: any;
  discount_amount: any;
  filters: Filter[];
  flow: Flow[];
  friendly_url: string;
  group: Group;
  have_products: boolean;
  image_banner: string;
  image_banner_mobile: string;
  image_link: string;
  image_link_mobile: string;
  image_stamp: string;
  images_banner_link: any;
  images_banner_link_app: any[];
  meta_description: string;
  name: string;
  nivel: number;
  parent: any;
  position: number;
  rules_admin: any;
  string_id: string;
  subcategories: any[];
  tenant: string;
  title: string;
  type: string;
  type_discount: TypeDiscount;
  visibility: boolean;
}

export interface Filter {}

export interface Flow {
  id_flow: string;
  name: string;
  position: string;
}

export interface Group {
  __v: number;
  _id: string;
  active: boolean;
  create_by: string;
  create_date: Date;
  deleted: boolean;
  description: string;
  friendly_url: string;
  image_app: string;
  image_intro: string;
  image_web: string;
  name: string;
  position: number;
  typeGroupCategory: string;
}

export interface TypeDiscount {
  __v: number;
  _id: string;
  active: boolean;
  code: string;
  value: string;
}

export interface Experiences {
  data: Datum[];
  label: string;
  quantityPage: number;
  richlabel: string;
  totalItem: number;
}

export interface Datum {
  __v: number;
  _id: string;
  active: boolean;
  create_date: Date;
  deleted: boolean;
  email_contact: any;
  friendly_url: string;
  galery_videos: string;
  group_email: string;
  image_banner: string;
  image_banner_mobile: string;
  image_cover: string;
  image_cover_mobile: string;
  image_logo_banner: string;
  image_logo_banner_mobile: string;
  image_logo_cover: string;
  image_logo_cover_mobile: string;
  meta_description: string;
  name: string;
  title: string;
}

export interface SubCategories {
  data: any[];
  label: string;
  richlabel: string;
}
