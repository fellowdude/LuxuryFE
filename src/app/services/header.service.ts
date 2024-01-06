import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMobileLateralComponent } from '../models/header.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  constructor(private api: ApiService) {}

  getHeaderMenu(): Observable<any> {
    return this.api.getLogged('/category/menu');
  }
}
