import * as functions from 'firebase-functions';
import Item from '../domain/Item';
import PartialObservedSearchQuery from '../domain/PartialObservedSearchQuery';
import SearchQuery from '../domain/SearchQuery';
import WebshopServiceFactory from '../services/WebshopServiceFactory';

const webshopServiceFactory = new WebshopServiceFactory();

exports.searchQueries = functions.firestore
	.document('search-queries/{documentId}')
	.onCreate(async (snapshot) => {
		const data = snapshot.data() as SearchQuery;
		const shopService = webshopServiceFactory.getWebshopService(
			data.shopId
		);

		const items = await shopService.getItemsFromAllPages(data.query);
		const itemIds = items.map((item: Item) => item.id);
		const createTime = snapshot.createTime.toMillis();
		const id = snapshot.id;

		const partialSearchQuery: PartialObservedSearchQuery = {
			id,
			createTime,
			itemIds,
		};

		snapshot.ref.set(partialSearchQuery, { merge: true });
	});
