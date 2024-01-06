import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private api: ApiService) {}

  login(jwt: any): Observable<any> {
    return this.api.post('/authorization', jwt);
  }

  logout(): Observable<any> {
    return this.api.deleteLogged('/authentication/log-out');
  }

  recoverPassword(headerJWT: any, passwordJWT: any): Observable<any> {
    return this.api.postRecovery(
      '/authentication/recovery-password',
      headerJWT,
      passwordJWT
    );
  }

  recoverUser(jwt: any): Observable<any> {
    return this.api.post('/authentication/recovery-email-customer', jwt);
  }

  recoverMemberNumber(jwt: any): Observable<any> {
    return this.api.get('/enterprise-middleware/recover-member-number', this.api.createHttpParams(jwt));
  }

  changePassword(sJWT): Observable<any> {
    return this.api.postLogged('/authentication/change-password', { jwt: sJWT });
  }

  sendMailPasswordRecovery(sJWT): Observable<any> {
    return this.api.post('/authentication/send-mail-password-recovery', { jwt: sJWT });
  }
}
