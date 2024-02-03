import { WebshopId } from '../external/WebshopId';
import KlaravikService from './webshops/klaravik/KlaravikService';
import MockWebshopService from './webshops/mock/WebshopMockService';
import { WebshopService } from './webshops/WebshopService';

export default class WebshopServiceFactory {
	constructor(
		private klaravikService = new KlaravikService(),
		private mockWebshopService = new MockWebshopService()
	) {}

	public getWebshopService(webshopId: WebshopId): WebshopService {
		console.log('webshopId', webshopId);
		switch (webshopId) {
			case WebshopId.KLARAVIK:
				return this.klaravikService;
			case WebshopId.MOCK:
				return this.mockWebshopService;
			default:
				throw new Error(`No webshop found for id: '${webshopId}'`);
		}
	}
}
