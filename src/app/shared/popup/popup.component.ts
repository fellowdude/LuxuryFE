import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MDBModalRef } from 'angular-bootstrap-md';
import { IPopup } from 'src/app/models/popup.model';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {
  @Input() popupData: IPopup;
  constructor(private modalRef: MDBModalRef, private router: Router) {}

  ngOnInit(): void {}

  closePopup(): void {
    this.modalRef.hide();
  }

  buttonRedirect(redirect: string): void {
    console.log(redirect)
    const { redirectURLDesktop, redirectURLMobile } = this.popupData;
    if (redirect.includes('www')) {
      const includesHttps = redirect.includes('https://');
      includesHttps
        ? window.open(redirect)
        : window.open('https://' + redirect);
    } else {
      this.router.navigate([redirect]);
    }
    this.closePopup();
  }
}
