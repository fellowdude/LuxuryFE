import { Injectable } from '@angular/core';
import { ICardListItem } from 'src/app/models/card-list.model';

@Injectable({
  providedIn: 'root',
})
export class CardListService {
  constructor() {}

  homeCardListFormat(categoryList: Array<any>): Array<ICardListItem> {
    let result: Array<ICardListItem> = [];
    let item: ICardListItem = null;
    categoryList?.forEach((e) => {
      item = {
        text: e?.name,
        imageDesktop: e?.url_attachment + e?.image_web,
        imageMobile: e?.url_attachment + e?.image_app,
        link:
          (e?.typeGroupCategory?.ref1 == 'product'
            ? '/tienda/'
            : '/beneficios/') + e?.friendly_url,
      };
      result.push(item);
    });
    return result;
  }

  categoryGroupCardListFormat(
    path: string,
    categoryList: any,
    campaignList?: any
  ): Array<ICardListItem> {
    let result: Array<ICardListItem> = [];
    let item: ICardListItem = null;
    campaignList?.data?.forEach((e) => {
      item = {
        text: e?.name,
        imageDesktop: campaignList?.url_attachment + e?.image_thumbnail,
        imageMobile: campaignList?.url_attachment + e?.image_thumbnail_mobile,
        link: path + '/camp/' + e?.friendly_url,
      };
      result.push(item);
    });
    categoryList?.data?.forEach((e) => {
      item = {
        text: e?.name,
        imageDesktop: categoryList?.url_attachment + e?.image_link,
        imageMobile: categoryList?.url_attachment + e?.image_link_mobile,
        link: path + '/categoria/' + e?.friendly_url,
      };
      result.push(item);
    });
    return result;
  }
}
