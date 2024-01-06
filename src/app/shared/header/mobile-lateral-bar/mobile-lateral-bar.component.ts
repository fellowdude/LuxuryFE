import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
// import { InternalService } from '../../../services/internal.service';
import { Subscription } from 'rxjs';
import { IMobileLateralComplexItem } from '../../../models/header.model';
import { IMobileLateralComponent } from '../../../models/header.model';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ProfileComponent } from 'src/app/modals/account/profile/profile.component';
import { IUserInfo } from 'src/app/models/profile.model';
import { ProfileService } from 'src/app/services/profile.service';
import { MenuName } from '../header.component';
import { MyAddressesComponent } from 'src/app/modals/account/my-addresses/my-addresses.component';
import { RateExperienceComponent } from 'src/app/modals/account/rate-experience/rate-experience.component';
import { OrderHistoryComponent } from 'src/app/modals/account/order-history/order-history.component';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { ContactComponent } from 'src/app/modals/contact/contact.component';
import { WishlistComponent } from 'src/app/modals/shopping/wishlist/wishlist.component';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-mobile-lateral-bar',
  templateUrl: './mobile-lateral-bar.component.html',
  styleUrls: ['./mobile-lateral-bar.component.scss'],
})
export class MobileLateralBarComponent implements OnInit {
  actualconfig: IMobileLateralComplexItem[];
  visible = false;
  wishlistSize: number;
  userInfo: IUserInfo;
  // internalSubscription: Subscription;
  modalRef: MDBModalRef;
  @Input() config: IMobileLateralComponent;
  @Output() onClose = new EventEmitter<MenuName.LATERAL_BAR>();

  constructor(
    private router: Router,
    // private internalService: InternalService,
    private modalService: MDBModalService,
    private profileService: ProfileService,
    private loginService: LoginService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.profileService.getProfile().subscribe((res) => {
      this.userInfo = {
        _id: res._id,
        birth_date: res.birth_date,
        dni: res.dni,
        email: res.email,
        last_name_father: res.last_name_father,
        last_name_mother: res.last_name_mother,
        name: res.name,
        number_card: res.number_card,
        number_document: res.number_document,
        phone: res.phone,
        suffix: res.suffix,
        type_document: res.type_document,
        username: res.username,
      };
    });

    this.amountWishlist();
  }

  amountWishlist() {
    this.wishlistSize = 0;
    this.wishlistService
      .getTotalWishlist()
      .pipe()
      .subscribe((response: any) => {
        this.wishlistSize = response?.wishlist || 0;
      });
  }

  showUser(): void {
    this.closeLateralBar();
    this.modalRef = this.modalService.show(ProfileComponent, {
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
        canBack: false,
      },
    });
  }

  showAddresses(): void {
    this.closeLateralBar();
    this.modalRef = this.modalService.show(MyAddressesComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-full-height modal-right mh-100 my-0',
      containerClass: 'right modal-dialog-scrollable mh-100 my-0',
      animated: true,
      data: {
        canBack: false,
      },
    });
  }

  showRateExperience(): void {
    this.closeLateralBar();
    this.modalRef = this.modalService.show(RateExperienceComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-full-height modal-right mh-100 my-0',
      containerClass: 'right modal-dialog-scrollable mh-100 my-0',
      animated: true,
      data: {
        canBack: false,
      },
    });
  }

  showOrderHistory(): void {
    this.closeLateralBar();
    this.modalRef = this.modalService.show(OrderHistoryComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-full-height modal-right mh-100 my-0',
      containerClass: 'right modal-dialog-scrollable mh-100 my-0',
      animated: true,
      data: {
        canBack: false,
      },
    });
  }

  showContact(): void {
    this.closeLateralBar();
    this.modalRef = this.modalService.show(ContactComponent, {
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

  showWishlist(): void {
    this.closeLateralBar();
    this.modalRef = this.modalService.show(WishlistComponent, {
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

  // showBar() {
  //   this.visible = true;
  // }

  // hideBar() {
  //   this.visible = false;
  // }

  logout() {
    this.closeLateralBar();
    this.loginService.logout().subscribe((res) => {
      localStorage.removeItem('jwt');
      this.router.navigate(['/ingreso']);
    });
  }

  goToFAQ(): void {
    this.closeLateralBar();
    this.router.navigate(['/informacion/preguntas_frecuentes']);
  }

  goToBook(): void {
    this.closeLateralBar();
    this.router.navigate(['/informacion/libro_de_reclamaciones']);
  }

  goToTerms(): void {
    this.closeLateralBar();
    this.router.navigate(['/informacion/terminos_y_condiciones']);
  }

  goToPolitics(): void {
    this.closeLateralBar();
    this.router.navigate(['/informacion/politicas_de_privacidad']);
  }

  closeLateralBar(): void {
    this.onClose.emit(MenuName.LATERAL_BAR);
  }
}
