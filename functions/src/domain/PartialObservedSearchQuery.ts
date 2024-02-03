import { Shop } from './Shop';

export interface PartialObservedSearchQuery {
	id: string;
	userId: string;
	searchString: string;
	itemIds?: Array<string>;
	createTime: number;
	shop: Shop;
}
