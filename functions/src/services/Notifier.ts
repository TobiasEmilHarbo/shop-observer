import * as admin from 'firebase-admin';
import { Collection } from '../domain/Collection';
import Email from '../domain/Email';
import Item from '../domain/Item';
import { ObservedSearchQuery } from '../domain/ObservedSearchQuery';

export default class Notifier {
	constructor(private database = admin.firestore()) {}

	public async notify(
		searchQuery: ObservedSearchQuery,
		items: Array<Item>
	): Promise<void> {
		const notification: Email = {
			toUids: [searchQuery.userId],
			template: {
				name: 'new-shop-items-notification',
				data: {
					searchQuery: {
						...searchQuery,
						itemIds: [],
					},
					items,
				},
			},
		};

		await this.database.collection(Collection.EMAILS).add(notification);
	}
}
