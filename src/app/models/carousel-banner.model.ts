import { SafeHtml } from '@angular/platform-browser';

export interface ICarouselBanner {
  animation: boolean;
  arrows: boolean;
  autoplay: boolean;
  banners: Array<ICarouselImage>;
  indicators: boolean;
  interval: number;
  itemsPerSlide: number;
}

export interface ICarouselImage {
  buttonLabel: string;
  imageURL: string;
  redirectURL: string;
  subtitle: SafeHtml;
  title: string;
}
