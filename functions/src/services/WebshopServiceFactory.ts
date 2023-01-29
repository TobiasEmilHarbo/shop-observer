import { WebshopId } from '../external/WebshopId';
import KlaravikService from './webshops/klaravik/KlaravikService';
import WebshopService from './webshops/WebshopService';

export default class WebshopServiceFactory {
	constructor(private klaravikService = new KlaravikService()) {}

	public getWebshopService(webshopId: WebshopId): WebshopService {
		switch (webshopId) {
			case 'KLARAVIK':
				return this.klaravikService;
			default:
				throw new Error(`No webshop found for id: ${webshopId}`);
		}
	}
}
