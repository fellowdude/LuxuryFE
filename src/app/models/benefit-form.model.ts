import { RequestField, ListField } from '../services/experiences.service';

export interface IBenefitForm {
  buttonText: string;
  completeFormFields: ListField[];
  footerMessage: string;
  formFields: RequestField[];
  title: string;
}
