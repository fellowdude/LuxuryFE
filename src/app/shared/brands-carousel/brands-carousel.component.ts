import { Component, Input, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { IBrandCarouselItem } from 'src/app/models/brands-carousel.model';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-brands-carousel',
  templateUrl: './brands-carousel.component.html',
  styleUrls: ['./brands-carousel.component.scss'],
  styles: [],
})
export class BrandsCarouselComponent implements OnInit {
  @Input() items: IBrandCarouselItem[];
  @Input() arrowsInside!: boolean;
  @Input() greyscale: boolean = false;
  @Input() setHeight: boolean = false;
  swiperConfig: SwiperConfigInterface;
  customOptions: OwlOptions;

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
      breakpoints: {
        342: {
          slidesPerView: 1,
        },
        535: {
          slidesPerView: this.arrowsInside ? 2 : 3,
        },
        768: {
          slidesPerView: this.arrowsInside ? 3 : 4,
        },
        992: {
          slidesPerView: this.arrowsInside ? 3 : 5,
        },
        1200: {
          slidesPerView: this.arrowsInside ? 4 : 5,
        },
        1400: {
          slidesPerView: this.arrowsInside ? 5 : 6,
        },
      },
      navigation: {
        nextEl: this.arrowsInside ? '.swiper-button-next' : '.next-btn',
        prevEl: this.arrowsInside ? '.swiper-button-prev' : '.prev-btn',
      },
    };
    this.customOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: false,
      navSpeed: 500,
      navText: ['', ''],
      autoplay: true,
      autoplayTimeout: 1500,
      autoplaySpeed: 500,
      autoplayHoverPause: false,
      margin: 20,
      responsive: {
        0: {
          items: 4,
        },
        992: {
          items: this.arrowsInside ? 4 : 5,
        },
        1200: {
          items: this.arrowsInside ? 5 : 9,
        },
      },
      nav: false,
      autoHeight: true,
    };
  }
}
