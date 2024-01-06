import { Injectable } from '@angular/core';
import { IFakeFilter, IFakeFilterList } from 'src/app/models/filter.model';
import { IPartnerBenefitsCategory } from 'src/app/resolvers/core/partner-benefits/category.resolver';
import { IStoreCampaign } from 'src/app/resolvers/core/store/campaign.resolver';
import { IStoreCategoryInfo } from 'src/app/resolvers/core/store/category.resolver';

@Injectable({
  providedIn: 'root'
})
export class FakeFilterListService {

  constructor() { }

  formatCampaignFakeFilterList(campaignData: IStoreCampaign, path?: string, currentBrand?: string): Array<IFakeFilterList>{
    let result: Array<IFakeFilterList> = [];
    let item: IFakeFilterList = null;
    if(campaignData?.brands?.data){
      item = {
        name: 'Marcas',
        filters: []
      }
      campaignData?.brands?.data?.forEach(e => {
        let subItem: IFakeFilter = {
          id: e?._id,
          name: e?.name,
          active: currentBrand === e?.friendly_url? true : false ,
          route: path + '/marca/' + e?.friendly_url,
        }
        item.filters.push(subItem);
      });
      result.push(item);
    }
    return result;
  }

  formatCategoryFakeFilterList(categoryData: IStoreCategoryInfo, path?: string, currentCateogry?: string, currentBrand?: string ): Array<IFakeFilterList>{
    let result: Array<IFakeFilterList> = [];
    let item: IFakeFilterList = null;
    let subPath = path.split('/').slice(0,4).join('/');
    if(categoryData?.subCategories?.data?.length > 0){
      item = {
        name: 'Subcategorías',
        filters: []
      }
      categoryData?.subCategories?.data?.forEach(e => {
        let subItem: IFakeFilter = {
          id: e?._id,
          name: e?.name,
          active: currentCateogry === e?.friendly_url? true : false ,
          route: subPath + '/' + e?.friendly_url,
        }
        item.filters.push(subItem);
      });
      result.push(item);
    }

    /* if(categoryData?.brands?.data?.length > 0){
      item = {
        name: 'Marcas',
        filters: []
      }
      categoryData?.brands?.data?.forEach(e => {
        let subItem: IFakeFilter = {
          id: e?._id,
          name: e?.name,
          active: currentBrand === e?.friendly_url? true : false ,
          route: path + '/marca/' + e?.friendly_url,
        }
        item.filters.push(subItem);
      });
      result.push(item);
    } */
    return result;
  }

  formatBrandFakeFilterList(categoryData: IStoreCategoryInfo, path?: string, currentCateogry?: string, currentBrand?: string ): Array<IFakeFilterList>{
    let result: Array<IFakeFilterList> = [];
    let item: IFakeFilterList = null;

    if(categoryData?.subCategories?.data?.length > 0){
      let subPath = path.split('/').slice(0,4).join('/');
      item = {
        name: 'Subcategorias',
        filters: []
      }
      categoryData?.subCategories?.data?.forEach(e => {
        let subItem: IFakeFilter = {
          id: e?._id,
          name: e?.name,
          active: currentCateogry === e?.friendly_url? true : false ,
          route: subPath + '/' + e?.friendly_url,
        }
        item.filters.push(subItem);
      });
      result.push(item);
    }

    /* if(categoryData?.brands?.data?.length > 0){
      let subPath = path.split('/').slice(0,5).join('/');
      item = {
        name: 'Marcas',
        filters: []
      }
      categoryData?.brands?.data?.forEach(e => {
        let subItem: IFakeFilter = {
          id: e?._id,
          name: e?.name,
          active: currentBrand === e?.friendly_url? true : false ,
          route: subPath + '/marca/' + e?.friendly_url,
        }
        item.filters.push(subItem);
      });
      result.push(item);
    } */
    return result;
  }

  formatBuisnessFakeFilterList(categoryData: IPartnerBenefitsCategory, path?: string, currentBrand?: string ): Array<IFakeFilterList>{
    let result: Array<IFakeFilterList> = [];
    let item: IFakeFilterList = null;
    if(categoryData?.brands?.data?.length > 0){
      let subPath = path.split('/').slice(0,5).join('/');
      item = {
        name: 'Marcas',
        filters: []
      }
      categoryData?.brands?.data?.forEach(e => {
        let subItem: IFakeFilter = {
          id: e?._id,
          name: e?.name,
          active: currentBrand === e?.friendly_url? true : false ,
          route: subPath + '/empresa/' + e?.friendly_url,
        }
        item.filters.push(subItem);
      });
      result.push(item);
    }
    console.log(result)
    return result;
  }
}
