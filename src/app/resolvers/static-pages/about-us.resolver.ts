import { IAboutUsPage } from 'src/app/models/about-us.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { StaticPageService } from 'src/app/services/static-page.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AboutUsResolver implements Resolve<Observable<IAboutUsPage>> {
  constructor(private staticPageService: StaticPageService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<IAboutUsPage> {
    const pageName = route.routeConfig.path;
    return this.staticPageService.getStaticPage(pageName).pipe(
      map((data: IStaticAboutUs) => {
        return {
          aboutUsText: data.contenido_contenido.value,
          aboutUsTitle: data.contenido_titulo.value,
          bannerImg:
            data.banner_imagen.url_attachment + data.banner_imagen.value,
          benefits: data.beneficio_beneficio.value.map(
            (benefit, idx) => idx + 1 + '&nbsp.&nbsp' + benefit.value
          ),
          benefitsTitle: 'Beneficios',
          lastText: data.contenido_texto_final.value,
          textBanner: data.banner_titulo.value,
        };
      })
    );
  }
}

export interface IStaticAboutUs {
  banner_imagen: BannerImagen;
  banner_titulo: BannerTitulo;
  beneficio_beneficio: BeneficioBeneficio;
  contenido_contenido: BannerTitulo;
  contenido_texto_final: BannerTitulo;
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

export interface BeneficioBeneficio {
  type: string;
  value: Value[];
}

export interface Value {
  value: string;
}
