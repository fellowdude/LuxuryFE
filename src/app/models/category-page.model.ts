import { IBrandCarouselItem } from './brands-carousel.model';
import { IFilterItem } from './filter.model';
import { IProductCard } from './product-card.model';

export interface ICategoryPage {
  brands: IBrandCarouselItem[];
  categoryId: string;
  categoryName: string;
  categoryProducts: IProductCard[];
  desktopBanner: any[];
  filters?: IFilterItem[];
  mobileBanner: any[];
  subcategories?: any[];
  totalPages: number;
  totalProducts: number;
  url_attachment?: string;
  defaultDesktopBanner?: string;
  defaultMobileBanner?: string;
  isSubcategory?: boolean;
}

export interface ICategorySimple {
  link: string;
  name: string;
}
