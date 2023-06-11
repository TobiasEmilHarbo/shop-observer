/* eslint-disable semi */
import { WebshopId } from '../external/WebshopId';

export default interface SearchQuery {
	id: string;
	userId: string;
	query: string;
	shopId: WebshopId;
	createTime: number;
}
