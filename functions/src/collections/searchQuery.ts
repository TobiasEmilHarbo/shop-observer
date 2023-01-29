import * as functions from 'firebase-functions';
import { Collection } from '../domain/Collection';
import SearchQuery from '../domain/SearchQuery';
import ShopObserver from '../services/ShopObserver';

const shopObserver = new ShopObserver();

export default functions.firestore
	.document(`${Collection.SEARCH_QURIES}/{id}`)
	.onCreate(async (snapshot) => {
		const searchQuery = snapshot.data() as SearchQuery;
		const createTime = snapshot.createTime.toMillis();
		const id = snapshot.id;

		const observedSearchQuery =
			await shopObserver.createObservedSearchQuery(
				id,
				createTime,
				searchQuery
			);

		snapshot.ref.set(observedSearchQuery, { merge: true });
	});
