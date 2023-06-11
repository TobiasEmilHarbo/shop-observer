import * as functions from 'firebase-functions';
import { Collection } from '../domain/Collection';
import SearchQuery from '../domain/SearchQuery';
import ShopObserver from '../services/ShopObserver';
import { WebshopId } from '../external/WebshopId';

const shopObserver = new ShopObserver();

interface SearchQueryRequest {
	userId: string;
	query: string;
	shopId: WebshopId;
}

export default functions.firestore
	.document(`${Collection.SEARCH_QURIES}/{id}`)
	.onCreate(async (snapshot) => {
		const seachQueryRequest = snapshot.data() as SearchQueryRequest;
		const createTime = snapshot.createTime.toMillis();
		const id = snapshot.id;

		const searchQuery: SearchQuery = {
			...seachQueryRequest,
			id,
			createTime,
		};

		snapshot.ref.set(searchQuery, { merge: true });

		const observedSearchQuery =
			await shopObserver.createObservedSearchQuery(searchQuery);

		snapshot.ref.set(observedSearchQuery, { merge: true });
	});
