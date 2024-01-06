import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import * as KJUR from 'jsrsasign';
import { Constants } from 'src/app/constants';

@Component({
  selector: 'app-new-password-form',
  templateUrl: './new-password-form.component.html',
  styleUrls: ['./new-password-form.component.scss']
})
export class NewPasswordFormComponent implements OnInit {
  passwordForm: FormGroup;
  temporalJWT: any;
  loading: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.passwordForm = new FormGroup({
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repeatPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
    this.temporalJWT = this.activatedRoute.snapshot.params['sjwt'];
  }

  @HostListener('document:keypress', ['$event']) onKeyPressHandler(event: KeyboardEvent): void {
    if (event.code == 'Enter' && this.passwordForm.valid) {
      this.sendPassword();
    }
  }

  sendPassword(): void {
    const oHeader = { alg: 'RS256', typ: 'JWT' };
      // Payload
      const oPayload: any = {};
      // oPayload.user = this.loginForm.value.user;
      oPayload.new_password = this.passwordForm.controls.newPassword.value;
      const sHeader = JSON.stringify(oHeader);
      const sPayload = JSON.stringify(oPayload);
      const sJWT = KJUR.jws.JWS.sign('RS256', sHeader, sPayload, Constants.FRONT_KEY);
      this.loginService.recoverPassword(this.temporalJWT, sJWT).subscribe((res) => {
        this.passwordForm.reset();
        this.router.navigate(['/ingreso']);
      });
  }
}
