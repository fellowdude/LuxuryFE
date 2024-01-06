import { IBrandCarouselItem } from './brands-carousel.model';
import { IProductCard } from './product-card.model';

export interface ISearchResult {
  brands: IBrandCarouselItem[];
  productsFound: IProductCard[];
  totalPages: number;
  totalProductsFound: number;
}
