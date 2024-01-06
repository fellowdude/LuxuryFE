import { BlurMenuHeaderComponent } from './blur-menu-header/blur-menu-header.component';
import { CarouselLoginRegisterComponent } from './carousel-login-register/carousel-login-register.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderLoginComponent } from './header-login/header-login.component';
import {
  InputsModule,
  CheckboxModule,
  ButtonsModule,
  IconsModule,
} from 'angular-bootstrap-md';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginRegisterButtonsComponent } from './login-register-buttons/login-register-buttons.component';
import { LoginRegisterPageComponent } from './login-register-page/login-register-page.component';
import { MicroModule } from '../../micro/micro.module';
import { NewPasswordComponent } from './new-password/new-password.component';
import { NewPasswordFormComponent } from './new-password/new-password-form/new-password-form.component';
import { NgModule } from '@angular/core';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { PasswordRecoveryFormComponent } from './password-recovery/password-recovery-form/password-recovery-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { UserRecoveryComponent } from './user-recovery/user-recovery.component';
import { UserRecoveryFormComponent } from './user-recovery/user-recovery-form/user-recovery-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalsModule } from 'src/app/modals/modals.module';
import { RecoverMemberCardComponent } from 'src/app/modals/register/recover-member-card/recover-member-card.component';
import { NewMemberCardFormComponent } from 'src/app/modals/register/new-member-card-form/new-member-card-form.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';

const lyrRoutes: Routes = [
  { path: '', redirectTo: '/ingreso/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'nueva-contrasena/:sjwt', component: NewPasswordComponent },
  { path: 'recuperar-contrasena', component: PasswordRecoveryComponent },
  { path: 'recuperar-usuario', component: UserRecoveryComponent },
  { path: 'registro', component: RegisterPageComponent },
];

@NgModule({
  declarations: [
    BlurMenuHeaderComponent,
    CarouselLoginRegisterComponent,
    HeaderLoginComponent,
    LoginFormComponent,
    LoginPageComponent,
    LoginRegisterButtonsComponent,
    LoginRegisterPageComponent,
    NewPasswordComponent,
    NewPasswordFormComponent,
    PasswordRecoveryComponent,
    PasswordRecoveryFormComponent,
    RegisterFormComponent,
    RegisterPageComponent,
    UserRecoveryComponent,
    UserRecoveryFormComponent,
  ],
  imports: [
    ButtonsModule,
    CarouselModule,
    CheckboxModule,
    CommonModule,
    DirectivesModule,
    FormsModule,
    IconsModule,
    InputsModule,
    MicroModule,
    ReactiveFormsModule,
    ModalsModule,
    RouterModule.forChild(lyrRoutes),
    SwiperModule,
    SharedModule,
    LazyLoadImageModule
  ],
  entryComponents: [RecoverMemberCardComponent, NewMemberCardFormComponent]
})
export class LoginAndRegisterModule {}
