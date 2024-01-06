import { Injectable } from '@angular/core';
import { INewMemberModal, IStaticPageNewMember } from 'src/app/models/contact-modal.model';

@Injectable({
  providedIn: 'root'
})
export class NewMemberTransformService {

  constructor() { }

  transformNewMemberForm(staticPageContact: IStaticPageNewMember) : INewMemberModal{
    return {
      _id: staticPageContact.content_form.id_form_email,
      requestFields: staticPageContact.content_form.value,
    };
  }
}
