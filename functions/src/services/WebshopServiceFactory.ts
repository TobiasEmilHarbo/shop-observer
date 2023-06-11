import { WebshopId } from '../external/WebshopId';
import KlaravikService from './webshops/klaravik/KlaravikService';
import MockWebshopService from './webshops/mock/WebshopMockService';
import WebshopService from './webshops/WebshopService';

export default class WebshopServiceFactory {
	constructor(
		private klaravikService = new KlaravikService(),
		private mockWebshopService = new MockWebshopService()
	) {}

	public getWebshopService(webshopId: WebshopId): WebshopService {
		switch (webshopId) {
			case 'KLARAVIK':
				return this.klaravikService;
			case 'MOCK':
				return this.mockWebshopService;
			default:
				throw new Error(`No webshop found for id: '${webshopId}'`);
		}
	}
}
