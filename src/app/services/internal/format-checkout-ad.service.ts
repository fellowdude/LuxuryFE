import { Injectable } from '@angular/core';
import { ICheckoutAd } from 'src/app/models/checkout.model';

@Injectable({
  providedIn: 'root'
})
export class FormatCheckoutAdService {

  constructor() { }

  formatCheckoutAd(adRawInfo: any): ICheckoutAd {
    let result: ICheckoutAd = null
    if(adRawInfo?.content?.length > 0){
      result = {
        imageURL: adRawInfo?.content[0]?.url_attachment + adRawInfo?.content[0]?.value,
        link: adRawInfo?.content[0]?.redirect,
        internal: adRawInfo?.content[0]?.redirect?.indexOf('www') != -1? false : true,
      };
    }
    return result;
  }
}
