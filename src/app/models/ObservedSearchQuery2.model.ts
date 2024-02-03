import { Shop } from './Shop.model';

export interface ObservedSearchQuery2 {
	shop: Shop;
	userId: string;
	searchString: string;
	itemIds?: Array<string>;
}
