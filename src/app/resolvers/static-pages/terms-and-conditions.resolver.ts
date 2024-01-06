import { ITermsConditionPage } from 'src/app/models/terms-conditions.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { StaticPageService } from 'src/app/services/static-page.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TermsAndConditionsResolver
  implements Resolve<Observable<ITermsConditionPage>> {
  constructor(private staticPageService: StaticPageService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<ITermsConditionPage> {
    const pageName = route.routeConfig.path;
    return this.staticPageService.getStaticPage(pageName).pipe(
      map((data: IStaticTermsCondition) => {
        return {
          bannerImage:
            data.banner_imagen.url_attachment + data.banner_imagen.value,
          bannerTitle: data.banner_titulo.value,
          termsConditionsText: data.contenido_contenido.value,
        };
      })
    );
  }
}

export interface IStaticTermsCondition {
  banner_imagen: BannerImagen;
  banner_titulo: BannerTitulo;
  contenido_contenido: BannerTitulo;
  contenido_titulo: BannerTitulo;
}

export interface BannerImagen {
  type: string;
  url_attachment: string;
  value: string;
}

export interface BannerTitulo {
  type: string;
  value: string;
}
