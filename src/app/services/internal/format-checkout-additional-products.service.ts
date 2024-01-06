import { Injectable } from '@angular/core';
import { IAdditionalProductItem } from 'src/app/models/checkout.model';
import { HomePageService } from './home-page.service';

@Injectable({
  providedIn: 'root'
})
export class FormatCheckoutAdditionalProductsService {

  constructor() { }

  formatAdditionalProductsList(rawProductList:Array<any>): Array<IAdditionalProductItem> {
    let result: Array<IAdditionalProductItem> = [];
    let item: IAdditionalProductItem = null;
    rawProductList?.forEach((e)=>{
      item = {
        productInfo: {
          _id: e?._id,
          brand: e?.brand.name,
          productName: e?.name,
          productImage: e?.url_attachment + e?.image_cover,
          specialPrice: e?.special_price,
          normalPrice: e?.price,
          stock: e?.stock,
          link: '/tienda/' + e?.categories[0]?.group?.friendly_url + '/categoria/' + e?.categories[0]?.friendly_url + '/marca/' + e?.brand?.friendly_url + '/producto/' + e?.friendly_url
        },
        backgroundImage: e?.url_attachment + e?.image_background_discount,
        normalPrice: e?.price,
        specialPrice: e?.special_price,
        specialSalePrice: e?.special_price - (e?.type_discount?.value === '%'? (e?.special_price * (e?.discount_amount / 100)): (e?.special_price - e?.discount_amount)),
        saleMessage: e?.description_discount
      }
      result.push(item);
    })
    return result.splice(0,2);
  }
}
