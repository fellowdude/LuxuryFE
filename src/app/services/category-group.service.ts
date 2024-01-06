import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryGroupService {
  constructor(private apiService: ApiService) {}

  getListCategoryOfGroup(group: string): Observable<any> {
    return this.apiService.getLogged(`/category/list-category-full/${group}`);
  }

  getCategoryGroups(): Observable<any> {
    return this.apiService.get('/category-group/list');
  }
}
