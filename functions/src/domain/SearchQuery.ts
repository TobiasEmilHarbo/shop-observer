import { WebshopId } from '../external/WebshopId';

export interface SearchQuery {
	userId: string;
	query: string;
	shopId: WebshopId;
}
