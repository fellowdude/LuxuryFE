import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class RateExperienceService {
  constructor(private apiService: ApiService) {}

  getRateExperienceForm(): Observable<IRateExperienceReceived> {
    return this.apiService.getLogged(
      '/email-form/data/calificar_experiencia_new'
    );
  }
}

export interface IRateExperienceReceived {
  _id: string;
  use_personalized_email: null;
  name: string;
  title: string;
  button_text: string;
  image_banner: null;
  footer_message: null;
  email: null;
  group_email: string;
  subject: string;
  service_save: null;
  end_point: string;
  request_field: RequestField[];
  tenant: string;
  create_by: string;
  create_date: Date;
  __v: number;
  update_by: string;
  update_date: Date;
}

export interface RequestField {
  _id: string;
  type: string;
  name: string;
  replaceable: boolean;
  size: number;
  replace: string;
  field: string;
  required: boolean;
  sub_type?: string;
}
