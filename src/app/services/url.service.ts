import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  inHome: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  inHome$ = this.inHome.asObservable();
  constructor() {}

  setInHome(value: boolean) {
    this.inHome.next(value);
  }
}
