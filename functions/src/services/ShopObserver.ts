import { ObservedSearchQuery } from '../domain/ObservedSearchQuery';
import WebshopServiceFactory from './WebshopServiceFactory';
import * as admin from 'firebase-admin';
import { Collection } from '../domain/Collection';
import Item from '../domain/Item';
import { DocumentData, DocumentReference } from 'firebase-admin/firestore';
import SearchQuery from '../domain/SearchQuery';

export default class ShopObserver {
	constructor(
		private webshopServiceFactory = new WebshopServiceFactory(),
		private database = admin.firestore()
	) {}

	public async createObservedSearchQuery(
		id: string,
		createTime: number,
		searchQuery: SearchQuery
	): Promise<ObservedSearchQuery> {
		const shopService = this.webshopServiceFactory.getWebshopService(
			searchQuery.shopId
		);

		const items = await shopService.getItemsFromAllPages(searchQuery.query);
		const itemIds = items.map((item: Item) => item.id);

		return {
			id,
			createTime,
			updateTime: createTime,
			itemIds,
			...searchQuery,
		};
	}

	public async queueSearchQueriesForInspection(): Promise<
		Array<DocumentReference<DocumentData>>
	> {
		const collection = await this.database
			.collection(Collection.SEARCH_QURIES)
			.get();

		const documentUpdates = collection.docs.map(async (document) => {
			const searchQuery = document.data() as ObservedSearchQuery;

			return this.database
				.collection(Collection.SEARCH_QUERY_INSPECTIONS)
				.add(searchQuery);
		});

		return Promise.all(documentUpdates);
	}

	public async detectNewShopItems({
		shopId,
		query,
		itemIds,
	}: ObservedSearchQuery): Promise<{
		newItems: Array<Item>;
		allItems: Array<Item>;
	}> {
		const webshopService =
			this.webshopServiceFactory.getWebshopService(shopId);

		const allItems = await webshopService.getItemsFromAllPages(query);

		const newItems = allItems.filter((item) => !itemIds.includes(item.id));

		return {
			newItems,
			allItems,
		};
	}
}
