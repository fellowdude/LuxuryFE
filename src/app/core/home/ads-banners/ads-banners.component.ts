import { Component, Input, OnInit } from '@angular/core';
import { ICarouselBanner } from 'src/app/models/carousel-banner.model';

@Component({
  selector: 'app-ads-banners',
  templateUrl: './ads-banners.component.html',
  styleUrls: ['./ads-banners.component.scss'],
})
export class AdsBannersComponent implements OnInit {
  @Input() horizontalBanners: ICarouselBanner;
  @Input() topLeftBanners: ICarouselBanner;
  @Input() bottomLeftBanners: ICarouselBanner;
  @Input() verticalBanners: ICarouselBanner;

  constructor() {}

  ngOnInit(): void {}
}
