import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { IProductCard } from 'src/app/models/product-card.model';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { GtagService } from 'src/app/gtag/gtag.service';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss'],
})
export class FeaturedProductsComponent implements OnInit {
  swiperConfig: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 10,
    autoplay: {
      delay: 2000,
      reverseDirection: false,
      disableOnInteraction: false,
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 4,
      },
      1000: {
        slidesPerView: 4,
        spaceBetween: 15,
      },
      1600: {
        slidesPerView: 5,
        spaceBetween: 15,
      },
    },
  };

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 500,
    navText: ['', ''],
    autoplay: true,
    autoplaySpeed: 600,
    margin: 25,
    responsive: {
      0: {
        items: 1,
      },
      350: {
        items: 2,
      },
      768: {
        items: 3,
      },
      1000: {
        items: 4,
      },
      1600: {
        items: 5,
      },
    },
    nav: false,
  };

  @ViewChild('testDiv') private testDiv: ElementRef<HTMLDivElement>;
  once: boolean = false;

  @Input() featuredProducts: Array<IProductCard>;

  constructor(private gtag: GtagService) {}

  ngOnInit(): void {}

  @HostListener('window:scroll', ['$event'])
  isScrolledIntoView(){
    if (this.testDiv && !this.once){
      const rect = this.testDiv.nativeElement.getBoundingClientRect();
      const topShown = rect.top >= 0;
      const bottomShown = rect.bottom <= window.innerHeight;
      if(topShown && bottomShown){
        this.once = true;
        this.gtag.viewItemList(
          this.featuredProducts.map( (product, index) =>{
            return {
              id: product?.sku,
              name: product?.productName,
              brand: product?.brand,
              category: product?.campaignName || product?.categories?.[0]?.name,
              price: product?.specialPrice,
              list_position: index,
              list_name: 'Featured Products'
            }
          })
        )
      }
    }
  }
}
