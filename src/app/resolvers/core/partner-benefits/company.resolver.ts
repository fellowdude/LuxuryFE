import { CategoriesData } from './category-group.resolver';
import { CategoryGroupService } from 'src/app/services/category-group.service';
import { CompanyService } from 'src/app/services/company.service';
import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CompanyResolver implements Resolve<IPartnerBenefitsCompanyPage> {
  constructor(
    private companyService: CompanyService,
    private categoryGroupService: CategoryGroupService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<IPartnerBenefitsCompanyPage> {
    const company = route.paramMap.get('company');
    const group = route.paramMap.get('group');

    return zip(
      this.categoryGroupService.getListCategoryOfGroup(group),
      this.companyService.getCompany(company)
    ).pipe(
      map(([categoriesData, companyInfo]) => {
        return {
          categoriesData,
          companyInfo,
        };
      })
    );
  }
}

export interface IPartnerBenefitsCompanyPage {
  categoriesData: CategoriesData;
  companyInfo: IPartnerBenefitsCompany;
}
export interface IPartnerBenefitsCompany {
  __v: number;
  _id: string;
  active: boolean;
  categories: Category[];
  create_date: Date;
  deleted: boolean;
  detail_list: DetailList[];
  email_contact: any;
  friendly_url: string;
  galery_videos: string;
  group: string;
  group_email: string;
  image_banner: string;
  image_banner_mobile: string;
  image_cover: string;
  image_cover_mobile: string;
  image_logo_banner: string;
  image_logo_banner_mobile: string;
  image_logo_cover: string;
  image_logo_cover_mobile: string;
  images_link: Array<string[]>;
  list_action_email_form: ListActionEmailForm[];
  list_address: ListAddress[];
  list_advantage: ListAdvantage[];
  list_main_action_email_form: ListActionEmailForm[];
  meta_description: string;
  name: string;
  old_category: number;
  old_id: number;
  phone: string;
  schedule: string;
  title: string;
  url_attachment: string;
  videos_link: any[];
}

export interface Category {
  _id: string;
  friendly_url: string;
  name: string;
}

export interface DetailList {
  description: string;
  field: string;
  title: string;
}

export interface ListActionEmailForm {
  _id: string;
  button_name: string;
  type_button: string;
}

export interface ListAddress {
  address: string;
  lat: number;
  lng: number;
}

export interface ListAdvantage {
  _id: string;
  active: boolean;
  description: DetailList[];
  image_description: string;
  image_description_mobile: string;
  image_thumbnail: string;
  image_thumbnail_mobile: string;
  listPrice: ListPrice[];
  slug: string;
  title: string;
}

export interface ListPrice {
  _id: string;
  active: boolean;
  code: string;
  currency: any;
  value: string;
}
