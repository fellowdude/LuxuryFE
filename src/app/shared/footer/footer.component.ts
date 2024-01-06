import { Component, OnInit } from '@angular/core';
import { IFooterDataGeneral } from 'src/app/models/footer.model';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Router } from '@angular/router';
import { MenuAccountComponent } from 'src/app/modals/account/menu-account/menu-account.component';
import { LoginService } from 'src/app/services/login.service';
import { FooterInformationService } from 'src/app/services/footer-information.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  logged: boolean = false;
  footerData: IFooterDataGeneral;
  modalRef: MDBModalRef;

  constructor(
    private footerInformationService: FooterInformationService,
    private loginService: LoginService,
    private modalService: MDBModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.footerData = this.footerInformationService.footerDataList;
  }

  showUser() {
    this.modalRef = this.modalService.show(MenuAccountComponent, {
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

  logout() {
    this.loginService.logout().subscribe((res) => {
      localStorage.removeItem('jwt');
      localStorage.removeItem('user');
      this.router.navigate(['/ingreso']);
    });
  }
}
