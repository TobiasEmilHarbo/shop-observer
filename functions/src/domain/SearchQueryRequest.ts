import { Shop } from './Shop';

export interface SearchQueryRequest {
	userId: string;
	searchString: string;
	shop: Shop;
}
