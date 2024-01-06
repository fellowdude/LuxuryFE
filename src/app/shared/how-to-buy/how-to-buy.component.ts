import { Component, Input, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { IHowToBuyCard } from 'src/app/models/static-items.model';
import {
  IStaticHowToBuy,
  StaticPageTransformService,
} from 'src/app/services/internal/static-page-transform.service';
import { StaticPageService } from 'src/app/services/static-page.service';

@Component({
  selector: 'app-how-to-buy',
  templateUrl: './how-to-buy.component.html',
  styleUrls: ['./how-to-buy.component.scss'],
})
export class HowToBuyComponent implements OnInit {
  swiperConfig: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    autoplay: {
      delay: 5000,
      reverseDirection: false,
      disableOnInteraction: false,
    },
  };

  @Input() highlight: boolean = false;
  howToBuyList: Array<IHowToBuyCard> = [];

  constructor(
    private staticPageService: StaticPageService,
    private staticPageTransform: StaticPageTransformService
  ) {}

  ngOnInit(): void {
    this.staticPageService
      .getPublicStaticPage('como_comprar')
      .subscribe((response: IStaticHowToBuy) => {
        this.howToBuyList = this.staticPageTransform.transformHowToBuy(
          response
        );
      });
  }
}
