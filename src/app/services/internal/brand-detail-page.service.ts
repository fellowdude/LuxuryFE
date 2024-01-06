import { Injectable } from '@angular/core';
import { IBrandDetail } from 'src/app/models/brands.model';
import { ProductDiscountService } from './product-discount.service';
import { StampService } from './stamp.service';
import { StoreTransformService } from './store-transform.service';

@Injectable({
  providedIn: 'root',
})
export class BrandDetailPageService {
  constructor(private productDiscountService: ProductDiscountService, private storeTransformService: StoreTransformService, private stampService:StampService) {}

  transformBrandInfo(
    brand: any,
    path?: string,
    url_attachment?: string
  ): IBrandDetail {
    var brandInfo: IBrandDetail = {
      id: brand?._id,
      url_attachment: brand?.url_attachment || url_attachment,
      products: {
        quantityPage: brand?.products?.quantityPage,
        totalItem: brand?.products?.totalItem,
        data: [],
      },
      category: brand?.category?.friendly_url,
      categoryId: brand?.category?._id,
      ...brand?.entity,
    };
    brand?.products?.data?.forEach((el) => {
      brandInfo?.products?.data?.push({
        _id: el?._id,
        brand: el?.brand?.name,
        specialPrice: el?.special_price,
        normalPrice: el?.price,
        productImage:
          (brand?.url_attachment || url_attachment) + el?.image_cover,
        productName: el?.name,
        image_stamp: this.stampService.getStamp(el,(brand?.url_attachment || url_attachment)),
        active_stamp: el?.active_stamp,
        categories: el?.categories.map(cat => ({...cat, image_stamp: (brand?.url_attachment || url_attachment) + cat?.image_stamp})),
        stock: el?.stock,
        link: path + '/producto/' + el?.friendly_url,
        isCampaign: el?.campaign?.active || false,
        discount: this.productDiscountService.calcDiscount(el),
        campaignName: el?.campaign?.discount_name || '',
        campaignPrice: el?.campaign_price || 0,

        isGiftCard: el?.category_active_discount,
        giftCardPrice: Math.abs(el?.category_discount_amount),
        giftCardName: 'Precio Scotiabank',

        isBase: el?.type_variation === 'B'
      });
    });
    return brandInfo;
  }

  transformBrandInfoWithFilteredProducts(
    brand: any,
    filteredProducts?: any,
    path?: string,
    url_attachment?: string
  ): IBrandDetail {
    var brandInfo: IBrandDetail = {
      id: brand?._id,
      url_attachment: brand?.url_attachment || url_attachment,
      products: {
        quantityPage: filteredProducts?.products?.quantityPage,
        totalItem: filteredProducts?.products?.totalItem,
        data: this.storeTransformService.transformCategoryProduct(
          filteredProducts?.products?.data,
          brand?.url_attachment
        ),
      },
      category: brand?.category?.friendly_url,
      categoryId: brand?.category?._id,
      ...brand?.entity,
    };
    return brandInfo;
  }
}
