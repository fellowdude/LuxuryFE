import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  constructor(private http: HttpClient) { }

  checkERPStatus(){
    const headers = new HttpHeaders()
      .set('key', 'Bearer ' + btoa(Constants.API_KEY))
      .append('Content-Type', 'application/json');
    return this.http.get(Constants.URL_BACKEND + '/authorization/production-pass', { headers });
  }
}
