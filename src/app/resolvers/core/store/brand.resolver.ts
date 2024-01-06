import { BrandService } from 'src/app/services/brand.service';
import { CampaignService } from 'src/app/services/campaign.service';
import { CategoriesData } from '../partner-benefits/category-group.resolver';
import { CategoryGroupService } from 'src/app/services/category-group.service';
import { CategoryService } from 'src/app/services/category.service';
import { ICampaignData } from './category-group.resolver';
import { IStoreCategoryInfo } from './category.resolver';
import { Injectable } from '@angular/core';
import { Observable, of, zip } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, tap } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';

@Injectable({
  providedIn: 'root',
})
export class BrandResolver implements Resolve<Observable<IBrandPage>> {
  constructor(
    private brandService: BrandService,
    private campaignService: CampaignService,
    private categoryGroupService: CategoryGroupService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBrandPage> {
    const group = route.paramMap.get('group');
    const category = route.paramMap.get('category');
    const brand = route.paramMap.get('brand');
    const campaign = route.paramMap.get('campaign');

    const page = Number(route.queryParamMap.get('page')) || 1;
    const filter = JSON.parse(route.queryParamMap.get('filter')) || null;
    const sort = JSON.parse(route.queryParamMap.get('sort')) || null;

    if (!campaign){
      if(filter){
        return zip(
          this.brandService.getBrandBySlug(category, brand, page, 12, sort),
          this.categoryService.getCategoryBySlug(category),
          this.categoryGroupService.getListCategoryOfGroup(group),
          this.campaignService.getAllCampaigns({ active: true, group }),
          this.productService.getProductByFilter(filter, page, 12, sort)
        ).pipe(
          tap(([brandInfo]) => {
            if (!brandInfo.category) {
              this.toastr.warning('La página no existe', 'Advertencia', {
                timeOut: 3000,
                progressBar: true,
              });
              this.router.navigate(['/inicio']);
              return;
            }
          }),
          map(([brandInfo, categoryInfo, categoryGroupData, campaignsData, filteredProducts]) => ({
            brandInfo,
            campaignsData,
            categoryGroupData,
            categoryInfo,
            filteredProducts
          }))
        );
      }
      return zip(
        this.brandService.getBrandBySlug(category, brand, page, 12, sort),
        this.categoryService.getCategoryBySlug(category),
        this.categoryGroupService.getListCategoryOfGroup(group),
        this.campaignService.getAllCampaigns({ active: true, group })
      ).pipe(
        tap(([brandInfo]) => {
          if (!brandInfo.category) {
            this.toastr.warning('La página no existe', 'Advertencia', {
              timeOut: 3000,
              progressBar: true,
            });
            this.router.navigate(['/inicio']);
            return;
          }
        }),
        map(([brandInfo, categoryInfo, categoryGroupData, campaignsData]) => ({
          brandInfo,
          campaignsData,
          categoryGroupData,
          categoryInfo,
        }))
      );
    }else{
      if(filter){
        return zip(
          this.brandService.getCampaignProductsByBrand(campaign, brand, page, 12, sort),
          this.categoryGroupService.getListCategoryOfGroup(group),
          this.campaignService.getAllCampaigns({ active: true, group }),
          this.productService.getCampaginProductByFilter(filter, page, 12, sort).pipe(
            catchError((_) => {
              return of(null);
            })
          )
        ).pipe(
          map(([brandInfo, categoryGroupData, campaignsData, filteredProducts]) => ({
            brandInfo,
            campaignsData,
            categoryGroupData,
            filteredProducts
          }))
        );
      }
      return zip(
        this.brandService.getCampaignProductsByBrand(campaign, brand, page, 12, sort),
        this.categoryGroupService.getListCategoryOfGroup(group),
        this.campaignService.getAllCampaigns({ active: true, group })
      ).pipe(
        map(([brandInfo, categoryGroupData, campaignsData]) => ({
          brandInfo,
          campaignsData,
          categoryGroupData,
        }))
      );
    }
  }
}

export interface IBrandPage {
  brandInfo: any;
  campaignsData: ICampaignData;
  categoryGroupData: CategoriesData;
  categoryInfo?: IStoreCategoryInfo;
  filteredProducts?: any;
}
