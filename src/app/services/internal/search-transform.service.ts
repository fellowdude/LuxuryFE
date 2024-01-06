import { Injectable } from '@angular/core';
import { ISearchFilters } from 'src/app/models/filter.model';
import { IProductCard } from 'src/app/models/product-card.model';
import { ISearchResult } from 'src/app/models/search-result.model';
import { ISearchResultsReceived } from 'src/app/resolvers/core/search/search.resolver';
import { IProductsSearchedData } from '../../resolvers/core/search/search.resolver';
import { ProductDiscountService } from './product-discount.service';
import { StampService } from './stamp.service';

@Injectable({
  providedIn: 'root',
})
export class SearchTransformService {
  constructor(private productDiscountService: ProductDiscountService, private stampService:StampService) {}
  transforSearchResults({ productsData, brandsData }: any): ISearchResult {
    // brands: productsData.list_brand.map((brand: any) => ({
    //   _id: brand._id,
    //   friendly_url: brand?.friendly_url,
    //   logo: brandsData?.url_attachment + brand?.image_logo_cover,
    //   imageUrl: brandsData?.url_attachment + brand?.image_cover,
    //   linkRedirect: `/beneficios/${brand?.group}/categoria/${brand?.categories?.friendly_url}/empresa/${brand?.friendly_url}`,
    // })),
    return {
      brands: productsData.list_brand.map((brand: any) => ({
          _id: brand._id,
          friendly_url: brand?.friendly_url,
          name:brand?.name,
          logo: brandsData?.url_attachment + brand?.image_logo_cover,
          imageUrl: brandsData?.url_attachment + brand?.image_cover,
          linkRedirect: `/beneficios/${brand?.group}/categoria/${brand?.categories?.friendly_url}/empresa/${brand?.friendly_url}`,
        })),
      totalPages: Math.ceil(productsData.total / 12), // TODO
      totalProductsFound: productsData.total,
      productsFound: this.transformProductsSearchResults(productsData)
        .productsFound,
    };
  }

  transformProductsSearchResults(
    productsData: IProductsSearchedData
  ): { productsFound: IProductCard[] } {
    return {
      productsFound: productsData.products.map((product) => {
        const priceWithCategoryDiscount =
          product?.special_price -
          (product?.categories?.find((category) => category?.active_discount)
            ?.discount_amount || 0);

        return {
          _id: product._id,
          productName: product?.name,
          brand: product?.brand?.name,
          productImage: productsData?.url_attachment + product?.image_cover,
          specialPrice: product?.special_price,
          normalPrice: product?.price,
          campaign: product?.campaign,
          image_stamp: this.stampService.getStamp(product,productsData?.url_attachment),
          active_stamp: product?.active_stamp,
          stock: product?.stock,
          link: product?.campaign
            ? `/tienda/${product?.campaign?.group?.friendly_url}/camp/${product?.campaign?.friendly_url}/marca/${product?.brand?.friendly_url}/producto/${product?.friendly_url}`
            : `/tienda/${product?.categories[0]?.group?.friendly_url}/categoria/${product?.categories[0]?.friendly_url}/marca/${product?.brand?.friendly_url}/producto/${product?.friendly_url}`,
          discount: this.productDiscountService.calcDiscount(
            product
          ),
          isCampaign: product?.campaign ? true : false,
          campaignPrice: product?.campaign_price,
          campaignName: product?.campaign?.discount_name,
          isGiftCard: product?.categories.some(
            (category) => category?.active_discount
          ),
          giftCardPrice: Math.abs(priceWithCategoryDiscount),
          giftCardName: 'Precio Scotiabank',
          sku: product?.SKU,
          categories: product?.categories.map((cat) =>{return {...cat, image_stamp: productsData?.url_attachment + cat?.image_stamp}}),
          isBase: product.type_variation === "B",
          
        };
      }),
    };
  }

  formatProductFilterSearchData(products: IProductCard[],searchBrands): ISearchFilters {
    
    let result: ISearchFilters = {
      brands: [],
      price: {
        ceil: 0,
        floor: 0,
      },
    };
    let max: number = 0;
    let min: number = 999999999999;
    let brands: Set<string> = new Set<string>();
    products?.forEach((el) => {
      brands.add(el.brand);
      if (el?.isCampaign) {
        if (el?.campaignPrice >= max) {
          max = el?.campaignPrice;
        }
        if (el?.campaignPrice <= min) {
          min = el?.campaignPrice;
        }
      } else {
        if (el?.isGiftCard) {
          if (el?.giftCardPrice >= max) {
            max = el?.giftCardPrice;
          }
          if (el?.giftCardPrice <= min) {
            min = el?.giftCardPrice;
          }
        } else {
          if (el?.specialPrice >= max) {
            max = el?.specialPrice;
          }
          if (el?.specialPrice <= min) {
            min = el?.specialPrice;
          }
        }
      }
    });
    searchBrands.forEach(brand => {
      result.brands.push({
        value: brand.name,
        active: false,
      });
    })
    // brands.forEach((el) => {
    //   result.brands.push({
    //     value: el,
    //     active: false,
    //   });
    // });
    result.price = {
      ceil: max,
      floor: min,
    };
    return result;
  }
}
