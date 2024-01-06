import { ADDRESS_FORM_TOKEN } from '../address-form/address-form';
import { Component, Inject, OnInit } from '@angular/core';
import { IAddressItem } from 'src/app/models/address.model';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { MENU_ACCOUNT_TOKEN } from '../menu-account/menu-account';
import { ProfileService } from 'src/app/services/profile.service';
import { zip } from 'rxjs';

@Component({
  selector: 'app-my-addresses',
  templateUrl: './my-addresses.component.html',
  styleUrls: ['./my-addresses.component.scss'],
})
export class MyAddressesComponent implements OnInit {
  addressList: Array<IAddressItem> = [];
  canBack: boolean = true;
  availableAddresses: any = [];

  constructor(
    @Inject(ADDRESS_FORM_TOKEN) private addressFormToken: any,
    @Inject(MENU_ACCOUNT_TOKEN) private menuAccountComponent: any,
    private modalRef: MDBModalRef,
    private modalService: MDBModalService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    zip(
      this.profileService.getAddresses(),
      this.profileService.getAvailableAddresses()
    ).subscribe(([res1, res2]) => {
      this.addressList = res1;
      this.availableAddresses = res2;
    });
  }

  closeModal(): void {
    this.modalRef.hide();
  }

  returnModal(): void {
    this.closeModal();
    this.modalRef = this.modalService.show(this.menuAccountComponent, {
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

  changeChecked(position): void {
    this.closeModal();
    this.modalRef = this.modalService.show(this.addressFormToken, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-full-height modal-right mh-100 my-0',
      containerClass: 'right modal-dialog-scrollable mh-100 my-0',
      animated: true,
      data: {
        address: this.addressList[position],
      },
    });
  }

  addNewAddress(): void {
    this.closeModal();
    this.modalRef = this.modalService.show(this.addressFormToken, {
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
}
