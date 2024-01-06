import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {

  constructor(private api: ApiService) { }

  getDepartments(): Observable<any> {
    return this.api.getLogged('/department')
  }

  getProvincesByDepartment(id): Observable<any> {
    return this.api.getLogged('/province/' + id);
  }

  getDistrictsByProvince(id): Observable<any> {
    return this.api.getLogged('/district/' + id);
  }

}
