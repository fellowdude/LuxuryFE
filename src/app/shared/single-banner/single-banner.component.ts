import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-banner',
  templateUrl: './single-banner.component.html',
  styleUrls: ['./single-banner.component.scss'],
})
export class SingleBannerComponent implements OnInit {
  @Input() desktopBanner: string;
  @Input() mobileBanner: string;
  @Input() title: string;
  @Input() isGradient: boolean = false;
  @Input() subtitle: string;
  constructor() {}

  ngOnInit(): void {
  }
}
