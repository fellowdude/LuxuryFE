import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBenefitForm } from '../models/benefit-form.model';
import { ApiService } from './api.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ExperiencesService {
  constructor(private apiService: ApiService) {}

  getFormExperience(idForm): Observable<IBenefitForm> {
    return this.apiService.getLogged(`/personalized-form/data/${idForm}`).pipe(
      tap(console.log),
      map((data: IReceivedForm) => {
        return {
          title: data.title,
          formFields: data.request_field,
          footerMessage: data.footer_message,
          buttonText: data.button_text,
          completeFormFields: data.listField,
        };
      })
    );
  }

  sendFormExperience(formData): Observable<any> {
    return this.apiService.postLogged('/email/send-email-template', formData);
  }

  getActByFilter(
    filterObject: any,
    page: number = 1,
    quantity: number = 12
  ): Observable<any> {
    let params: any = {
      data: filterObject,
      page: page,
      quantity: quantity,
    };
    const query = this.apiService.createHttpParams(params);
    return this.apiService.getLogged(
      '/experience/api/v2/category-filter',
      query
    );
  }
}

export interface IReceivedForm {
  _id: string;
  name: string;
  request_field: RequestField[];
  footer_message: string;
  title: string;
  button_text: string;
  image_banner: string;
  id_form_email: string;
  listField: ListField[];
}

export interface ListField {
  _id: string;
  code: string;
  value: string;
  active: boolean;
  ref1: string;
  field_replace: string;
}

export interface RequestField {
  _id: string;
  type: string;
  name: string;
  replaceable: boolean;
  replace: string;
  field: string;
  required: boolean;
  size: number;
  sub_type?: string;
}
