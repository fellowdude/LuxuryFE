import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAboutUsPage } from 'src/app/models/about-us.model';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
  styles: [
    `
      .p-container p {
        margin-bottom: 16px;
      }
      ,
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AboutUsComponent implements OnInit {
  aboutUsPage: IAboutUsPage;
  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.aboutUsPage = this.activeRoute.snapshot.data.resolve;
  }
}
