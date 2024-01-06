import { ICategoryPage } from '../models/category-page.model';
import { images } from './brands-carousel.mockup';
import { productsFound } from './product-card.mockup';

export const categoryPage: ICategoryPage = {
  categoryId: '',
  categoryName: 'Tecnología',
  desktopBanner: 'assets/images/samsung-desktop-banner.svg',
  mobileBanner: 'assets/images/samsung-mobile-banner.svg',
  brands: images,
  categoryProducts: productsFound,
  totalPages: 5,
  totalProducts: 50,
};
