import { ObservedSearchQuery } from '../domain/ObservedSearchQuery';
import WebshopServiceFactory from './WebshopServiceFactory';
import * as admin from 'firebase-admin';
import { Collection } from '../domain/Collection';
import Item from '../domain/Item';
import { DocumentData, DocumentReference } from 'firebase-admin/firestore';
import { PartialObservedSearchQuery } from '../domain/PartialObservedSearchQuery';
import { Observable, map, from } from 'rxjs';
import { ObservedSearchQueryItemUpdate } from '../domain/ObservedSearchQueryItemUpdate';

export default class ShopObserver {
	constructor(
		private database = admin.firestore(),
		private webshopServiceFactory = new WebshopServiceFactory()
	) {}

	public createObservedSearchQuery(
		searchQuery: PartialObservedSearchQuery
	): Observable<ObservedSearchQuery> {
		const shopService = this.webshopServiceFactory.getWebshopService(
			searchQuery.shopId
		);

		const itemId$ = from(
			shopService.getItemsFromAllPages(searchQuery.query)
		).pipe(map((items: Array<Item>) => items.map((item: Item) => item.id)));

		return itemId$.pipe(
			map((itemIds) => {
				const updateTime = searchQuery.createTime;
				return {
					...searchQuery,
					itemIds,
					updateTime,
				};
			})
		);
	}

	public async updateQueryItems(
		searchQuery: PartialObservedSearchQuery
	): Promise<Array<Item>> {
		const { newItems, allItems } = await this.detectNewShopItems(
			searchQuery
		);

		const updatedObservedSearch: ObservedSearchQueryItemUpdate = {
			itemIds: allItems.map((item) => item.id),
			updateTime: Date.now(),
		};

		this.database
			.collection(Collection.SEARCH_QUERIES)
			.doc(searchQuery.id)
			.set(updatedObservedSearch, { merge: true });

		return newItems;
	}

	public async queueSearchQueriesForInspection(): Promise<
		Array<DocumentReference<DocumentData>>
	> {
		const collection = await this.database
			.collection(Collection.SEARCH_QUERIES)
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
		query,
		shopId,
		itemIds,
	}: PartialObservedSearchQuery): Promise<{
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
