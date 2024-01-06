import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITermsConditionPage } from 'src/app/models/terms-conditions.model';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss'],
})
export class TermsAndConditionsComponent implements OnInit {
  termsConditionPage: ITermsConditionPage;
  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.termsConditionPage = this.activeRoute.snapshot.data.resolve;
  }
}
