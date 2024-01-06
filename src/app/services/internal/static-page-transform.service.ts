import { Injectable } from '@angular/core';
import {
  IExclusiveServicesCard,
  IHowToBuyCard,
} from 'src/app/models/static-items.model';

@Injectable({
  providedIn: 'root',
})
export class StaticPageTransformService {
  constructor() {}

  transformHowToBuy(staticPageHowToBuy: IStaticHowToBuy): IHowToBuyCard[] {
    return staticPageHowToBuy?.contenido_textos?.value?.map((cardContent) => ({
      title: cardContent?.name,
      text: cardContent?.content?.[0]?.value,
    }));
  }

  transformExclusiveServices(
    staticExclusiveServices: IStaticExclusiveServices
  ): IExclusiveServicesCard[] {
    return staticExclusiveServices.contenido_textos.value?.[0]?.map(
      (cardContent) => ({
        title: cardContent.value,
        text: cardContent.attribute?.[0]?.value,
        subText: cardContent.attribute?.[1]?.value,
      })
    );
  }
}

// *** HowToBuy from Backend *** //
export interface IStaticHowToBuy {
  contenido_textos: ContenidoTextosHowToBuy;
}

export interface ContenidoTextosHowToBuy {
  value: Value[];
  type: string;
}

export interface Value {
  accordion: boolean;
  name: string;
  accordion_show: boolean;
  content: Content[];
}

export interface Content {
  type: string;
  title_rest: string;
  title: string;
  value: string;
}

// *** ExclusiveServices from Backend *** //
export interface IStaticExclusiveServices {
  contenido_textos: ContenidoTextosExclusiveServices;
}

export interface ContenidoTextosExclusiveServices {
  value: Array<ValueExclusiveService[]>;
  type: string;
}

export interface ValueExclusiveService {
  type: string;
  attribute: Attribute[];
  value: string;
}

export interface Attribute {
  field: string;
  value: string;
}
