import { Injectable } from '@angular/core';
import { ICampaignPage } from 'src/app/models/campaign.model';
import { ICategoryGroupPage } from 'src/app/models/category-group.model';
import { ICategoryPage } from 'src/app/models/category-page.model';
import { IFilterItem } from 'src/app/models/filter.model';
import { IProductCard } from 'src/app/models/product-card.model';
import {
  DataProduct,
  IStoreCampaign,
} from 'src/app/resolvers/core/store/campaign.resolver';
import { IStoreCategoryGroup } from 'src/app/resolvers/core/store/category-group.resolver';
import { IStoreCategoryInfo } from 'src/app/resolvers/core/store/category.resolver';
import { RedirectService } from '../redirect.service';
import { ProductDiscountService } from './product-discount.service';
import { StampService } from './stamp.service';

@Injectable({
  providedIn: 'root',
})
export class StoreTransformService {
  constructor(private productDiscountService: ProductDiscountService, private redirectService: RedirectService ,private stampService:StampService) { }

  transformCampaign(campaign: IStoreCampaign, pathLink: string): ICampaignPage {
    return {
      campaignName: campaign?.entity?.name,
      desktopBanner:
        campaign?.entity?.images_banner_link?.map((element) => ({
          link: campaign?.url_attachment + element.link,
          subtitle: element?.subtitle,
          title: element?.title,
          urlredirect: element?.urlredirect,
        })) || [],
      mobileBanner:
        campaign?.entity?.images_banner_link_app?.map((element) => ({
          link: campaign?.url_attachment + element?.link,
          subtitle: element?.subtitle,
          title: element?.title,
          urlredirect: element?.urlredirect,
        })) || [],
      brands:
        campaign?.brands?.data?.map((brand) => ({
          _id: brand?._id,
          friendly_url: brand?.friendly_url,
          linkRedirect: pathLink + '/marca/' + brand?.friendly_url,
          logo: campaign?.url_attachment + brand?.image_logo_link,
          imageUrl: campaign?.url_attachment + brand?.image_link,
        })) || [],
      campaignProducts: this.transformCampaignProducts(
        campaign?.products?.data,
        campaign?.url_attachment,
        pathLink
      ),
      totalPages: Math.ceil(campaign?.products?.totalItem / 12),
      totalProducts: campaign?.products?.totalItem,
      defaultDesktopBanner: `${campaign?.url_attachment}${campaign?.entity?.image_banner}`,
      defaultMobileBanner: `${campaign?.url_attachment}${campaign?.entity?.image_banner_mobile}`,
      url_attachment: campaign?.url_attachment,
      campaignId: campaign?.entity?._id,
      filters: this.transformCategoryFilters(campaign?.filters),
    };
  }

  transformCampaignWithFilteredProducts(campaign: IStoreCampaign, filteredProducts: any, filterUsed: any, pathLink: string): ICampaignPage {
    return {
      campaignName: campaign?.entity?.name,
      desktopBanner:
        campaign?.entity?.images_banner_link?.map((element) => ({
          link: campaign?.url_attachment + element.link,
          subtitle: element?.subtitle,
          title: element?.title,
          urlredirect: element?.urlredirect,
        })) || [],
      mobileBanner:
        campaign?.entity?.images_banner_link_app?.map((element) => ({
          link: campaign?.url_attachment + element?.link,
          subtitle: element?.subtitle,
          title: element?.title,
          urlredirect: element?.urlredirect,
        })) || [],
      brands:
        campaign?.brands?.data?.map((brand) => ({
          _id: brand?._id,
          friendly_url: brand?.friendly_url,
          linkRedirect: pathLink + '/marca/' + brand?.friendly_url,
          logo: campaign?.url_attachment + brand?.image_logo_link,
          imageUrl: campaign?.url_attachment + brand?.image_link,
        })) || [],
      campaignProducts: this.transformCategoryProduct(
        filteredProducts?.products?.data,
        campaign?.url_attachment
      ),
      totalPages: Math.ceil(campaign?.products?.totalItem / 12),
      totalProducts: campaign?.products?.totalItem,
      defaultDesktopBanner: `${campaign?.url_attachment}${campaign?.entity?.image_banner}`,
      defaultMobileBanner: `${campaign?.url_attachment}${campaign?.entity?.image_banner_mobile}`,
      url_attachment: campaign?.url_attachment,
      campaignId: campaign?.entity?._id,
      filters: this.transformCategoryFiltersFiltered(
        filteredProducts?.filters,
        filterUsed
      ),
    };
  }

  transformCampaignProducts(
    productList: DataProduct[],
    url_attachment: string,
    pathLink: string
  ): IProductCard[] {
    return (
      productList?.map((product) => ({
        _id: product?._id,
        productName: product?.name,
        brand: product?.brand?.name,
        productImage: url_attachment + product?.image_cover,
        image_stamp: this.stampService.getStamp(product, url_attachment),
        active_stamp: product?.active_stamp,
        categories: product?.categories?.map(cat => ({ ...cat, image_stamp: url_attachment + cat.image_stamp })),
        link:
          pathLink +
          '/marca/' +
          product?.brand?.friendly_url +
          '/producto/' +
          product?.friendly_url,
        stock: product?.stock,
        normalPrice: product?.price,
        specialPrice: product?.special_price,
        campaignPrice: product?.campaign_price,
        isCampaign: true,
        campaignName: product?.text_price,
        discount: this.productDiscountService.calcDiscount(product),
        isBase: product?.type_variation === 'B'
      })) || []
    );
  }

