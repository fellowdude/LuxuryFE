import { Injectable } from '@angular/core';
import { IProductCard } from 'src/app/models/product-card.model';

@Injectable({
  providedIn: 'root',
})
export class ProductDiscountService {
  constructor() {}

  calcDiscount(prod: any): number {
    if (prod?.show_discount) {
      /* if (prod?.campaign && prod?.campaign?.active) {
        return Math.round(100 - (prod?.campaign_price / prod?.price) * 100);
      } else {
        let categoryDiscount = prod?.categories?.find((e) => {
          return e.active_discount;
        });
        if (categoryDiscount) {
          return Math.round(
            100 -
              ((prod?.special_price -
                (categoryDiscount.discount_amount || 50)) /
                prod?.price) *
                100
          );
        } else {
          return Math.round(100 - (prod?.special_price / prod?.price) * 100);
        }
      } */
      return prod?.discount;
    } else {
      /* let discount = 0;
      if (prod?.campaign && prod?.campaign?.active) {
        discount = Math.round(100 - (prod?.campaign_price / prod?.price) * 100);
      } else {
        let categoryDiscount = prod?.categories?.find((e) => {
          return e.active_discount;
        });
        if (categoryDiscount) {
          discount = Math.round(
            100 -
              ((prod?.special_price -
                (categoryDiscount.discount_amount || 50)) /
                prod?.price) *
                100
          );
        } else {
          discount = Math.round(
            100 - (prod?.special_price / prod?.price) * 100
          );
        }
      }
      return discount > 25 ? discount : 0; */
      return prod?.discount >= 24.5 ? prod?.discount : 0;
    }
  }

  calcDiscountProductDetail(prod: any): number {
    if (prod?.price <= 0) return 0;
    if (prod?.show_discount) {
      /* if (prod?.campaign && prod?.campaign?.active) {
        return Math.round(100 - (prod?.campaign_price / prod?.price) * 100);
      } else {
        let categoryDiscount = prod?.categories?.find((e) => {
          return e.active_discount;
        });
        if (categoryDiscount) {
          if(categoryDiscount.type_discount?.value === '%'){
            return Math.round(
              100 -
                ((prod?.special_price - (1 - categoryDiscount?.discount_amount/100)) /
                  prod?.price) *
                  100
            );
          }else{
            return Math.round(
              100 -
                ((prod?.special_price - categoryDiscount?.discount_amount) /
                  prod?.price) *
                  100
            );
          }
        } else {
          return Math.round(100 - (prod?.special_price / prod?.price) * 100);
        }
      } */
      return prod?.discount;
    } else {
      /* let discount = 0;
      if (prod?.campaign && prod?.campaign?.active) {
        discount = Math.round(100 - (prod?.campaign_price / prod?.price) * 100);
      } else {
        let categoryDiscount = prod?.categories?.find((e) => {
          return e.active_discount;
        });
        if (categoryDiscount) {
          if(categoryDiscount.type_discount?.value === '%'){
            discount = Math.round(
              100 -
                ((prod?.special_price - (1 - categoryDiscount?.discount_amount/100)) /
                  prod?.price) *
                  100
            );
          }else{
            discount = Math.round(
              100 -
                ((prod?.special_price - categoryDiscount?.discount_amount) /
                  prod?.price) *
                  100
            );
          }

        } else {
          discount = Math.round(
            100 - (prod?.special_price / prod?.price) * 100
          );
        }
      }
      return discount > 25 ? discount : 0; */
      return prod?.discount >= 24.5 ? prod?.discount : 0;
    }
  }

  calcDiscountCategory(prod: any): number {
    if (prod?.price <= 0) return 0;
    if (prod?.show_discount) {
      /* if (
        prod?.campaign &&
        prod?.campaign?.active
      ) {
        return Math.round(100 - (prod?.campaign_price / prod?.price) * 100);
      } else {
        if (prod?.category_discount_amount) {
          return Math.round(
            100 - (prod?.category_discount_amount / prod?.price) * 100
          );
        } else {
          return Math.round(100 - (prod?.special_price / prod?.price) * 100);
        }
      } */
      return prod?.discount || 0;
    } else {
      /* let discount = 0;
      if (
        prod?.campaign &&
        prod?.campaign?.active
      ) {
        discount = Math.round(100 - (prod?.campaign_price / prod?.price) * 100);
      } else {
        if (prod?.category_discount_amount) {
          discount = Math.round(
            100 - (prod?.category_discount_amount / prod?.price) * 100
          );
        } else {
          discount = Math.round(
            100 - (prod?.special_price / prod?.price) * 100
          );
        }
      }
      return discount > 25 ? discount : 0; */
      return prod?.discount >= 24.5 ? prod?.discount : 0;
    }
  }

  calcDiscountFromRawData(prod: any): number {
    if(prod?.price < 0) return 0;
    let discount = 0;
    let categoryDiscount = prod?.categories?.find((e) => {
      return e.active_discount;
    });

    if(prod?.campaign?.active && !categoryDiscount){
      let offerPrice = prod?.campaign_price;
      discount = 100 - (offerPrice * 100)/prod?.price;
    }
    if(!prod?.campaign?.active && categoryDiscount){
      let offerPrice = prod?.special_price - (categoryDiscount?.discount_amount || 0);
      discount = 100 - (offerPrice * 100)/prod?.price;
    }
    if(prod?.campaign?.active && categoryDiscount){
      let giftCardPrice = prod?.special_price - (categoryDiscount?.discount_amount || 0);
      let campaignPrice = prod?.campaign_price;
      if(giftCardPrice <= campaignPrice) discount = 100 - (giftCardPrice * 100)/prod?.price;
      if(campaignPrice < giftCardPrice) discount = 100 - (giftCardPrice * 100)/prod?.price;
    }
    if(!prod?.campaign?.active && categoryDiscount){
      discount = 100 - (prod?.special_price * 100)/prod?.price;
    }
    return prod?.show_discount? discount: (discount < 24.5? 0: discount);
  }
}
