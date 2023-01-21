import * as express from 'express';
import { WebshopId } from '../../external/WebshopId';
import { WebshopServiceFactory } from '../../services/WebshopServiceFactory';

const BASE = '/shops';
const router = express.Router();

router.get('/:shopId/', (request, response) => {
	const webShopId = request.params.shopId as WebshopId;
	const webshopFactory = new WebshopServiceFactory();

	const shop = webshopFactory.getWebshopService(webShopId);

	const page$ = shop.getItemPage(1);

	page$.subscribe((page) => {
		return response.json(page);
	});
});

export default (api: express.Express) => {
	api.use(BASE, router);
};
