import * as functions from 'firebase-functions';
import { Collection } from '../domain/Collection';
import { ObservedSearchQuery } from '../domain/ObservedSearchQuery';
import Notifier from '../services/Notifier';
import ShopObserver from '../services/ShopObserver';
import * as admin from 'firebase-admin';
// eslint-disable-next-line max-len
import ObservedSearchQueryItemUpdate from '../domain/ObservedSearchQueryItemUpdate';

const shopObserver = new ShopObserver();
const notifier = new Notifier();

const database = admin.firestore();

export default functions.firestore
	.document(`${Collection.SEARCH_QUERY_INSPECTIONS}/{id}`)
	.onCreate(async (snapshot): Promise<void> => {
		const searchQuery = snapshot.data() as ObservedSearchQuery;
		const { newItems, allItems } = await shopObserver.detectNewShopItems(
			searchQuery
		);

		const updatedObservedSearch: ObservedSearchQueryItemUpdate = {
			itemIds: allItems.map((item) => item.id),
			updateTime: snapshot.createTime.toMillis(),
		};

		database
			.collection(Collection.SEARCH_QUERIES)
			.doc(searchQuery.id)
			.set(updatedObservedSearch, { merge: true });

		await snapshot.ref.delete();

		if (!newItems.length) {
			return;
		}

		await notifier.notify(searchQuery.userId, searchQuery.shopId, newItems);
	});
