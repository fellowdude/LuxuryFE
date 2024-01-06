import { Injectable } from '@angular/core';
import { IProductDetailPage } from 'src/app/models/product.model';
import { ProductDiscountService } from './product-discount.service';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailPageService {
  constructor(private productDiscountService: ProductDiscountService) { }

  transformProductDetail(prod): IProductDetailPage {
    var prodDetail: IProductDetailPage = {
      _id: prod._id,
      image_cover: prod?.url_attachment + prod.image_cover,
      supplier: prod.supplier.name,
      name: prod.name,
      price: prod.price,
      special_price: prod.special_price,
      detail_list: prod.detail_list,
      extraImages:
        prod?.images_link?.length > 0
          ? prod?.images_link?.map((el) => prod?.url_attachment + el[0])
          : [prod?.url_attachment + prod.image_cover],
      imagesVariation: [],
      deliveryInformation: {
        deliveryTitle: prod.list_method[0].name,
        deliveryBody: prod.list_method[0].description,
      },
      brand: prod?.brand?.name,
      brand_friendly_url: prod?.brand?.friendly_url,
      stock: prod.stock,
      type_variation: prod?.type_variation || null,
      variation_father: prod?.variation_father?.map(variation => {
        return {
          ...variation,
          value: variation.value.map(value => {
            return {
              ...value,
              active: true
            }
          })
        }
      }) || null,
      sizes: prod?.variation_father?.length
        ? prod?.variation_father
          ?.find((variation) => variation.type === 'TEXT')
          .value.map((textVariation) => ({
            value: textVariation.value,
            active: true,
          }))
        : [],
      colors: prod?.variation_father?.length
        ? prod?.variation_father
          ?.find((variation) => variation.type === 'COLOR')
          .value.map((colorVariation) => ({
            colorHex: colorVariation.value,
            colorName: colorVariation.description,
            active: true,
          }))
        : [],
      variations: prod?.variations || null,
      category:
        prod?.campaign && prod?.campaign?.active
          ? prod?.campaign?.name
          : prod?.categories[0]?.name,
      category_friendly_url:
        prod?.campaign && prod?.campaign?.active
          ? prod?.campaign?.friendly_url
          : prod?.categories[0]?.friendly_url,
      isCampaign: prod?.campaign && prod?.campaign?.active,
      campaignPrice: prod?.campaign_price,
      campaignName: prod?.discount_name?.trimStart(),
      isGiftCard: prod?.category_active_discount,
      giftCardPrice: prod?.category_discount_amount,
      giftCardName: 'Precio Scotiabank',
      discount: this.productDiscountService.calcDiscount(prod),
      userRating: prod.userRating || null,
      url_attachment: prod?.url_attachment,
      favorited: prod?.productInWishList || false,
      SKU: prod?.SKU,
    };
    /* let giftCardCategory = prod?.categories?.find((e) => {
      return e?.active_discount;
    });
    if (giftCardCategory && !(prod?.campaign && prod?.campaign?.active)) {
      prodDetail.isGiftCard = true;
      if(giftCardCategory?.type_discount?.value === "%"){
        prodDetail.giftCardPrice = prodDetail.special_price * (1 - giftCardCategory?.discount_amount/100);
        prodDetail.discountRaw = prodDetail.special_price * (giftCardCategory?.discount_amount/100);
      }else{
        prodDetail.giftCardPrice = prodDetail.special_price - giftCardCategory?.discount_amount;
        prodDetail.discountRaw = giftCardCategory?.discount_amount;
      }
      prodDetail.giftCardName = 'Precio Scotiabank';
    } */
    prodDetail.detail_list.forEach((el) => {
      el.isOpen = false;
    });

    return prodDetail;
  }
}
