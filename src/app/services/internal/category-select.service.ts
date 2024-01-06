import { Injectable } from '@angular/core';
import { ICategorySimple } from 'src/app/models/category-page.model';
import { CategoriesData } from 'src/app/resolvers/core/partner-benefits/category-group.resolver';
import { ICampaignData } from 'src/app/resolvers/core/store/category-group.resolver';

@Injectable({
  providedIn: 'root',
})
export class CategorySelectService {
  constructor() {}

  formatCategoryListToSelect(
    categoryList: CategoriesData,
    path: string
  ): Array<ICategorySimple> {
    let result: Array<ICategorySimple> = [];
    let item: ICategorySimple = null;
    categoryList?.data?.forEach((e) => {
      item = {
        name: e.name,
        link: path + e.friendly_url,
      };
      result.push(item);
    });
    return result;
  }

  formatCampaignListToSelect(
    campaignList: ICampaignData,
    path: string
  ): Array<ICategorySimple> {
    let result: Array<ICategorySimple> = [];
    let item: ICategorySimple = null;
    campaignList?.data?.forEach((e) => {
      item = {
        name: e?.name,
        link: path + e?.friendly_url,
      };
      result.push(item);
    });
    return result;
  }
}
