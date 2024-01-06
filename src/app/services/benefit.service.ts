import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class BenefitService {
  constructor(private apiService: ApiService) {}

  getBenefit(company: string, benefit: string) {
    return this.apiService.getLogged(
      `/experience/${company}/advantage/${benefit}`
    );
  }
}
