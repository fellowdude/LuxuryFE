import { Component, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-home-advantages',
  templateUrl: './home-advantages.component.html',
  styleUrls: ['./home-advantages.component.scss']
})
export class HomeAdvantagesComponent implements OnInit {

  swiperConfig: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1.6,
    spaceBetween: 10,
    autoplay: {
      delay: 2000,
      reverseDirection: false,
      disableOnInteraction: false,
    },
    breakpoints: {
      576: {
        slidesPerView: 2.4
      }
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

}
