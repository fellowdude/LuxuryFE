import {ISearchResult} from '../models/search-result.model';
import {images} from './brands-carousel.mockup';
import {productsFound} from './product-card.mockup';

export const searchResult: ISearchResult = {
	brands: images,
	productsFound,
	totalPages: 5,
	totalProductsFound: 50
}
