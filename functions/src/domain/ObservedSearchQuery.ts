import PartialObservedSearchQuery from './PartialObservedSearchQuery';
import SearchQuery from './SearchQuery';

export interface ObservedSearchQuery
	extends PartialObservedSearchQuery,
		SearchQuery {}
