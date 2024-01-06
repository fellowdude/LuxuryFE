import { IBrandDetail } from '../models/brands.model';
import { productsFound } from './product-card.mockup';

export const brandResult: IBrandDetail = {
  name: 'Ejemplo',
  description: 'Ejemplo descripción',
  image_logo_banner: 'http://placekitten.com/g/200/200',
  image_banner: 'https://via.placeholder.com/750x90',
  category: {},
  galery_image: [
    'http://placekitten.com/g/400/400',
    'http://placekitten.com/g/400/400',
    'http://placekitten.com/g/400/400',
  ],
  galery_videos: [
    'https://www.youtube.com/embed/NpEaa2P7qZI',
    'https://www.youtube.com/embed/NpEaa2P7qZI',
  ],
  url_attachment: '',
  friendly_url: 'google.com',
  products: {
    data: productsFound,
    quantityPage: 5,
    totalItem: 50,
  },
};
