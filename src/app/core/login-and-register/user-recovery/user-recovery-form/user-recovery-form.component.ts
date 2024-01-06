import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as KJUR from 'jsrsasign';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/constants';
import { ILdV } from 'src/app/models/ldv.model';
import { LdvService } from 'src/app/services/ldv.service';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-user-recovery-form',
  templateUrl: './user-recovery-form.component.html',
  styleUrls: ['./user-recovery-form.component.scss'],
})
export class UserRecoveryFormComponent implements OnInit {
  recoveryForm: FormGroup;
  typeDocList: Array<ILdV> = [];
  userRecoveryEmail: string = null;
  requested: boolean = false;

  constructor(
    private loginService: LoginService,
    private ldVService: LdvService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.recoveryForm = new FormGroup({
      type_document: new FormControl(null, [Validators.required]),
      document: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12),
      ]),
    });

    this.ldVService
      .getLdvDetail('TYPE-DOCUMENT-CUSTOMER')
      .subscribe((docResponse: Array<any>) => {
        this.typeDocList = docResponse;
        this.recoveryForm.get('type_document').setValue(this.typeDocList?.[0]?._id);
      })

  }

  @HostListener('document:keypress', ['$event']) onKeyPressHandler(
    event: KeyboardEvent
  ): void {
    if (event.code == 'Enter' && this.recoveryForm.valid) {
      this.requestUser();
    }
  }

  requestUser(): void {
    const oHeader = { alg: 'RS256', typ: 'JWT' };
    const oPayload: any = {};
    oPayload.type_document = this.recoveryForm.value.type_document as String;
    oPayload.document = this.recoveryForm.value.document as String;
    const sHeader = JSON.stringify(oHeader);
    const sPayload = JSON.stringify(oPayload);
    const sJWT = KJUR.jws.JWS.sign(
      'RS256',
      sHeader,
      sPayload,
      Constants.FRONT_KEY
    );

    this.loginService.recoverUser({ jwt: sJWT }).subscribe(
      (result: any) => {
        this.requested = true;
        this.recoveryForm.reset();
        if (result?.email_recovery && result?.email_recovery !== '') {
          this.userRecoveryEmail = result.email_recovery
        }
      }, (error: any)=>{
        this.requested = true;
        this.userRecoveryEmail = null;
      }
    );
  }

  retry(): void {
    this.requested = false;
  }
}
