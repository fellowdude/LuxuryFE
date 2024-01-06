import { Injectable } from '@angular/core';
import {
  IFooterDataEnterpriseInfo,
  IFooterDataGeneral,
  IFooterDataTextLogo,
} from '../models/footer.model';

@Injectable({
  providedIn: 'root',
})
export class FooterInformationService {
  private enterpriseInfoItem1: IFooterDataEnterpriseInfo = {
    type: 'property',
    value: [
      {
        field: 'contact_phone',
        icon: 'fas fa-phone',
        name: 'Celular de contacto',
        state: true,
        type: 'text',
        value: '01 2080 333',
      },
      {
        field: 'contact_address',
        icon: 'fas fa-map-marker-alt',
        name: 'Dirección de contacto',
        state: true,
        type: 'text',
        value: 'Pasaje Vicuña Nro. 194, Surquillo',
      },
      {
        field: 'contact_email',
        icon: 'fas fa-envelope',
        name: 'Email de contacto',
        state: true,
        type: 'text',
        value: 'atencionalcliente@luxury.pe',
      },
    ],
  };

  private enterpriseInfoItem2: IFooterDataTextLogo = {
    type: 'image',
    url_attachment: 'https://luxurysass.sfo2.digitaloceanspaces.com',
    value: '/storage-attachment/61dd48b0-d994-11e9-bdd7-45f6904f9759',
  };

  private enterpriseInfoItem3: IFooterDataTextLogo = {
    type: 'image',
    url_attachment: 'https://luxurysass.sfo2.digitaloceanspaces.com',
    value: '/storage-attachment/b8e2ede0-9c4f-11e9-9064-1d71856dec31',
  };

  private enterpriseInfoItem4: IFooterDataTextLogo = {
    type: 'image',
    url_attachment: 'https://luxurysass.sfo2.digitaloceanspaces.com',
    value: '/storage-attachment/c6d04c40-9c4f-11e9-9064-1d71856dec31',
  };

  private enterpriseInfoItem5: IFooterDataTextLogo = {
    type: 'rich-text',
    value: '<p><strong>Luxury&nbsp;</strong>2020 una marca registrada de</p>',
  };

  private enterpriseInfoItem6: IFooterDataTextLogo = {
    type: 'rich-text',
    value: '<p>Dise&ntilde;o Web por: <strong>Sonr Digital</strong></p>',
  };

  footerDataList: IFooterDataGeneral = {
    contenido_datos_empresa: this.enterpriseInfoItem1,
    contenido_logo_banco: this.enterpriseInfoItem2,
    contenido_logo_empresa: this.enterpriseInfoItem3,
    contenido_logo_sonr: this.enterpriseInfoItem4,
    contenido_texto_1: this.enterpriseInfoItem5,
    contenido_texto_2: this.enterpriseInfoItem6,
  };

  constructor() {}
}
