import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class StaticPageService {
  constructor(private api: ApiService) {}

  getStaticPage(pageName: string) {
    return this.api.getLogged(`/static-page/data/${pageName}`);
  }

  getPublicStaticPage(pageName: string) {
    return this.api.get(`/static-page/data/${pageName}`);
  }
}
