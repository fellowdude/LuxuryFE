import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private api: ApiService) { }

  getArticles(): Observable<any>{
    return this.api.prestigiaGet('/post/salient/all');
  }
}
