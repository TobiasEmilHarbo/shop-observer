import { WebshopId } from '../external/WebshopId';

export interface PartialObservedSearchQuery {
	id: string;
	userId: string;
	query: string;
	shopId: WebshopId;
	itemIds: Array<string>;
	createTime: number;
}
