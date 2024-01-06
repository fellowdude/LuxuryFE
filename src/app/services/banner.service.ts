import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private api: ApiService) { }
  getBanner(bannerName: string): Observable<any> {
    return this.api.getLogged(`/block/data/${bannerName}`)
  }
}