  transformCategoryGroup(
    categoryGroup: IStoreCategoryGroup
  ): ICategoryGroupPage {
    return {
      categories: [
        ...categoryGroup?.categoriesData?.data?.map((categoryData) => ({
          friendly_url: categoryData?.friendly_url,
          link: '',
          image_app:
            categoryData?.url_attachment + categoryData?.image_link_mobile,
          image_web: categoryData?.url_attachment + categoryData?.image_link,
          name: categoryData?.name,
          typeGroupCategory: {
            active: categoryData?.active_stamp,
            code: categoryData?.code_ERP,
            ref1: '',
            value: categoryData?.type,
            _id: categoryData?.group,
          },
          url_attachment: categoryData?.url_attachment,
          _id: categoryData?.url_attachment,
        })),
        ...categoryGroup?.campaignData?.data.map((campaing) => ({
          friendly_url: campaing?.friendly_url,
          link: '',
          image_app:
            campaing?.url_attachment + campaing?.image_thumbnail_mobile,
          image_web: campaing?.url_attachment + campaing?.image_thumbnail,
          name: campaing?.name,
          typeGroupCategory: {
            active: campaing?.active,
            code: '',
            ref1: '',
            value: '',
            _id: campaing?.group,
          },
          url_attachment: campaing?.url_attachment,
          _id: campaing?._id,
        })),
      ],
      bannerItems: categoryGroup?.carouselData?.content?.map(
        (carouselInfo) => ({
          redirectURL: this.redirectService.setRedirectURL(carouselInfo),
          imageURL: carouselInfo?.url_attachment + carouselInfo?.value,
          title: carouselInfo?.text_info,
        })
      ),
    };
  }

  transformStoreCategory(
    category: IStoreCategoryInfo,
    redirectBrandUrl: string
  ): ICategoryPage {
    return {
      categoryId: category?.entity?._id,
      categoryName: category?.entity?.name,
      desktopBanner:
        category?.entity?.images_banner_link.map((element: any) => ({
          link: category?.url_attachment + element?.link,
          subtitle: element?.subtitle,
          title: element?.title,
          urlredirect: element?.urlredirect,
        })) || [],
      mobileBanner:
        category?.entity?.images_banner_link_app.map((element) => ({
          link: category?.url_attachment + element?.link,
          subtitle: element?.subtitle,
          title: element?.title,
          urlredirect: element?.urlredirect,
        })) || [],
      subcategories: category.subCategories.data.map((subcategory) => ({
        text: subcategory?.name,
        imageDesktop: category?.url_attachment + subcategory?.image_link,
        imageMobile: category?.url_attachment + subcategory?.image_link_app,
        link: `/tienda/${category?.entity?.group?.friendly_url}/categoria/${subcategory?.friendly_url}`,
      })),
      brands:
        category?.brands?.data.map((brand) => ({
          _id: brand?._id,
          friendly_url: brand?.friendly_url,
          logo: category?.url_attachment + brand?.image_logo_link,
          imageUrl: category?.url_attachment + brand?.image_link,
          linkRedirect: redirectBrandUrl + brand?.friendly_url,
        })) || [],
      categoryProducts:
        this.transformCategoryProduct(
          category?.products?.data,
          category?.url_attachment
        ) || [],
      totalPages: category?.products ? category?.products?.quantityPage : 0,
      totalProducts: category?.products ? category?.products?.totalItem : 0,
      filters: this.transformCategoryFilters(category?.filters),
      url_attachment: category?.url_attachment,
      defaultDesktopBanner: `${category?.url_attachment}/${category?.entity?.image_banner}`,
      defaultMobileBanner: `${category?.url_attachment}/${category?.entity?.image_banner_mobile}`,
      isSubcategory: category?.entity?.parent ? true : false,
    };
  }

  transformCategoryProduct(
    rawProduct: Array<any>,
    url_attachment: string
  ): Array<IProductCard> {
    console.log(rawProduct);
    return rawProduct?.map((product) => ({
      _id: product?._id,
      productName: product?.name,
      brand: product?.brand?.name,
      productImage: url_attachment + product?.image_cover,
      image_stamp: this.stampService.getStamp(product, url_attachment),
      active_stamp: product?.active_stamp,
      specialPrice: product?.special_price,
      normalPrice: product?.price,
      stock: product?.stock,
      link:
        'marca/' +
        product?.brand?.friendly_url +
        '/producto/' +
        product?.friendly_url,
      discount: this.productDiscountService.calcDiscountCategory(product),
      isCampaign:
        product?.campaign &&
        product?.campaign?.active,
      campaignPrice: product?.campaign_price,
      campaignName: product?.campaign?.discount_name,
      isGiftCard: product?.category_active_discount,
      giftCardPrice: Math.abs(product?.category_discount_amount),
      giftCardName: 'Precio Scotiabank',
      sku: product?.SKU,
      categories: product?.categories?.map(cat => ({ ...cat, image_stamp: url_attachment + cat.image_stamp })),
      isBase: product?.type_variation === 'B'
    }));
  }

