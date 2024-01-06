import { storiesOf, moduleMetadata } from '@storybook/angular';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LoginAndRegisterModule } from '../app/core/login-and-register/login-and-register.module';

import { LoginComponent } from '../app/core/login-and-register/login/login.component';
import { RegisterComponent } from '../app/core/login-and-register/register/register.component';
import { HeaderLoginComponent } from '../app/core/login-and-register/header-login/header-login.component';
import { UserRecoveryComponent } from '../app/core/login-and-register/user-recovery/user-recovery.component';
import { PasswordRecoveryComponent } from '../app/core/login-and-register/password-recovery/password-recovery.component';

import { APP_BASE_HREF } from '@angular/common';
import { BlurMenuHeaderComponent } from 'src/app/core/login-and-register/blur-menu-header/blur-menu-header.component';
import { LoginFormComponent } from 'src/app/core/login-and-register/login-form/login-form.component';
import { CarouselLoginRegisterComponent } from 'src/app/core/login-and-register/carousel-login-register/carousel-login-register.component';
import { LoginRegisterPageComponent } from 'src/app/core/login-and-register/login-register-page/login-register-page.component';
import {LoginPageComponent} from 'src/app/core/login-and-register/login-page/login-page.component';
import {RegisterPageComponent} from 'src/app/core/login-and-register/register-page/register-page.component';

const card = storiesOf('Core/Login-Register', module).addDecorator(
  moduleMetadata({
    imports: [
      LoginAndRegisterModule,
      HttpClientModule,
      RouterModule.forRoot(
        [
          {
            path: '',
            loadChildren: () =>
              import(
                '../app/core/login-and-register/login-and-register.module'
              ).then((m) => m.LoginAndRegisterModule),
          },
        ],
        { useHash: true }
      ),
    ],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  })
);

card.add('Header', () => {
  return {
    component: HeaderLoginComponent,
    props: {},
  };
});

card.add('Login', () => {
  return {
    component: LoginComponent,
    props: {},
  };
});

card.add('Register', () => {
  return {
    component: RegisterComponent,
    props: {},
  };
});

card.add('UserRecovery', () => {
  return {
    component: UserRecoveryComponent,
    props: {},
  };
});

card.add('PasswordRecovery', () => {
  return {
    component: PasswordRecoveryComponent,
    props: {},
  };
});

// News Components
card.add('BlurMenuHeader', () => {
  return {
    component: BlurMenuHeaderComponent,
  };
});

card.add('LoginForm', () => {
  return {
    component: LoginFormComponent,
  };
});

card.add('CarouselLoginRegister', () => {
  return {
    component: CarouselLoginRegisterComponent,
  };
});

card.add('LoginRegisterPage', () => {
  return {
    component: LoginRegisterPageComponent,
  };
});

card.add('LoginPage', () => {
	return {
		component: LoginPageComponent
	}
})

card.add('RegisterPage', () => {
	return {
		component: RegisterPageComponent
	}
})
