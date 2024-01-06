import { Component, Input, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { IBrandCarouselItem } from 'src/app/models/brands-carousel.model';

@Component({
  selector: 'app-brands-carousel-secondary',
  templateUrl: './brands-carousel-secondary.component.html',
  styleUrls: ['./brands-carousel-secondary.component.scss'],
})
export class BrandsCarouselSecondaryComponent implements OnInit {
  @Input() items: IBrandCarouselItem[];
  swiperConfig: SwiperConfigInterface;

  constructor() {}

  ngOnInit(): void {
    this.swiperConfig = {
      direction: 'horizontal',
      slidesPerView: 1,
      autoplay: {
        delay: 2000,
        reverseDirection: false,
        disableOnInteraction: false,
      },
      spaceBetween: 20,
      breakpoints: {
        576: {
          slidesPerView: 1,
        },
        1024: {
          slidesPerView: 2,
        },
        1300: {
          slidesPerView: 3,
        },
        1500: {
          slidesPerView: 4,
        },
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    };
  }
}
