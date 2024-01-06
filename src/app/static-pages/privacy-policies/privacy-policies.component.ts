import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPrivacyPoliciesPage } from 'src/app/models/privacy-policies.model';

@Component({
  selector: 'app-privacy-policies',
  templateUrl: './privacy-policies.component.html',
  styleUrls: ['./privacy-policies.component.scss'],
})
export class PrivacyPoliciesComponent implements OnInit {
  privacyPoliciesPage: IPrivacyPoliciesPage;
  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.privacyPoliciesPage = this.activeRoute.snapshot.data.resolve;
  }
}
