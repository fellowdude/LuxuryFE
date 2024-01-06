import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IComplaintsBookPage } from 'src/app/models/complaints-book-model';
import { StaticPageService } from 'src/app/services/static-page.service';

@Injectable({
  providedIn: 'root',
})
export class ComplaintsBookResolver
  implements Resolve<Observable<IComplaintsBookPage>> {
  constructor(private staticPageService: StaticPageService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IComplaintsBookPage> {
    const pageName = route.routeConfig.path;
    return this.staticPageService.getStaticPage(pageName).pipe(
      map((data: IStaticComplaintsBook) => {
        return {
          bannerImage: data.banner_imagen.url_attachment + data.banner_imagen.value,
          complaintsBookText: data.contenido_contenido.value,
          formFields: data.contenido_libro_de_reclamaciones.value,
          id_form_email: data.contenido_libro_de_reclamaciones.id_form_email,
          textBanner: data.contenido_titulo.value,
        };
      })
    );
  }
}

export interface IStaticComplaintsBook {
  banner_imagen: BannerImagen;
  contenido_contenido: ContenidoContenido;
  contenido_libro_de_reclamaciones: ContenidoLibroDeReclamaciones;
  contenido_titulo: ContenidoContenido;
  pagina_enviado_contenido: ContenidoContenido;
  pagina_enviado_titulo: ContenidoContenido;
}

export interface BannerImagen {
  type: string;
  url_attachment: string;
  value: string;
}

export interface ContenidoContenido {
  type: string;
  value: string;
}

export interface ContenidoLibroDeReclamaciones {
  id_form_email: string;
  type: string;
  value: FormValue[];
}

export interface FormValue {
  _id: string;
  field: string;
  list?: string[];
  name: string;
  replace?: string;
  replaceable: boolean;
  required?: boolean;
  type: string;
}
