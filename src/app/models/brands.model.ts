import { IProductCard } from './product-card.model';

export interface IBrandDetail {
  category: any;
  categoryId: string;
  description: string;
  friendly_url: string;
  galery_image: Array<string>;
  galery_videos: Array<string>;
  image_banner: string;
  image_logo_banner: string;
  name: string;
  products: {
    data: Array<IProductCard>;
    quantityPage: number;
    totalItem: number;
  };
  url_attachment: string;
  id?: string;
}
