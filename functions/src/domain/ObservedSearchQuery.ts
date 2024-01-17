import { WebshopId } from '../external/WebshopId';

export interface ObservedSearchQuery {
	id: string;
	userId: string;
	query: string;
	shopId: WebshopId;
	createTime: number;
	itemIds: Array<string>;
	updateTime: number;
}
