import { Component, Input, OnInit } from '@angular/core';
import { ICarouselImage } from 'src/app/models/carousel-banner.model';

@Component({
  selector: 'app-carousel-banner-item',
  templateUrl: './carousel-banner-item.component.html',
  styleUrls: ['./carousel-banner-item.component.scss']
})
export class CarouselBannerItemComponent implements OnInit {
  @Input() slide:ICarouselImage;
  constructor() { }

  ngOnInit(): void {
  }

}
