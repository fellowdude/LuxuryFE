import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ILoginRegisterCarouselItem } from 'src/app/models/login-register-carousel';
import { CategoryGroupService } from 'src/app/services/category-group.service';
import { LoginRegisterCarouselService } from 'src/app/services/internal/login-register-carousel.service';

@Component({
  selector: 'app-carousel-login-register',
  templateUrl: './carousel-login-register.component.html',
  styleUrls: ['./carousel-login-register.component.scss'],
})
export class CarouselLoginRegisterComponent implements OnInit {
  @Input() items: ILoginRegisterCarouselItem[] = [
    {
      image: 'assets/images/login-carousel/11.jpg',
      text: null,
      title: null,
    },
    {
      image: 'assets/images/login-carousel/2w.jpeg',
      text: null,
      title: null,
    },
    {
      image: 'assets/images/login-carousel/2.jpg',
      text: null,
      title: null,
    },
    {
      image: 'assets/images/login-carousel/4.jpg',
      text: null,
      title: null,
    },
    {
      image: 'assets/images/login-carousel/5.jpg',
      text: null,
      title: null,
    },
  ];

  @Input() itemsMobile: ILoginRegisterCarouselItem[] = [
    {
      image: 'assets/images/login-carousel/1.jpg',
      text: null,
      title: null,
    },
    {
      image: 'assets/images/login-carousel/2.jpg',
      text: null,
      title: null,
    },
    {
      image: 'assets/images/login-carousel/3.jpg',
      text: null,
      title: null,
    },
    {
      image: 'assets/images/login-carousel/4.jpg',
      text: null,
      title: null,
    },
    {
      image: 'assets/images/login-carousel/5.jpg',
      text: null,
      title: null,
    },
  ];

  swiperConfig: SwiperConfigInterface = {
    direction: 'horizontal',
    spaceBetween: -1,
    loop: false,
    initialSlide: 0,
    slidesPerColumn: 1,
    autoplay: {
      delay: 3000,
      reverseDirection: false,
      disableOnInteraction: false,
    },
    breakpoints: {
      342: {
        slidesPerView: 1,
        slidesPerColumn: 1,
      },
      535: {
        slidesPerView: 1,
        slidesPerColumn: 1,
      },
      768: {
        slidesPerView: 1,
        slidesPerColumn: 1,
      },
      1200: {
        slidesPerView: 1,
        slidesPerColumn: 1,
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 2000,
    navText: ['', ''],
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: {
      0: {
        items: 1,
      },
      500: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: false,
  };

  constructor(
    private categoryGroupService: CategoryGroupService,
    private loginRegisterCarouselService: LoginRegisterCarouselService
  ) {}

  ngOnInit(): void {
    /* this.categoryGroupService
      .getCategoryGroups()
      .subscribe((response: Array<any>) => {
        this.items = this.loginRegisterCarouselService.formatData(response);
      }); */
  }
}
