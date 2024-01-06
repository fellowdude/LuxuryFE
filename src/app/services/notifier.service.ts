import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { INotifier } from '../models/notifier.model';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {
  private notifySubject = new Subject<INotifier>();
  notifyListener = this.notifySubject.asObservable();
  constructor() { }

  notify(data: INotifier) {
    this.notifySubject.next(data);
  }
}
