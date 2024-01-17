import { WebshopId } from '../external/WebshopId';

export interface SearchQueryRequest {
	userId: string;
	query: string;
	shopId: WebshopId;
}
