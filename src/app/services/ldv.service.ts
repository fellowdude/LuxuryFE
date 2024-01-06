import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LdvService {

  constructor(private api: ApiService) {
  }

  getLdvDetail(codeLdv:string): Observable<any> {
    return this.api.get(`/list-of-values/detail/${codeLdv}`);
  }

  getLdvDetailLogged(codeLdv:string): Observable<any> {
    return this.api.getLogged(`/list-of-values/detail/${codeLdv}`);
  }
}
