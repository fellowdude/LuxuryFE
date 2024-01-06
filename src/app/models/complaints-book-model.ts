import { FormValue } from '../resolvers/static-pages/complaints-book.resolver';

export interface IComplaintsBookPage {
  bannerImage: string;
  complaintsBookText: string;
  formFields: FormValue[];
  id_form_email: string;
  textBanner: string;
}
