import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SearchResolver
  implements Resolve<Observable<ISearchResultsReceived>> {
  constructor(private searchService: SearchService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<ISearchResultsReceived> {
    console.log('ejecutandose')
    const searchValue = route.paramMap
      .get('searchValue')
      ?.trimStart()
      .trimEnd();

    return zip(
      this.searchService.getProductsResults(searchValue),
      this.searchService.getBrandsResults(searchValue)
    ).pipe(
      map(([productsData, brandsData]) => ({
        brandsData,
        productsData,
      }))
    );
  }
}

export interface ISearchResultsReceived {
  brandsData: any;
  productsData: IProductsSearchedData;
}

export interface IProductsSearchedData {
  products: Product[];
  total: number;
  url_attachment: string;
}

export interface Product {
  SKU: string;
  _id: string;
  active: boolean;
  archive: boolean;
  brand: Brand;
  campaign: Campaign;
  campaign_price: number;
  categories: Category[];
  currency: Currency;
  discount: number;
  featured: boolean;
  friendly_url: string;
  image_cover: string;
  image_stamp: string;
  active_stamp: boolean;
  image_cover_mobile: string;
  image_logo_banner: string;
  image_logo_banner_mobile: string;
  is_pack: boolean;
  name: string;
  price: number;
  separation_out_stock: number;
  special_price: number;
  stock: number;
  type_variation?: string;
}

export interface Brand {
  _id: string;
  friendly_url: string;
  name: string;
}

export interface Campaign {
  __v: number;
  _id: string;
  active: boolean;
  deleted: boolean;
  delivery: boolean;
  discount_name: string;
  friendly_url: string;
  image_banner: string;
  image_banner_mobile: string;
  image_thumbnail: string;
  image_thumbnail_mobile: string;
  images_banner_link_app: any[];
  name: string;
  position: number;
  tenant: string;
  group: Group;
}

export interface Category {
  _id: string;
  friendly_url: string;
  group: Group;
  name: string;
  visibility: boolean;
  active_discount?: number;
  discount_amount?: number;
  image_stamp?: string;
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

export interface Currency {
  __v: number;
  _id: string;
  active: boolean;
  code: string;
  ref1: string;
  ref2: string;
  value: string;
}
