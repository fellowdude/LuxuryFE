import { Component, Inject, OnInit } from '@angular/core';
import { IUserInfo } from 'src/app/models/profile.model';
import { LoginService } from 'src/app/services/login.service';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { MY_ADDRESSES_TOKEN } from '../my-addresses/my-addresses';
import { ORDER_HISTORY_TOKEN } from '../order-history/order-history';
import { PROFILE_TOKEN } from '../profile/profile';
import { ProfileService } from 'src/app/services/profile.service';
import { ProfileTransformService } from 'src/app/services/internal/profile-transform.service';
import { RATE_EXPERIENCE } from '../rate-experience/rate-experience';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-account',
  templateUrl: './menu-account.component.html',
  styleUrls: ['./menu-account.component.scss'],
})
export class MenuAccountComponent implements OnInit {
  userInfo: IUserInfo;
  canBack: boolean = false;

  constructor(
    @Inject(MY_ADDRESSES_TOKEN) private myAddressesComponent: any,
    @Inject(ORDER_HISTORY_TOKEN) private orderHistoryComponent: any,
    @Inject(PROFILE_TOKEN) private profileComponent: any,
    @Inject(RATE_EXPERIENCE) private rateExperienceComponent: any,
    private loginService: LoginService,
    private modalRef: MDBModalRef,
    private modalService: MDBModalService,
    private profileService: ProfileService,
    private profileTransformService: ProfileTransformService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.profileService.getProfile().subscribe((res) => {
      this.userInfo = this.profileTransformService.profileTransform(res);
    });
  }

  showUser(): void {
    this.closeModal();
    this.modalRef = this.modalService.show(this.profileComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-full-height modal-right mh-100 my-0',
      containerClass: 'right modal-dialog-scrollable mh-100 my-0',
      animated: true,
      data: {
        userInfo: this.userInfo,
      },
    });
  }

  showAddresses(): void {
    this.closeModal();
    this.modalRef = this.modalService.show(this.myAddressesComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-full-height modal-right mh-100 my-0',
      containerClass: 'right modal-dialog-scrollable mh-100 my-0',
      animated: true,
    });
  }

  showRateExperience(): void {
    this.closeModal();
    this.modalRef = this.modalService.show(this.rateExperienceComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-full-height modal-right mh-100 my-0',
      containerClass: 'right modal-dialog-scrollable mh-100 my-0',
      animated: true,
    });
  }

  showOrderHistory(): void {
    this.closeModal();
    this.modalRef = this.modalService.show(this.orderHistoryComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-full-height modal-right mh-100 my-0',
      containerClass: 'right modal-dialog-scrollable mh-100 my-0',
      animated: true,
    });
  }

  goToFAQ(): void {
    this.closeModal();
    this.router.navigate(['/informacion/preguntas_frecuentes']);
  }

  goToBook(): void {
    this.closeModal();
    this.router.navigate(['/informacion/libro_de_reclamaciones']);
  }

  goToTerms(): void {
    this.closeModal();
    this.router.navigate(['/informacion/terminos_y_condiciones']);
  }

  goToPolitics(): void {
    this.closeModal();
    this.router.navigate(['/informacion/politicas_de_privacidad']);
  }

  logout() {
    this.closeModal();
    this.loginService.logout().subscribe((res) => {
      localStorage.removeItem('jwt');
      this.router.navigate(['/ingreso']);
    });
  }

  closeModal(): void {
    this.modalRef.hide();
  }
}