  transformCategoryFilters(rawFilters: Array<any>): Array<IFilterItem> {
    let result: Array<IFilterItem> = [];
    let item: IFilterItem = null;
    rawFilters?.forEach((el) => {
      if (Object.keys(el).length > 2) {
        item = {
          _id: el?._id,
          active: el?.filter?.state,
          filter: {
            _id: el?.filter?._id,
            binded: el?.filter?.binded,
            bindedTo: el?.filter?.bindedTo || '',
            name: el?.filter?.name,
            type: el?.filter?.type,
            unit: el?.filter?.unit || null,
          },
          value: el?.values?.sort((a, b) =>
            a?.toString()?.localeCompare(b?.toString())
          ),
          contrast: null,
        };
        result.push(item);
      }
    });
    return result;
  }

  transformCategoryFiltersFiltered(
    rawFilters: Array<any>,
    usedFilters: Array<any>
  ): Array<IFilterItem> {
    let result: Array<IFilterItem> = [];
    let item: IFilterItem = null;
    rawFilters?.forEach((el) => {
      if (Object.keys(el).length > 0) {
        item = {
          _id: el?._id,
          active: el?.filter?.state,
          filter: {
            _id: el?.filter?._id,
            binded: el?.filter?.binded,
            bindedTo: el?.filter?.bindedTo || '',
            name: el?.filter?.name,
            type: el?.filter?.type,
            unit: usedFilters[el?.filter?.name]?.unit,
          },
          value: el?.values,
          contrast: null,
        };
        if (usedFilters[item?.filter?.name]?.used) {
          switch (item?.filter?.type) {
            case 'checkbox':
            case 'radio':
              /*item.contrast = usedFilters[item?.filter?.name]?.value
                ?.filter((e) => {
                  return item?.value?.includes(e?.name);
                })
                .map((e) => {
                  return e.toggle;
                });*/
              let tmp = [...item?.value];
              item.contrast = tmp.map(e => {
                let foundValue = usedFilters[item?.filter?.name]?.value?.find(el => el.name === e);
                if (foundValue && foundValue.toggle) {
                  return true
                } else {
                  return false
                }
              })
              break;
            case 'range':
              item.contrast = usedFilters[item?.filter?.name]?.value;
              break;
            case 'boolean':
              item.contrast = usedFilters[item?.filter?.name]?.value?.[0];
              break;
          }
        }
        result.push(item);
      }
    });
    return result;
  }

  transformStoreCategoryWithFilteredProducts(
    category: IStoreCategoryInfo,
    filteredProducts: any,
    filterUsed: any,
    redirectBrandUrl: string
  ): ICategoryPage {
    return {
      categoryId: category?.entity?._id,
      categoryName: category?.entity?.name,
      desktopBanner:
        category?.entity?.images_banner_link.map((element: any) => ({
          link: category?.url_attachment + element?.link,
          subtitle: element?.subtitle,
          title: element?.title,
          urlredirect: element?.urlredirect,
        })) || [],
      mobileBanner:
        category?.entity?.images_banner_link_app.map((element) => ({
          link: category?.url_attachment + element?.link,
          subtitle: element?.subtitle,
          title: element?.title,
          urlredirect: element?.urlredirect,
        })) || [],
      subcategories: category.subCategories.data.map((subcategory) => ({
        text: subcategory?.name,
        imageDesktop: category?.url_attachment + subcategory?.image_link,
        imageMobile: category?.url_attachment + subcategory?.image_link_app,
        link: `/tienda/${category?.entity?.group?.friendly_url}/categoria/${subcategory?.friendly_url}`,
      })),
      brands:
        category?.brands?.data.map((brand) => ({
          _id: brand?._id,
          friendly_url: brand?.friendly_url,
          logo: category?.url_attachment + brand?.image_logo_link,
          imageUrl: category?.url_attachment + brand?.image_link,
          linkRedirect: redirectBrandUrl + brand?.friendly_url,
        })) || [],
      categoryProducts:
        this.transformCategoryProduct(
          filteredProducts?.products?.data,
          category?.url_attachment
        ) || [],
      totalPages: filteredProducts?.products?.quantityPage || 0,
      totalProducts: filteredProducts?.products?.totalItem || 0,
      filters: this.transformCategoryFiltersFiltered(
        filteredProducts?.filters,
        filterUsed
      ),
      url_attachment: category?.url_attachment,
      defaultDesktopBanner: `${category?.url_attachment}/${category?.entity?.image_banner}`,
      defaultMobileBanner: `${category?.url_attachment}/${category?.entity?.image_banner_mobile}`,
      isSubcategory: category?.entity?.parent ? true : false,
    };
  }

}
