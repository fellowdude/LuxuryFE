import { IBrandCarouselItem } from './brands-carousel.model';
import { IFilterItem } from './filter.model';
import { IProductCard } from './product-card.model';

export interface ICampaignPage {
  campaignId: string;
  brands: IBrandCarouselItem[];
  campaignName: string;
  campaignProducts: IProductCard[];
  desktopBanner: any[];
  mobileBanner: any[];
  totalPages: number;
  totalProducts: number;
  defaultDesktopBanner?: string;
  defaultMobileBanner?: string;
  filters?: IFilterItem[];
  url_attachment: string;
}
