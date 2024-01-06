import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private isBlurSubject: Subject<boolean> = new Subject<boolean>();
  isBlur = this.isBlurSubject.asObservable();

  private hasCountdownSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  hasCountdown = this.hasCountdownSubject.asObservable();

  constructor() {}

  setBlur(value: boolean): void {
    this.isBlurSubject.next(value);
  }

  setHasCountdown(value: boolean): void {
    this.hasCountdownSubject.next(value);
  }
}
