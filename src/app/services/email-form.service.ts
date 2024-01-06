import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface IEmailBody {
  data: any;
  id_form_email: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmailFormService {
  constructor(private apiService: ApiService) {}

  sendEmailForm(formInfo: IEmailBody): Observable<any> {
    return this.apiService.postLogged('/email/send-email-template', formInfo);
  }

  sendPublicFormData(formInfo: IEmailBody): Observable<any> {
    return this.apiService.post('/email/send-email-template', formInfo);
  }
}
