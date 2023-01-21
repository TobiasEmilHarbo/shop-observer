import * as express from 'express';
import { WebshopId } from '../../external/WebshopId';
import { WebshopServiceFactory } from '../../services/WebshopServiceFactory';

const BASE = '/shops';
const router = express.Router();

router.get('/:shopId/', ({ params, query }, response) => {
	const webShopId = params.shopId as WebshopId;
	const searchQuery = query.searchQuery as string;
	const webshopFactory = new WebshopServiceFactory();

	const shop = webshopFactory.getWebshopService(webShopId);

	const page$ = shop.search(searchQuery);

	page$.subscribe((page) => {
		return response.json(page);
	});
});

export default (api: express.Express) => {
	api.use(BASE, router);
};
