import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ICarouselBanner } from 'src/app/models/carousel-banner.model';

@Component({
  selector: 'app-ad-carousel-banner',
  templateUrl: './ad-carousel-banner.component.html',
  styleUrls: ['./ad-carousel-banner.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdCarouselBannerComponent implements OnInit {
  @Input() config: ICarouselBanner;
  @Input() type: 'horizontal' | 'vertical' = 'horizontal';
  constructor() {}

  ngOnInit(): void {}
}
