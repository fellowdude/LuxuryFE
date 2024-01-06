import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ProfileService } from 'src/app/services/profile.service';
import * as KJUR from 'jsrsasign';
import { Constants } from 'src/app/constants';
import { IUserInfo } from 'src/app/models/profile.model';
import { MenuAccountComponent } from '../menu-account/menu-account.component';
import { MENU_ACCOUNT_TOKEN } from '../menu-account/menu-account';
import { Messages } from 'src/app/messages';
import { ToastrControllerService } from 'src/app/services/internal/toastr-controller.service';
import { ProfileTransformService } from 'src/app/services/internal/profile-transform.service';

const customPasswordValidator: ValidatorFn = (fg: FormGroup) => {
  const pass = fg.get('newPass').value;
  const rpass = fg.get('repPass').value;
  if(pass !== rpass && rpass){
    fg.get('repPass').setErrors({'incorrect': true});
    fg.get('newPass').setErrors({'incorrect': true});
    return { 'customPasswordValidator': true };
  }else{
    fg.get('repPass').setErrors(null);
    fg.get('newPass').setErrors(null);
    return null;
  }

};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userInfo: IUserInfo;
  suffixList: Array<any>;
  typeDocList: Array<any>;
  profileForm: FormGroup;
  passForm: FormGroup;
  canBack: boolean = true;
  loadingProfileUpdating: boolean = false;
  loadingPasswordUpdating: boolean = false;

  constructor(
    @Inject(MENU_ACCOUNT_TOKEN) private menuAccountComponent: any,
    private modalRef: MDBModalRef,
    private modalService: MDBModalService,
    private profileService: ProfileService,
    private profileTransformService: ProfileTransformService,
    private toastrService: ToastrControllerService
  ) {}

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      number_card: new FormControl(null),
      suffix: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      last_name_father: new FormControl('', [Validators.required]),
      last_name_mother: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(9),
      ]),
      birth_date: new FormControl('', [Validators.required]),
      type_document: new FormControl('', [Validators.required]),
      number_document: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(11),
      ]),
    });

    this.passForm = new FormGroup({
      oldPass: new FormControl(null, Validators.required),
      newPass: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      repPass: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    }, {validators: customPasswordValidator});

    this.getInitProfileInfo();
  }

  // Info received from the previous modal
  getInitProfileInfo(): void {
    this.profileForm.patchValue({
      ...this.userInfo,
      birth_date: this.userInfo.birth_date.slice(0, 10),
    });
    this.profileService.getSuffix().subscribe((suffixInfo) => {
      this.suffixList = suffixInfo;
      this.profileService.getDocType().subscribe((docInfo) => {
        this.typeDocList = docInfo;
      });
    });
  }

  getProfileInfo(): void {
    this.profileService.getProfile().subscribe((res) => {
      this.userInfo = this.profileTransformService.profileTransform(res);
      this.profileForm.reset({
        ...this.userInfo,
        birth_date: this.userInfo.birth_date.slice(0, 10),
      });
    });
  }

  updateProfileInfo(): void {
    if (this.profileForm.valid) {
      this.loadingProfileUpdating = true;
      this.profileService.updateProfile(this.profileForm.value).subscribe(
        (_) => {
          this.loadingProfileUpdating = false;
          this.toastrService.successToastr(
            Messages.successProfileUpdate,
            Messages.successTitle
          );
          this.getProfileInfo();
        },
        (_) => {
          this.loadingProfileUpdating = false;
        }
      );
    }
  }

  changePassword(): void {
    if (
      this.passForm.valid &&
      this.passForm.value['newPass'] == this.passForm.value['repPass']
    ) {
      const oHeader = { alg: 'RS256', typ: 'JWT' };
      const oPayload: any = {};
      oPayload.old_password = this.passForm.value['oldPass'];
      oPayload.new_password = this.passForm.value['newPass'];
      const sHeader = JSON.stringify(oHeader);
      const sPayload = JSON.stringify(oPayload);
      const sJWT = KJUR.jws.JWS.sign(
        'RS256',
        sHeader,
        sPayload,
        Constants.FRONT_KEY
      );

      this.loadingPasswordUpdating = true;
      this.profileService.changePassword(sJWT).subscribe(
        (res) => {
          this.loadingPasswordUpdating = false;
          this.toastrService.successToastr(
            Messages.successPassowrdUpdate,
            Messages.successTitle
          );
          this.passForm.reset();
        },
        (_) => {
          this.loadingPasswordUpdating = false;
        }
      );
    }
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
}
