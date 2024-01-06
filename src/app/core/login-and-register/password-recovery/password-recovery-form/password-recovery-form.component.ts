import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Constants } from 'src/app/constants';
import * as KJUR from 'jsrsasign';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { ToastrControllerService } from 'src/app/services/internal/toastr-controller.service';
import { Messages } from 'src/app/messages';

@Component({
  selector: 'app-password-recovery-form',
  templateUrl: './password-recovery-form.component.html',
  styleUrls: ['./password-recovery-form.component.scss']
})
export class PasswordRecoveryFormComponent implements OnInit {

  recoveryForm: FormGroup;
  loading: boolean = false;

  constructor(private loginService: LoginService, private router: Router, private toastrService: ToastrControllerService) { }

  ngOnInit(): void {
    this.recoveryForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  @HostListener('document:keypress', ['$event']) onKeyPressHandler(
    event: KeyboardEvent
  ): void {
    if (event.code == 'Enter' && this.recoveryForm.valid) {
      this.requestPassword();
    }
  }

  requestPassword(): void {
    this.loading = true;
    const oHeader = { alg: 'RS256', typ: 'JWT' };
    // Payload
    const oPayload: any = {};
    oPayload.email = (this.recoveryForm.value.email as String).toLowerCase();
    const sHeader = JSON.stringify(oHeader);
    const sPayload = JSON.stringify(oPayload);
    const sJWT = KJUR.jws.JWS.sign('RS256', sHeader, sPayload, Constants.FRONT_KEY);

    this.loginService.sendMailPasswordRecovery(sJWT).subscribe(() => {
      this.recoveryForm.reset();
      this.toastrService.successToastr(Messages.successPasswordRecovery, Messages.successTitle);
      this.loading = false;
      this.router.navigate(['/ingreso']);
    },()=>{
      this.loading = false;
      this.toastrService.warningToastr(Messages.warningPasswordRecovery, Messages.warningTitle);
    });
  }
}
