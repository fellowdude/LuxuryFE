import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  constructor(private apiService: ApiService) {}

  getAllCampaigns(query: any): Observable<any> {
    return this.apiService.getLogged('/campaign/all', query);
  }

  getCampaignBySlug(
    slug: string,
    page: number = 1,
    quantity: number = 12,
    filter: any = null
  ): Observable<any> {
    let params: any = { page, quantity }
    if(filter) params.filter = filter;
    const query = this.apiService.createHttpParams(params);
    return this.apiService.getLogged(`/campaign/v2/api/list/${slug}`, query);
  }
}
