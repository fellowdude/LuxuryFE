import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RedirectService {
  constructor(private router: Router) {}

  setRedirectURL(element: any) {
    if (!element?.redirectOption) return element?.redirect;

    const redirectSplitted = element?.redirect?.split('/'),
      storeOrBenefit = redirectSplitted?.[1],
      group = redirectSplitted?.[2],
      campOrCategory = redirectSplitted?.[3],
      productOrBrand = redirectSplitted?.[4];

    const isCampaign = element?.is_campaign;

    switch (element?.redirectOption) {
      case 'Grupo de categoria':
        return storeOrBenefit === 'product'
          ? `/tienda/${group}`
          : `/beneficios/${group}`;

      case 'Categoria':
        return `/tienda/${group}/categoria/${campOrCategory}`;
      case 'Campaña':
        return `/tienda/${group}/camp/${campOrCategory}`;
      case 'Marca':
        return `/tienda/${group}/${
          isCampaign ? 'camp' : 'categoria'
        }/${campOrCategory}/marca/${productOrBrand}`;
      case 'Producto':
        return `/tienda/${group}/categoria/${campOrCategory}/marca/marca/producto/${productOrBrand}`;
      case 'Experiencia':
        return `/beneficios/${group}/categoria/${campOrCategory}`;
      default:
        return '';
    }
  }

  redirect(el: any) {
    if (el.redirectURL.includes('www')) {
      const includesHttps = el.redirectURL.includes('https://');
      includesHttps
        ? window.open(el.redirectURL)
        : window.open('https://' + el.redirectURL);
    } else {
      this.router.navigate([el.redirectURL]);
    }
  }
}
