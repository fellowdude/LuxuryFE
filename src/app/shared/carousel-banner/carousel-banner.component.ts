import { Component, Input, OnInit } from '@angular/core';
import { ICarouselBanner } from 'src/app/models/carousel-banner.model';
import {RedirectService} from 'src/app/services/redirect.service';

@Component({
  selector: 'app-carousel-banner',
  templateUrl: './carousel-banner.component.html',
  styleUrls: ['./carousel-banner.component.scss'],
})
export class CarouselBannerComponent implements OnInit {
  @Input() config: ICarouselBanner;

	constructor(public redirectService: RedirectService) {}

  ngOnInit() {}
}
