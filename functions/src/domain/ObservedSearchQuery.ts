import { SearchQuery } from './SearchQuery';

export interface ObservedSearchQuery extends SearchQuery {
	id: string;
	items: number;
	createdDate: string;
}
