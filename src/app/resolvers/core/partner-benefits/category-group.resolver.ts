import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { CarouselService } from 'src/app/services/carousel.service';
import { CategoryGroupService } from 'src/app/services/category-group.service';
import { Injectable } from '@angular/core';
import { Observable, of, zip } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryGroupResolver
  implements Resolve<Observable<IPartnerBenefitsCategoryGroup>> {
  constructor(
    private carouselService: CarouselService,
    private categoryGroupService: CategoryGroupService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<IPartnerBenefitsCategoryGroup> {
    const isMobile = navigator.userAgent.match(
      /(iPhone|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini)/i
    );

    const prefix = isMobile ? 'banner_mobile_' : 'banner_';
    const group = route.paramMap.get('group');
    return zip(
      this.categoryGroupService
        .getListCategoryOfGroup(group)
        .pipe(catchError((_) => of(null))),
      this.carouselService
        .getCarouselData(prefix + group)
        .pipe(catchError((_) => of(null))),
      this.carouselService
        .getCarouselData('popup_' + group)
        .pipe(catchError(() => of(null)))
    ).pipe(
      map(([categoriesData, carouselData, popupData]) => {
        return {
          carouselData,
          categoriesData,
          popupData,
        };
      })
    );
  }
}

export interface IPartnerBenefitsCategoryGroup {
  categoriesData: CategoriesData;
  carouselData: CarouselData;
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

export interface CarouselData {
  transition_time: number;
  content: Content[];
}

export interface Content {
  redirect: string;
  redirectOption: string;
  redirect_mobile: string;
  text_info: string;
  title_mobile: string;
  transition_second: number;
  type: string;
  url_attachment: string;
  value: string;
  value_mobile: string;
}

export interface CategoriesData {
  categoryGroupName: string;
  data: CategoryDetail[];
  image_category: string;
  url_attachment: string;
}

export interface CategoryDetail {
  __v: number;
  _id: string;
  active: boolean;
  active_discount: boolean;
  active_stamp: boolean;
  brands: Brand[];
  childs: any[];
  code_ERP: null | string;
  create_date: Date;
  discount_amount: null;
  filters: any[];
  flow: Flow[];
  friendly_url: string;
  group: string;
  have_products: boolean;
  image_banner: string;
  image_banner_mobile: string;
  image_link: string;
  image_link_mobile: string;
  image_stamp: string;
  images_banner_link: any[];
  images_banner_link_app: any[];
  meta_description: string;
  name: string;
  nivel: number;
  old_id_category_service: number;
  parent: null;
  position: number;
  rules_admin: null;
  title: string;
  type: string;
  type_discount: string;
  url_attachment: string;
  visibility: boolean;
}

export interface Brand {
  _id: string;
  friendly_url: string;
  image_banner: string;
  image_banner_mobile: string;
  image_cover: string;
  image_cover_mobile: string;
  image_logo_banner: string;
  image_logo_banner_mobile: string;
  image_logo_cover: string;
  image_logo_cover_mobile: string;
  list_advantage: ListAdvantage[];
  name: string;
}

export interface ListAdvantage {
  _id: string;
  active: boolean;
  description: Description[];
  image_description: string;
  image_description_mobile?: string;
  image_thumbnail: string;
  image_thumbnail_mobile?: string;
  listPrice: ListPrice[];
  slug: string;
  title: string;
}

export interface Description {
  description: string;
  field: Field;
  title: Title;
}

export enum Field {
  Condiciones = 'condiciones',
  CreadaPor = 'creada_por',
  Descripcion = 'descripcion',
  Titulo = 'titulo',
}

export enum Title {
  Condiciones = 'Condiciones',
  CreadaPor = 'Creada por',
  Descripción = 'Descripción',
  Título = 'Título',
}

export interface ListPrice {
  _id: ID;
  active: boolean;
  adicional_text?: string;
  code: Code;
  currency?: string;
  price?: number | null;
  type_price?: string;
  value: Value;
}

export enum ID {
  The5D6Ed5700Cae5E19F0D491Eb = '5d6ed5700cae5e19f0d491eb',
  The5D6Ed5790Cae5E19F0D491Ec = '5d6ed5790cae5e19f0d491ec',
}

export enum Code {
  PriceType = 'PRICE-TYPE',
}

export enum Value {
  PrecioLuxury = 'Precio Luxury',
  PrecioNormal = 'Precio Normal',
}

export interface Flow {
  id_flow: string;
  name: string;
  position?: string;
}
