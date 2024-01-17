export interface ObservedSearchQuery {
	id?: string;
	userId: string;
	query: string;
	shopId: string;
	shopLogoUrl?: string;
	createTime?: number;
	itemIds?: Array<string>;
	updateTime?: number;
}
