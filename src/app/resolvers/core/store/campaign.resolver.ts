import { CampaignService } from 'src/app/services/campaign.service';
import { CategoriesData } from '../partner-benefits/category-group.resolver';
import { CategoryGroupService } from 'src/app/services/category-group.service';
import { ICampaignData } from './category-group.resolver';
import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, tap } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';

@Injectable({
  providedIn: 'root',
})
export class CampaignResolver
  implements Resolve<Observable<IStoreCampaignPage>> {
  constructor(
    private campaignService: CampaignService,
    private categoryGroupService: CategoryGroupService,
    private router: Router,
    private toastr: ToastrService,
    private productService: ProductService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStoreCampaignPage> {
    const campaign = route.paramMap.get('campaign'),
      group = route.paramMap.get('group');

    const page = Number(route.queryParamMap.get('page')) || 1;
    const filter = JSON.parse(route.queryParamMap.get('filter')) || null;
    const sort = JSON.parse(route.queryParamMap.get('sort')) || null;

    if(filter)
      return zip(
        this.campaignService.getCampaignBySlug(campaign),
        this.categoryGroupService.getListCategoryOfGroup(group),
        this.campaignService.getAllCampaigns({ active: true, group }),
        this.productService.getCampaginProductByFilter(filter, page, 12, sort)
      ).pipe(
        tap(([campaignData]) => {
          if (campaignData.status === 500) {
            this.toastr.warning(
              'La campaña no se encuentra disponible',
              'Advertencia',
              {
                timeOut: 3000,
                progressBar: true,
              }
            );
            this.router.navigate(['/inicio']);
          }
        }),
        map(([campaignData, categoryList, campaignList, filteredProducts]) => {
          return {
            campaignData,
            campaignList,
            categoryList,
            filteredProducts
          };
        })
      );
    return zip(
      this.campaignService.getCampaignBySlug(campaign, page, 12, sort),
      this.categoryGroupService.getListCategoryOfGroup(group),
      this.campaignService.getAllCampaigns({ active: true, group })
    ).pipe(
      tap(([campaignData]) => {
        if (campaignData.status === 500) {
          this.toastr.warning(
            'La campaña no se encuentra disponible',
            'Advertencia',
            {
              timeOut: 3000,
              progressBar: true,
            }
          );
          this.router.navigate(['/inicio']);
        }
      }),
      map(([campaignData, categoryList, campaignList]) => {
        return {
          campaignData,
          campaignList,
          categoryList,
        };
      })
    );
  }
}

export interface IStoreCampaignPage {
  campaignData: IStoreCampaign;
  campaignList: ICampaignData;
  categoryList: CategoriesData;
  filteredProducts?: any;
}

export interface IStoreCampaign {
  brands: Brands;
  entity: Entity;
  products: Products;
  filters: Array<any>;
  url_attachment: string;
}

export interface Brands {
  data: DataBrand[];
  label: string;
  richlabel: string;
}

export interface Products {
  data: DataProduct[];
  label: string;
  quantityPage: number;
  richlabel: string;
  totalItem: number;
}

export interface DataProduct {
  _id: string;
  brand: DataBrand;
  campaign_price: number;
  friendly_url: string;
  image_cover: string;
  image_stamp: string,
  active_stamp: boolean,
  categories: any,
  name: string;
  price: number;
  special_price: number;
  stock: number;
  text_price: string;
  type_variation?: string;
}

export interface DataBrand {
  __v: number;
  _id: string;
  create_date: Date;
  featured: boolean;
  friendly_url: string;
  have_products: boolean;
  image_banner: string;
  image_link: string;
  image_link_mobile: string;
  image_logo_banner: string;
  image_logo_link: string;
  image_logo_link_mobile: string;
  name: string;
  show_logo_representative: boolean;
  update_by: string;
  update_date: Date;
}

export interface Entity {
  __v: number;
  _id: string;
  active: boolean;
  active_stamp: boolean;
  create_date: Date;
  created_by: string;
  deleted: boolean;
  delivery: boolean;
  discount_name: string;
  flow: Flow[];
  friendly_url: string;
  group: Group;
  image_banner: string;
  image_banner_mobile: string;
  image_button: string;
  image_stamp: string;
  image_thumbnail: string;
  image_thumbnail_mobile: string;
  images_banner_link: ImagesBannerLink[];
  images_banner_link_app: any[];
  name: string;
  position: number;
  rules_admin: string;
  tenant: string;
  sort: string;
}

export interface Flow {
  id_flow: string;
  name: string;
  position: number;
}

export interface Group {
  _id: string;
  active: boolean;
}

export interface ImagesBannerLink {
  link: string;
  subtitle: string;
  title: string;
  urlredirect: string;
}
