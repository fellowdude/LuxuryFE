import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
  NgForm,
  ValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from 'src/app/constants';
import { RegisterService } from 'src/app/services/register.service';
import { KJUR } from 'jsrsasign';
import { LoginService } from 'src/app/services/login.service';
import { LdvService } from 'src/app/services/ldv.service';
import { ILdV } from 'src/app/models/ldv.model';
import { ToastrControllerService } from 'src/app/services/internal/toastr-controller.service';
import { Messages } from 'src/app/messages';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { RecoverMemberCardComponent } from 'src/app/modals/register/recover-member-card/recover-member-card.component';


const customEmailValidator: ValidatorFn = (fg: FormGroup) => {
  const email = fg.get('email').value;
  const confirmation = fg.get('email_confirm').value;
  if(email !== confirmation && confirmation){
    fg.get('email_confirm').setErrors({'incorrect': true});
    return { 'customEmailValidator': true };
  }else{
    fg.get('email_confirm').setErrors(null);
    fg.get('email').setErrors(null);
    return null;
  }
};

const customPasswordValidator: ValidatorFn = (fg: FormGroup) => {
  const password = fg.get('password').value;
  const rpassword = fg.get('confirm_password').value;
  if(password !== rpassword && rpassword){
    fg.get('confirm_password').setErrors({'incorrect': true});
    fg.get('password').setErrors({'incorrect': true});
    return { 'customPasswordValidator': true };
  }else{
    fg.get('confirm_password').setErrors(null);
    fg.get('password').setErrors(null);
    return null;
  }
};

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;
  loadingRegister: boolean = false;
  maxDate: Date;
  typeDocList: Array<ILdV> = [];
  typeSuffixList: Array<ILdV> = [];
  modalRef: MDBModalRef;

  constructor(
    private toastrService: ToastrControllerService,
    private registerService: RegisterService,
    private loginService: LoginService,
    private listOfValuesService: LdvService,
    private modalService: MDBModalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        number_card: new FormControl(null, [
          Validators.required,
          Validators.min(0),
        ]),
        password: new FormControl(null, Validators.required),
        confirm_password: new FormControl(null, Validators.required),
        suffix: new FormControl(null, Validators.required),
        name: new FormControl(null, Validators.required),
        last_name_father: new FormControl(null, Validators.required),
        last_name_mother: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        email_confirm: new FormControl(null, [
          Validators.required,
          Validators.email,
        ]),
        phone: new FormControl(null, [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(9),
        ]),
        type_document: new FormControl(null, [Validators.required]),
        number_document: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
        ]),
        birth_date: new FormControl(null, [Validators.required]),
        check_terms: new FormControl(false, [Validators.requiredTrue]),
        check_age: new FormControl(false, [Validators.requiredTrue]),
      },
      { validators: [customEmailValidator, customPasswordValidator] }
    );
    this.loadingRegister = true;
    this.listOfValuesService
      .getLdvDetail('TYPE-DOCUMENT-CUSTOMER')
      .subscribe((docResponse: Array<ILdV>) => {
        this.typeDocList = docResponse;
        this.listOfValuesService
          .getLdvDetail('TYPE-SUFFIX')
          .subscribe((suffixResponse: Array<ILdV>) => {
            this.typeSuffixList = suffixResponse;
            this.loadingRegister = false;
            this.registerForm.get('type_document').setValue(this.typeDocList?.[0]?._id);
          });
      });

    var today = new Date();
    this.maxDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );
  }

  onFocusDate(event: any) {
    event.target.type = 'date';
  }

  // If the input has value keeps his type in date, else his type changes to text - To adapt to the mdbInput style
  onBlurDate(event: any) {
    const type = event.target.value.length ? 'date' : 'text';
    event.target.type = type;
  }

  formatDate(date: Date) {
    const day =
      date.getDate() / 10 >= 1 ? date.getDate() : '0' + date.getDate();
    const month =
      (date.getMonth() + 1) / 10 >= 1
        ? date.getMonth() + 1
        : '0' + (date.getMonth() + 1);
    const year = date.getFullYear();
    return [year, month, day].join('-');
  }

  setMinDateTo18YearsOld() {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 18);
    return this.formatDate(d);
  }

  register() {
    if (
      this.registerForm.valid &&
      this.registerForm.controls['password'].value ===
        this.registerForm.controls['confirm_password'].value &&
      this.registerForm.controls['email'].value ===
        this.registerForm.controls['email_confirm'].value
    ) {
      const toSend = {
        ...this.registerForm.value,
        username: this.registerForm.controls['email'].value,
        number_card: this.registerForm.controls['number_card'].value.toString(),
      };
      this.loadingRegister = true;
      this.registerService.registerUser(toSend).subscribe(
        (response: any) => {
          this.logIn();
        },
        (error) => {
          this.loadingRegister = false;
        }
      );
    } else {
      if (
        this.registerForm.controls['password'].value !==
          this.registerForm.controls['confirm_password'].value ||
        !this.registerForm.controls['check_terms'].value
      ) {
        if (
          this.registerForm.controls['password'].value !==
          this.registerForm.controls['confirm_password'].value
        ) {
          // PASSWORDS NO MATCH
          this.toastrService.warningToastr(
            Messages.warningDifferentPasswords,
            Messages.warningTitle
          );
        } else {
          this.toastrService.warningToastr(
            Messages.warningNoPolitics,
            Messages.warningTitle
          );
        }
      } else {
        this.toastrService.warningToastr(
          Messages.warningInvalidForm,
          Messages.warningTitle
        );
      }
    }
  }

  logIn(): void {
    const oHeader = { alg: 'RS256', typ: 'JWT' };
    const oPayload: any = {};
    oPayload.user = (this.registerForm.value.email as String).toLowerCase();
    oPayload.password = this.registerForm.value.password;
    const sHeader = JSON.stringify(oHeader);
    const sPayload = JSON.stringify(oPayload);
    const sJWT = KJUR.jws.JWS.sign(
      'RS256',
      sHeader,
      sPayload,
      Constants.FRONT_KEY
    );

    this.loginService.login({ jwt: sJWT }).subscribe(
      (result: any) => {
        localStorage.removeItem('user');
        localStorage.setItem('jwt', result.jwt);
        this.loadingRegister = false;
        this.router.navigate(['/inicio']);
        this.toastrService.successToastr(
          Messages.successUserRegister,
          Messages.registerTitle
        );
      },
      (error) => {
        this.loadingRegister = false;
      }
    );
  }

  openRememberNumberForm(): void {
    this.modalRef = this.modalService.show(RecoverMemberCardComponent, {
      animated: true,
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      class:
        'modal-information modal-dialog modal-dialog-centered mw-popup-container remember-modal',
      containerClass: 'modal fade d-flex justify-content-center d-md-block',
      ignoreBackdropClick: false,
    });
    this.modalRef.content.action?.subscribe((result) => {
      if (result) this.registerForm.get('number_card').setValue(result);
    });
  }
}
