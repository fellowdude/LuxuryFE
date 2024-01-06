import { IFrequentlyQuestionsPage } from 'src/app/models/frequently-questions.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { StaticPageService } from 'src/app/services/static-page.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FaqResolver
  implements Resolve<Observable<IFrequentlyQuestionsPage>> {
  constructor(private staticPageService: StaticPageService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<IFrequentlyQuestionsPage> {
    const pageName = route.routeConfig.path;
    return this.staticPageService.getStaticPage(pageName).pipe(
      map((data: IStaticFAQ) => {
        return {
          bannerImage:
            data.contenido_banner.url_attachment + data.contenido_banner.value,
          titleBanner: data.contenido_titulo.value,
          questionsAnswers: data.contenido_preguntas.value.map(
            (questionAnswer) => ({
              answer: questionAnswer.content[0].value,
              question: questionAnswer.name,
            })
          ),
        };
      })
    );
  }
}

export interface IStaticFAQ {
  contenido_banner: ContenidoBanner;
  contenido_preguntas: ContenidoPreguntas;
  contenido_titulo: ContenidoTitulo;
}

export interface ContenidoBanner {
  type: string;
  url_attachment: string;
  value: string;
}

export interface ContenidoPreguntas {
  type: string;
  value: Value[];
}

export interface Value {
  accordion: boolean;
  accordion_show: boolean;
  content: Content[];
  name: string;
}

export interface Content {
  title: Title;
  title_rest: Title;
  type: Type;
  value: string;
}

export enum Title {
  Texto = 'texto',
}

export enum Type {
  RichText = 'rich-text',
}

export interface ContenidoTitulo {
  type: string;
  value: string;
}
