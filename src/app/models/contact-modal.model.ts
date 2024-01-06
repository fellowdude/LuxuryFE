export interface IStaticPageContact {
  contenido_datos_de_la_empresa: ContenidoDatosDeLaEmpresa;
  contenido_mensaje_formulario: ContenidoMensajeFormulario;
  contenido_titulo: ContenidoMensajeFormulario;
  email_contactenos: EmailContactenos;
  pagina_enviada_contenido: ContenidoMensajeFormulario;
  pagina_enviada_titulo: ContenidoMensajeFormulario;
}

export interface IStaticPageNewMember {
  content_form: EmailContactenos;
}

export interface ContenidoDatosDeLaEmpresa {
  type: string;
  value: ContenidoDatosDeLaEmpresaValue[];
}

export interface ContenidoDatosDeLaEmpresaValue {
  field: string;
  icon: string;
  name: string;
  state: boolean;
  type: string;
  value: string;
}

export interface ContenidoMensajeFormulario {
  type: string;
  value: string;
}

export interface EmailContactenos {
  id_form_email: string;
  type: string;
  value: EmailContactenosValue[];
}

export interface EmailContactenosValue {
  _id: string;
  field: string;
  name: string;
  replace: string;
  replaceable: boolean;
  required: boolean;
  size: number;
  sub_type?: string;
  type: string;
}

export interface IContactModal {
  _id?: string;
  contactMessage: string;
  content: ContenidoDatosDeLaEmpresaValue[];
  requestFields: EmailContactenosValue[];
  sentForm: {
    message: string;
    title: string;
  };
  title: string;
}

export interface INewMemberModal {
  _id?: string;
  requestFields: EmailContactenosValue[];
}
