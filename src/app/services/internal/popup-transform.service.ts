import { Injectable } from '@angular/core';
import { IPopup } from 'src/app/models/popup.model';
import { IPopupData } from 'src/app/resolvers/core/store/category-group.resolver';

@Injectable({
  providedIn: 'root',
})
export class PopupTransformService {
  constructor() {}

  setRedirectURL(element: any): string {
    if(!element) return '';
    if (!element?.redirectOption) return element?.redirect;

    const redirectSplitted = element?.redirect.split('/'),
      storeOrBenefit = redirectSplitted[1],
      group = redirectSplitted[2],
      campOrCategory = redirectSplitted[3],
      product = redirectSplitted[4];

    switch (element?.redirectOption) {
      case 'Grupo de categoria':
        return storeOrBenefit === 'product'
          ? `/tienda/${group}`
          : `/beneficios/${group}`;

      case 'Categoria':
        return `/tienda/${group}/categoria/${campOrCategory}`;
      case 'Campaña':
        return `/tienda/${group}/camp/${campOrCategory}`;
      case 'Producto':
        return `/tienda/${group}/categoria/${campOrCategory}/marca/marca/producto/${product}`;
      case 'Experiencia':
        return `/beneficios/${group}/categoria/${campOrCategory}`;
      default:
        return '';
    }
  }

  transformPopup({ content }: IPopupData): IPopup {
    const popupData = content?.[0];
    const popupDataMobile = content?.[1];
    return {
      desktopImage: popupData?.url_attachment + popupData?.value,
      mobileImage: popupDataMobile?.url_attachment + popupDataMobile?.value,
      redirectURLDesktop: this.setRedirectURL(popupData),
      redirectURLMobile: this.setRedirectURL(popupDataMobile),
    };
  }
}
