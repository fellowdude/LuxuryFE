import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log(request.url)
    if (
      request.url.indexOf('/payu') != -1 ||
      request.url.indexOf('/product/detail-preview') != -1 ||
      request.url.indexOf('/production-pass') != -1
    ) {
      return next.handle(request);
    }
    return next.handle(request).pipe(
      catchError((response) => {
        if (response instanceof HttpErrorResponse) {
          if (response.error.statusCode != 404) {
            if (response.error.close_session) {
              // Borrar jwt
              sessionStorage.setItem('jwt', '');
              sessionStorage.removeItem('jwt');
              //sessionStorage.clear();
              localStorage.setItem('jwt', '');
              localStorage.removeItem('jwt');
              //localStorage.clear();
              if (response.error.recoveryPassword) {
                this.router.navigate(['/ingreso']);
              } else {
                this.toastr.warning(
                  'Por favor inicie sesión nuevamente',
                  'Advertencia',
                  {
                    timeOut: 3000,
                    progressBar: true,
                  }
                );
                this.router.navigate(['/ingreso']);
              }
            } else if (response.error.message) {
              if (response.error.recoveryPassword) {
                this.router.navigate(['/inicio']);
              } else {
                this.toastr.error(response.error.message, 'Hubo un problema', {
                  timeOut: 3000,
                  progressBar: true,
                });
              }
            }
          } else {
            !response.url.includes('recovery') &&
              !response.url.includes('shopping-cart') &&
              !response.url.includes('block/data') &&
              this.router.navigate(['/inicio']);
            if (!response.url.includes('block/data') && !response.url.includes('recovery'))
              this.toastr.warning(response.error.message, 'Advertencia', {
                timeOut: 3000,
                progressBar: true,
              });
          }
        }
        return throwError(response);
      })
    );
  }
}
