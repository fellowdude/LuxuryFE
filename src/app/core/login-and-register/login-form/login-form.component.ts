import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Constants } from 'src/app/constants';
import { LoginService } from 'src/app/services/login.service';
import { KJUR } from 'jsrsasign';
import { Router } from '@angular/router';
import { ToastrControllerService } from 'src/app/services/internal/toastr-controller.service';
import { Messages } from 'src/app/messages';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  loadingLogin: boolean = false;

  @HostListener('document:keypress', ['$event']) onKeyPressHandler(event: KeyboardEvent) {
    if (event.code == 'Enter') {
      this.login();
    }
  }

  constructor(private loginService: LoginService, private route: Router, private toastrService: ToastrControllerService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      keepLogged: new FormControl(true),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });

    if(localStorage.getItem('user')){
      this.loginForm.get('email').setValue(localStorage.getItem('user'));
    }
  }

  login(): void {
    if(event){
      this.loadingLogin = true;
    }

    if(this.loginForm.valid){
      const oHeader = { alg: 'RS256', typ: 'JWT' };
      // Payload
      const oPayload: any = {};
      oPayload.user = (this.loginForm.value.email as String).toLowerCase();
      oPayload.password = this.loginForm.value.password;
      oPayload.keep_logged = this.loginForm.value.keepLogged;
      const sHeader = JSON.stringify(oHeader);
      const sPayload = JSON.stringify(oPayload);
      const sJWT = KJUR.jws.JWS.sign(
        'RS256',
        sHeader,
        sPayload,
        Constants.FRONT_KEY
      );

      this.loginService.login({ jwt: sJWT }).subscribe((result: any) => {
        if(this.loginForm.get('keepLogged').value){
          localStorage.setItem('user', (this.loginForm.value.email as String).toLowerCase());
        }else{
          localStorage.removeItem('user');
        }
        localStorage.setItem('jwt', result.jwt);
        this.loadingLogin = false;
        this.toastrService.successToastr(Messages.successLogIn ,Messages.logInTitle)
        /* this.toastrService.success(
          Messages.successLogIn,
          Messages.logInTitle
        ); */
        this.route.navigate(['/inicio'])
      }, (error)=>{
        this.loadingLogin = false;
      });
    }
  }
}
