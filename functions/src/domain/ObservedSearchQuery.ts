import { Shop } from './Shop';

export interface ObservedSearchQuery {
	id: string;
	userId: string;
	searchString: string;
	shop: Shop;
	createTime: number;
	itemIds: Array<string>;
	updateTime: number;
}
