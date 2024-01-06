import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ICarouselImage } from 'src/app/models/carousel-banner.model';

@Component({
  selector: 'app-banner-item',
  templateUrl: './banner-item.component.html',
  styleUrls: ['./banner-item.component.scss'],
})
export class BannerItemComponent implements OnInit {
  @Input() bannerData: ICarouselImage;
  @Input() type: string;
  isImageLoaded: boolean = true;

  constructor(private route: Router) {}

  imageNotLoaded() {
    this.isImageLoaded = false;
  }

  ngOnInit() {}

  redirect(el) {
    if (el.redirectURL.includes('www')) {
      const includesHttps = el.redirectURL.includes('https://');
      includesHttps
        ? window.open(el.redirectURL)
        : window.open('https://' + el.redirectURL);
    } else {
      this.route.navigate([el.redirectURL]);
    }
  }
}
