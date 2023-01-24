import * as express from 'express';
import { WebshopId } from '../../external/WebshopId';
import { WebshopServiceFactory } from '../../services/WebshopServiceFactory';

const BASE = '/shops';
const router = express.Router();
const webshopFactory = new WebshopServiceFactory();

router.get('/:shopId/', async ({ params, query }, response) => {
	const webShopId = params.shopId as WebshopId;
	const searchQuery = query['search-query'] as string;
	const shop = webshopFactory.getWebshopService(webShopId);
	const page = await shop.search(searchQuery);

	response.json(page);
});

export default (api: express.Express) => {
	api.use(BASE, router);
};
