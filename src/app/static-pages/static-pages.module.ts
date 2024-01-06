import { AboutUsComponent } from './about-us/about-us.component';
import { AboutUsResolver } from '../resolvers/static-pages/about-us.resolver';
import { CommonModule } from '@angular/common';
import { ComplaintsBookComponent } from './complaints-book/complaints-book.component';
import { ComplaintsBookResolver } from '../resolvers/static-pages/complaints-book.resolver';
import { DirectivesModule } from '../directives/directives.module';
import { FaqResolver } from '../resolvers/static-pages/faq.resolver';
import { FrequentlyQuestionsComponent } from './frequently-questions/frequently-questions.component';
import {
  InputsModule,
  CheckboxModule,
  ButtonsModule,
} from 'angular-bootstrap-md';
import { MicroModule } from '../micro/micro.module';
import { NgModule } from '@angular/core';
import { PrivacyPoliciesComponent } from './privacy-policies/privacy-policies.component';
import { PrivacyPoliciesResolver } from '../resolvers/static-pages/privacy-policies.resolver';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { SharedModule } from '../shared/shared.module';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { TermsAndConditionsResolver } from '../resolvers/static-pages/terms-and-conditions.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/inicio',
  },
  {
    path: 'preguntas_frecuentes',
    pathMatch: 'full',
    component: FrequentlyQuestionsComponent,
    resolve: { resolve: FaqResolver },
  },
  {
    path: 'nosotros',
    pathMatch: 'full',
    component: AboutUsComponent,
    resolve: { resolve: AboutUsResolver },
  },
  {
    path: 'terminos_y_condiciones',
    pathMatch: 'full',
    component: TermsAndConditionsComponent,
    resolve: { resolve: TermsAndConditionsResolver },
  },
  {
    path: 'politicas_de_privacidad',
    pathMatch: 'full',
    component: PrivacyPoliciesComponent,
    resolve: { resolve: PrivacyPoliciesResolver },
  },
  {
    path: 'libro_de_reclamaciones',
    pathMatch: 'full',
    component: ComplaintsBookComponent,
    resolve: { resolve: ComplaintsBookResolver },
  },
  {
    path: '**',
    redirectTo: '/not-found',
  },
];

@NgModule({
  declarations: [
    AboutUsComponent,
    ComplaintsBookComponent,
    FrequentlyQuestionsComponent,
    PrivacyPoliciesComponent,
    SafeHtmlPipe,
    TermsAndConditionsComponent,
  ],
  imports: [
    ButtonsModule,
    CheckboxModule,
    CommonModule,
    DirectivesModule,
    InputsModule,
    MicroModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
})
export class StaticPagesModule {}
