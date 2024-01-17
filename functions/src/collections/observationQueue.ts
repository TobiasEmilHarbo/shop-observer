import * as functions from 'firebase-functions';
import { Collection } from '../domain/Collection';
import { ObservedSearchQuery } from '../domain/ObservedSearchQuery';
import Notifier from '../services/Notifier';
import ShopObserver from '../services/ShopObserver';

const shopObserver = new ShopObserver();
const notifier = new Notifier();

export default functions.firestore
	.document(`${Collection.SEARCH_QUERY_INSPECTIONS}/{id}`)
	.onCreate(async (snapshot): Promise<void> => {
		const searchQuery = snapshot.data() as ObservedSearchQuery;
		const newItems = await shopObserver.updateQueryItems(searchQuery);

		snapshot.ref.delete();

		if (!newItems.length) {
			return;
		}

		await notifier.notify(searchQuery.userId, searchQuery.shopId, newItems);
	});
