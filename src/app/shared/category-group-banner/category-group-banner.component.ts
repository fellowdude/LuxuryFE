import { Component, Input, OnInit } from '@angular/core';
import {
  ICategoryGroupBanner,
  ICategoryGroupBannerItem,
} from 'src/app/models/category-group.model';
import { RedirectService } from 'src/app/services/redirect.service';

@Component({
  selector: 'app-category-group-banner',
  templateUrl: './category-group-banner.component.html',
  styleUrls: ['./category-group-banner.component.scss'],
})
export class CategoryGroupBannerComponent implements OnInit {
  @Input() bannerItems!: ICategoryGroupBannerItem[];
  @Input() isGradient: boolean = false;
  bannerConfig: ICategoryGroupBanner;

  constructor(
    public redirectService: RedirectService
  ) {}

  ngOnInit(): void {
    this.bannerConfig = {
      animation: true,
      autoplay: true,
      arrows: false,
      interval: 5000,
      itemsPerSlide: 1,
      indicators: true,
      banners: this.bannerItems,
    };
  }
}
