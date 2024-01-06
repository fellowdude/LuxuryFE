import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { Messages } from 'src/app/messages';
import { IAddressItem } from 'src/app/models/address.model';
import { IModalContent } from 'src/app/models/confirmation.model';
import { ToastrControllerService } from 'src/app/services/internal/toastr-controller.service';
import { ProfileService } from 'src/app/services/profile.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';

import { MY_ADDRESSES_TOKEN } from '../my-addresses/my-addresses';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnInit, OnDestroy {
  isCheckout: boolean = false;
  address: IAddressItem;
  addressForm: FormGroup;
  action: Subject<any> = new Subject();

  typeAddressList: Array<any>;
  departmentsList: Array<any>;
  provinceList: Array<any>;
  districtList: Array<any>;

  loadingNewAddress: boolean = false;
  loadingAddressUpdating: boolean = false;
  loadingAddressDeleting: boolean = false;

  modalContent: IModalContent = {
    title: 'Confirmación',
    icon: 'exclamation',
    text: '¿Desea eliminar esta dirección?',
    type: 'warning',
  };

  constructor(
    private toastrService: ToastrControllerService,
    public modalRef: MDBModalRef,
    private profileService: ProfileService,
    private ubigeoService: UbigeoService,
    private modalService: MDBModalService,
    @Inject(MY_ADDRESSES_TOKEN) private myAddressesComponent: any
  ) {}

  ngOnInit(): void {
    this.addressForm = new FormGroup({
      name: new FormControl(null),
      type_address: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      department: new FormControl(null, [
        Validators.required,
        Validators.required,
      ]),
      province: new FormControl(null, [
        Validators.required,
        Validators.required,
      ]),
      district: new FormControl(null, [
        Validators.required,
        Validators.required,
      ]),
      reference: new FormControl(null, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      cellphone: new FormControl(null, [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(9),
      ]),
    });

    if (!this.address) this.onChanges();

    if (this.address) {
      this.addressForm.addControl(
        '_id',
        new FormControl(null, [Validators.required])
      );
      this.addressForm.patchValue(this.address);
    }
    this.profileService.getTypeAddress().subscribe((addressTypes) => {
      this.typeAddressList = addressTypes;
      this.address && this.typeAddressList.push(this.address.type_address);
      this.address &&
        this.addressForm.controls['type_address'].patchValue(
          this.address.type_address._id
        );
      this.ubigeoService.getDepartments().subscribe((departments) => {
        this.departmentsList = departments;
        this.address &&
          this.addressForm.controls['department'].patchValue(
            this.address.department._id
          );
        this.address &&
          this.ubigeoService
            .getProvincesByDepartment(this.address.department._id)
            .subscribe((provinces) => {
              this.provinceList = provinces;
              this.addressForm.controls['province'].patchValue(
                this.address.province._id
              );
              this.ubigeoService
                .getDistrictsByProvince(this.address.province._id)
                .subscribe((districts) => {
                  this.districtList = districts;
                  this.addressForm.controls['district'].patchValue(
                    this.address.district._id
                  );
                  this.onChanges();
                });
            });
      });
    });
  }

  ngOnDestroy(): void {
    this.action.unsubscribe();
  }

  onChanges() {
    this.addressForm.controls['department'].valueChanges.subscribe((change) => {
      this.ubigeoService
        .getProvincesByDepartment(change)
        .subscribe((provinces) => {
          this.provinceList = provinces;
          this.districtList = [];
          this.addressForm.controls['province'].patchValue(null);
          this.addressForm.controls['district'].patchValue(null);
        });
    });
    this.addressForm.controls['province'].valueChanges.subscribe((change) => {
      if (change) {
        this.ubigeoService
          .getDistrictsByProvince(change)
          .subscribe((districts) => {
            this.districtList = districts;
            this.addressForm.controls['district'].patchValue(null);
          });
      }
    });
  }

  addAddress(): void {
    if (this.addressForm.valid) {
      this.addressForm.controls['name'].setValue(
        this.typeAddressList.find((e) => {
          return e._id === this.addressForm.controls['type_address'].value;
        }).value
      );
      this.loadingNewAddress = true;
      this.profileService.saveAddress(this.addressForm.value).subscribe(
        (res) => {
          this.loadingNewAddress = false;
          this.toastrService.successToastr(
            Messages.successAddressAdd,
            Messages.successTitle
          );
          if (!this.isCheckout) {
            this.returnModal();
          } else {
            this.action.next(true);
            this.closeModal();
          }
        },
        (_) => {
          this.loadingNewAddress = false;
        }
      );
    }
  }

  updateAddres(): void {
    if (this.addressForm.valid) {
      this.loadingAddressUpdating = true;
      this.profileService
        .updateAddress(this.address._id, this.addressForm.value)
        .subscribe(
          (res) => {
            this.loadingAddressUpdating = false;
            this.toastrService.successToastr(
              Messages.successAddressUpdate,
              Messages.successTitle
            );
            this.returnModal();
          },
          (_) => {
            this.loadingAddressUpdating = false;
          }
        );
    }
  }

  deleteAddress(): void {
    this.loadingAddressDeleting = true;
    this.profileService.deleteAddress(this.address._id).subscribe(
      (res) => {
        this.loadingAddressDeleting = false;
        this.toastrService.successToastr(
          Messages.successAddressRemove,
          Messages.successTitle
        );
        this.returnModal();
      },
      (_) => {
        this.loadingAddressDeleting = false;
      }
    );
  }

  closeModal(): void {
    this.modalRef.hide();
  }

  returnModal(): void {
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
}
