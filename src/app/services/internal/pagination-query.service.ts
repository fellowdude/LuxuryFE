import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PaginationQueryService {

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { }

  setRouteParams(page: number, filter?: any, sort?: any){
    const queryParams: Params = { page: page };
    filter && (queryParams.filter = JSON.stringify(filter));
    sort && (queryParams.sort = JSON.stringify(sort));
    this.router.navigate(
    [],
    {
      relativeTo: this.activeRoute,
      queryParams: queryParams,
    });
  }
}
