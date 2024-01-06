import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { GtagModule } from './gtag/gtag.module';
import { Constants } from './constants';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-PE';
registerLocaleData(localeEs);

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    SharedModule,
    ToastrModule.forRoot({
      newestOnTop: true,
      closeButton: true,
      preventDuplicates: true,
      maxOpened: 2,
    }),
    GtagModule.init({
      targetId: Constants.GTAG
    })
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "es-PE"
    },
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
    },
  ],
})
export class AppModule {}
