import { IBrandCarouselItem } from './brands-carousel.model';
import { ICategoryGroupBannerItem } from './category-group.model';
import { IExperienceCard } from './company.model';
import { ICategoriesGroupItem } from './shared.model';

export interface IExperiencesPage {
  bannerItems: ICategoryGroupBannerItem[];
  categories: ICategoriesGroupItem[];
}

export interface ICategoryExperience {
  brands: IBrandCarouselItem[];
  categoryName: string;
  desktopBanner: any[];
  mobileBanner: any[];
  subcategories: ICategoriesGroupItem[];
  activations?: {
    activationsList: IExperienceCard[];
    totalPages: number;
    totalFound: number;
  };
}
