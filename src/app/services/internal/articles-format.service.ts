import { Injectable } from '@angular/core';
import { IMagazinePrestigeCard } from 'src/app/models/magazine-prestige-card.model';

@Injectable({
  providedIn: 'root',
})
export class ArticlesFormatService {
  constructor() {}

  formatArticles(articlesInfo: any): Array<IMagazinePrestigeCard> {
    let result: Array<IMagazinePrestigeCard> = [];
    let item: IMagazinePrestigeCard = null;
    this.shuffle(articlesInfo?.data)
      ?.slice(0, 2)
      .forEach((e) => {
        item = {
          prestigeTitle: e?.title,
          prestigeBody: e?.detail,
          prestigeImage: articlesInfo?.url_attachment + e.image_banner,
          link:
            'https://prestigia.pe/' +
            e?.categories[0]?.friendly_url +
            '/' +
            e?.friendly_url + '?loggued=true',
        };
        result.push(item);
      });
    return result;
  }

  shuffle(array: Array<any>): Array<any> {
    if (array) {
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }
    return [];
  }
}
