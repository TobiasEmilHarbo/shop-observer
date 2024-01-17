import * as functions from 'firebase-functions';
import { Collection } from '../domain/Collection';
import { PartialObservedSearchQuery } from '../domain/PartialObservedSearchQuery';
import ShopObserver from '../services/ShopObserver';
import { SearchQueryRequest } from '../domain/SearchQueryRequest';

const shopObserver = new ShopObserver();

export default functions.firestore
	.document(`${Collection.SEARCH_QUERIES}/{id}`)
	.onCreate((snapshot) => {
		const searchQueryRequest = snapshot.data() as SearchQueryRequest;
		const createTime = snapshot.createTime.toMillis();
		const id = snapshot.id;

		const searchQuery: PartialObservedSearchQuery = {
			id,
			createTime,
			itemIds: [],
			...searchQueryRequest,
		};

		snapshot.ref.set(searchQuery, { merge: true });

		shopObserver.updateQueryItems(searchQuery);

		shopObserver
			.createObservedSearchQuery(searchQuery)
			.subscribe((observedSearchQuery) => {
				snapshot.ref.set(observedSearchQuery, { merge: true });
			});
	});
