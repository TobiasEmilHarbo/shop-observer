/* eslint-disable semi */
import { WebshopId } from '../external/WebshopId';

export default interface SearchQuery {
	userId: string;
	query: string;
	shopId: WebshopId;
}
