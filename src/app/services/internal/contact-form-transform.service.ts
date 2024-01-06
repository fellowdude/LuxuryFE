import { Injectable } from '@angular/core';
import {
  IContactModal,
  IStaticPageContact,
} from 'src/app/models/contact-modal.model';

@Injectable({
  providedIn: 'root',
})
export class ContactFormTransformService {
  constructor() {}

  transformContactForm(staticPageContact: IStaticPageContact): IContactModal {
    return {
      _id: staticPageContact.email_contactenos.id_form_email,
      title: staticPageContact.contenido_titulo.value,
      contactMessage: staticPageContact.contenido_mensaje_formulario.value,
      content: staticPageContact.contenido_datos_de_la_empresa.value,
      requestFields: staticPageContact.email_contactenos.value,
      sentForm: {
        message: staticPageContact.pagina_enviada_contenido.value,
        title: staticPageContact.pagina_enviada_titulo.value,
      },
    };
  }
}
