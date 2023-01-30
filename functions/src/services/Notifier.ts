import * as admin from 'firebase-admin';
import { Collection } from '../domain/Collection';
import Email from '../domain/Email';
import Item from '../domain/Item';
import { WebshopId } from '../external/WebshopId';
import WebshopServiceFactory from './WebshopServiceFactory';

export default class Notifier {
	constructor(
		private webshopServiceFactory = new WebshopServiceFactory(),
		private database = admin.firestore()
	) {}

	public async notify(
		userId: string,
		shopId: WebshopId,
		newResultItems: Array<Item>
	): Promise<void> {
		const webshopService =
			this.webshopServiceFactory.getWebshopService(shopId);

		const notification: Email = {
			toUids: [userId],
			template: {
				name: 'new-shop-items-notification',
				data: {
					shopName: webshopService.getName(),
					shopUrl: webshopService.getHost(),
					items: newResultItems,
				},
			},
		};

		await this.database.collection(Collection.EMAILS).add(notification);
	}
}
