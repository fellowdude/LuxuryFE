import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Observable } from 'rxjs';
import { OpenInMobileComponent } from './modals/products/open-in-mobile/open-in-mobile.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private modalRef: MDBModalRef;

  constructor(private router: Router, private modalService: MDBModalService) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let compare = state.url.indexOf('producto') != -1 || state.url.indexOf('empresa') != -1;
    var isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|webOS|BlackBerry|IEMobile|Opera Mini)/i);
    let url = state.url.split('/');
    if (localStorage.getItem('jwt') || sessionStorage.getItem('jwt')) {
      if(compare && isMobile && !sessionStorage.getItem('noapp')){
        this.openInMobile(state.url);
        this.modalRef.content?.action?.subscribe(
          (result)=>{
            if(result){
              let connect = ''
              if(state.url.indexOf('producto') != -1){
                connect = 'product/' + url[url.length - 1];
              }else{
                connect = 'experience/' + url[url.length - 1];
              }
              window.location.href = 'luxury://' + connect;
              return false;
            }else{
              sessionStorage.setItem('noapp','1');
              this.router.navigate([state.url]);
              return true;
            }
          }
        )
      }
      return true;
    } else {
          if(compare){
            if(isMobile && !sessionStorage.getItem('noapp')){
              this.openInMobile(state.url);
              this.modalRef.content?.action?.subscribe(
                (result)=>{
                  if(result){
                    let connect = ''
                    if(state.url.indexOf('producto') != -1){
                      connect = 'product/' + url[url.length - 1];
                    }else{
                      connect = 'experience/' + url[url.length - 1];
                    }
                    window.location.href = 'luxury://' + connect;
                    return false;
                  }else{
                    sessionStorage.setItem('noapp','1');
                    this.router.navigate([state.url]);
                    return true;
                  }
                }
        )
            }else{
              this.router.navigate(['/inicio']);
              return false;
            }
          }else{
            this.router.navigate(['/inicio']);
            return false;
          }
    }
  }

  openInMobile(urlRaw: string): void {
    this.modalRef = this.modalService.show(OpenInMobileComponent, {
      animated: true,
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      class: 'modal-information modal-dialog modal-dialog-centered',
      containerClass: 'modal fade',
      ignoreBackdropClick: false,
      data: {
        type: urlRaw.indexOf('producto') != -1? 'product':'experience'
      }
    });
  }
}
