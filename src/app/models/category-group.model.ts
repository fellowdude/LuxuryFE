import { ICategoriesGroupItem } from './shared.model';

export interface ICategoryGroupBanner {
  animation: boolean;
  arrows: boolean;
  autoplay: boolean;
  banners: ICategoryGroupBannerItem[];
  indicators: boolean;
  interval: number;
  itemsPerSlide: number;
}

export interface ICategoryGroupBannerItem {
  imageURL: string;
  redirectURL: string;
  title: string;
}

export interface ICategoryItem extends ICategoriesGroupItem {
  // name: string;
  // image: string;
  // redirectURL: string;
}

export interface ICategoryGroupPage {
  bannerItems: ICategoryGroupBannerItem[];
  categories: ICategoryItem[];
}
