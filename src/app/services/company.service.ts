import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private apiService: ApiService) {}

  getCompany(company: string) {
    return this.apiService.getLogged(`/experience/detail/${company}`);
  }
}
