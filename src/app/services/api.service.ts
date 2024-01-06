import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private JWT_TOKEN = Constants.API_KEY;

  constructor(private http: HttpClient) {}

  private formatErrors(error: any) {
    console.log(error);
    return throwError(error.error);
  }

  createHttpParams(params: any): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(params).forEach((param) => {
      httpParams = httpParams.set(param, JSON.stringify(params[param]));
    });
    return httpParams;
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http
      .get(`${environment.URL_BACKEND}${path}`, {
        params,
        headers: {
          key: `Bearer ${btoa(this.JWT_TOKEN)}`,
        },
      })
      .pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http
      .post(`${environment.URL_BACKEND}${path}`, body, {
        headers: {
          key: `Bearer ${btoa(this.JWT_TOKEN)}`,
        },
      })
      .pipe(catchError(this.formatErrors));
  }

  postLog(path: string, body: Object = {}): Observable<any> {
    return this.http
      .post(`${environment.URL_BACKEND}${path}`, body, {
        headers: {
          key: `Bearer ${btoa(this.JWT_TOKEN)}`,
        },
      })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http
      .put(`${environment.URL_BACKEND}${path}`, body, {
        headers: {
          key: `Bearer ${btoa(this.JWT_TOKEN)}`,
        },
      })
      .pipe(catchError(this.formatErrors));
  }

  delete(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http
      .delete(`${environment.URL_BACKEND}${path}`, {
        params,
        headers: {
          key: `Bearer ${btoa(this.JWT_TOKEN)}`,
        },
      })
      .pipe(catchError(this.formatErrors));
  }

  getLogged(
    path: string,
    params: HttpParams = new HttpParams()
  ): Observable<any> {
    // console.log('params',params)
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + btoa(localStorage.getItem('jwt')))
      .set('Vary', '*')
      .set('Cache-Control', 'no-store')
      .append('key', 'Bearer ' + btoa(this.JWT_TOKEN))
      .append('Content-type', 'application/json');
    return this.http
      .get(`${environment.URL_BACKEND}${path}`, {
        params,
        headers: headers,
      })
      .pipe(catchError(this.formatErrors));
  }

  postLogged(
    path: string,
    body: Object = {},
    params: HttpParams = new HttpParams()
  ): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + btoa(localStorage.getItem('jwt')))
      .append('key', 'Bearer ' + btoa(this.JWT_TOKEN))
      .append('Content-type', 'application/json');
    return this.http
      .post(`${environment.URL_BACKEND}${path}`, body, {
        params,
        headers: headers,
      })
      .pipe(catchError(this.formatErrors));
  }

  putLogged(
    path: string,
    body: Object = {},
    params: HttpParams = new HttpParams()
  ): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + btoa(localStorage.getItem('jwt')))
      .append('key', 'Bearer ' + btoa(this.JWT_TOKEN))
      .append('Content-type', 'application/json');
    return this.http
      .put(`${environment.URL_BACKEND}${path}`, body, {
        params,
        headers: headers,
      })
      .pipe(catchError(this.formatErrors));
  }

  deleteLogged(
    path: string,
    params: HttpParams = new HttpParams()
  ): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + btoa(localStorage.getItem('jwt')))
      .append('key', 'Bearer ' + btoa(this.JWT_TOKEN))
      .append('Content-type', 'application/json');
    return this.http
      .delete(`${environment.URL_BACKEND}${path}`, {
        params,
        headers: headers,
      })
      .pipe(catchError(this.formatErrors));
  }

  postRecovery(
    path: string,
    headerJWT: string = '',
    passwordJWT: string = ''
  ): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + btoa(headerJWT))
      .append('key', 'Bearer ' + btoa(this.JWT_TOKEN))
      .append('Content-type', 'application/json');
    return this.http
      .post(
        `${environment.URL_BACKEND}${path}`,
        { jwt: passwordJWT },
        {
          headers: headers,
        }
      )
      .pipe(catchError(this.formatErrors));
  }

  prestigiaGet(
    path: string,
    params: HttpParams = new HttpParams()
  ): Observable<any> {
    return this.http
      .get(`${Constants.PRESTIGIA_BACKEND}${path}`, {
        params,
        headers: {
          key: `Bearer ${Constants.PRESTIGIA_API_KEY}`,
        },
      })
      .pipe(catchError(this.formatErrors));
  }
}
