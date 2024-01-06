import {
  IFooterDataEnterpriseInfo,
  IFooterDataTextLogo,
  IFooterDataGeneral,
} from '../models/footer.model';

export const enterpriseInfoItem1: IFooterDataEnterpriseInfo = {
  type: 'property',
  value: [
    {
      field: 'contact_phone',
      icon: 'fas fa-phone',
      name: 'Celular de contacto',
      state: true,
      type: 'text',
      //value: "01-21547854"
      value: '01 2080 333',
    },
    {
      field: 'contact_address',
      icon: 'fas fa-map-marker-alt',
      name: 'Dirección de contacto',
      state: true,
      type: 'text',
      //value: "Av. Arequipa 4029, Miraflores 15046, Perú"
      value: 'Jirón Lord Nelson 378 - 380, Miraflores',
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

export const enterpriseInfoItem2: IFooterDataTextLogo = {
  type: 'image',
  url_attachment: 'https://luxurysass.sfo2.digitaloceanspaces.com',
  value: '/storage-attachment/61dd48b0-d994-11e9-bdd7-45f6904f9759',
};

export const enterpriseInfoItem3: IFooterDataTextLogo = {
  type: 'image',
  url_attachment: 'https://luxurysass.sfo2.digitaloceanspaces.com',
  value: '/storage-attachment/b8e2ede0-9c4f-11e9-9064-1d71856dec31',
};

export const enterpriseInfoItem4: IFooterDataTextLogo = {
  type: 'image',
  url_attachment: 'https://luxurysass.sfo2.digitaloceanspaces.com',
  value: '/storage-attachment/c6d04c40-9c4f-11e9-9064-1d71856dec31',
};

export const enterpriseInfoItem5: IFooterDataTextLogo = {
  type: 'rich-text',
  value: '<p><strong>Luxury&nbsp;</strong>2020 una marca registrada de</p>',
};

export const enterpriseInfoItem6: IFooterDataTextLogo = {
  type: 'rich-text',
  value: '<p>Dise&ntilde;o Web por: <strong>Sonr Digital</strong></p>',
};

export const footerDataList: IFooterDataGeneral = {
  contenido_datos_empresa: enterpriseInfoItem1,
  contenido_logo_banco: enterpriseInfoItem2,
  contenido_logo_empresa: enterpriseInfoItem3,
  contenido_logo_sonr: enterpriseInfoItem4,
  contenido_texto_1: enterpriseInfoItem5,
  contenido_texto_2: enterpriseInfoItem6,
};
