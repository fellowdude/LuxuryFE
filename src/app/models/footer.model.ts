export interface IEnterpriseInfo {
  field: string;
  icon: string;
  name: string;
  state: boolean;
  type: string;
  value: string;
}

export interface IFooterDataEnterpriseInfo {
  type: string;
  value: Array<IEnterpriseInfo>;
}

export interface IFooterDataTextLogo {
  type: string;
  url_attachment?: string;
  value: string;
}

export interface IFooterDataGeneral {
  contenido_datos_empresa: IFooterDataEnterpriseInfo;
  contenido_logo_banco: IFooterDataTextLogo;
  contenido_logo_empresa: IFooterDataTextLogo;
  contenido_logo_sonr: IFooterDataTextLogo;
  contenido_texto_1: IFooterDataTextLogo;
  contenido_texto_2: IFooterDataTextLogo;
}
