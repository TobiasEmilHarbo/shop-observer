import Item from './Item';
import { ObservedSearchQuery } from './ObservedSearchQuery';

/* eslint-disable semi */
export default interface Notification {
	searchQuery: ObservedSearchQuery;
	items: Array<Item>;
}
