import { Component, Input, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { IExclusiveServicesCard } from 'src/app/models/static-items.model';
import {
  IStaticExclusiveServices,
  StaticPageTransformService,
} from 'src/app/services/internal/static-page-transform.service';
import { StaticPageService } from 'src/app/services/static-page.service';

@Component({
  selector: 'app-exclusive-services',
  templateUrl: './exclusive-services.component.html',
  styleUrls: ['./exclusive-services.component.scss'],
})
export class ExclusiveServicesComponent implements OnInit {
  swiperConfig: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    autoplay: {
      delay: 5000,
      reverseDirection: false,
      disableOnInteraction: false,
    },
  };
  exclusiveServicesList: Array<IExclusiveServicesCard> = [];
  @Input() highlight: boolean = false;

  constructor(
    private staticPageService: StaticPageService,
    private staticPageTransformService: StaticPageTransformService
  ) {}

  ngOnInit(): void {
    this.staticPageService
      .getPublicStaticPage('servicios_exclusivos')
      .subscribe((response: IStaticExclusiveServices) => {
        this.exclusiveServicesList = this.staticPageTransformService.transformExclusiveServices(
          response
        );
      });
  }
}
