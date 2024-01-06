import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Constants } from '../constants';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient, private api: ApiService) { }

  registerUser(userData) {
    return this.api.post('/user', userData);
  }
}
