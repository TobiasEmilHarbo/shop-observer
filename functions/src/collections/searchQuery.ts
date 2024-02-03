import * as functions from 'firebase-functions';
import { Collection } from '../domain/Collection';
import { PartialObservedSearchQuery } from '../domain/PartialObservedSearchQuery';
import ShopObserver from '../services/ShopObserver';
import { SearchQueryRequest } from '../domain/SearchQueryRequest';
import { firstValueFrom, tap } from 'rxjs';
import { ObservedSearchQuery } from '../domain/ObservedSearchQuery';

const shopObserver = new ShopObserver();

export default functions.firestore
	.document(`${Collection.SEARCH_QUERIES}/{id}`)
	.onCreate((snapshot): Promise<ObservedSearchQuery> => {
		console.log('onCreate', `${Collection.SEARCH_QUERIES}/{id}`);

		const searchQueryRequest = snapshot.data() as SearchQueryRequest;
		const createTime = snapshot.createTime.toMillis();
		const id = snapshot.id;

		const searchQuery: PartialObservedSearchQuery = {
			id,
			createTime,
			...searchQueryRequest,
		};

		console.log('UPDATING SEARCH QUERY', searchQuery);

		snapshot.ref.set(searchQuery, { merge: true });

		// shopObserver.updateQueryItems(searchQuery);

		console.log('shop', searchQuery.shop);

		return firstValueFrom(
			shopObserver.createObservedSearchQuery(searchQuery).pipe(
				tap((observedSearchQuery) => {
					console.log('SET observedSearchQuery', observedSearchQuery);
					snapshot.ref.set(observedSearchQuery, { merge: true });
				})
			)
		);
	});
