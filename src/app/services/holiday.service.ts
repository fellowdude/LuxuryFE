import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  constructor(private http: HttpClient) { }

  getAuthorization() {
    return btoa(localStorage.getItem('jwt'));
  }

  getCalendar(month, year) {
    const headers = new HttpHeaders()
      .set('Content-type', 'application/json')
      .append('Authorization', 'Bearer ' + this.getAuthorization());
    return this.http.get(Constants.URL_BACKEND + '/holiday/listHoliday/' + month + '/' + year, { headers: headers });
  }

}
