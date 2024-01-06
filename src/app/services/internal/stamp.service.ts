import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StampService {

  constructor() { }

  getStamp(product, url_attachment): string {
    if (product?.image_stamp && product.active_stamp) {
      return url_attachment + product.image_stamp;
    }
    if (product?.campaign?.image_stamp && product?.campaign?.active_stamp) {
      console.log('campaing')
      return url_attachment + product.campaign.image_stamp;
    }
    if (product?.found_category?.image_stamp && product?.found_category?.active_stamp) {
      console.log('category')
      return url_attachment + product.found_category.image_stamp;
    }
    const foundCategory = product?.categories?.find(category => category.active_stamp && category.image_stamp);
    if (foundCategory) {
      return url_attachment + foundCategory.image_stamp;
    }
    return '';
  }
}
