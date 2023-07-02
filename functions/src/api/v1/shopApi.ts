import * as express from 'express';
import { WebshopId } from '../../external/WebshopId';
import WebshopServiceFactory from '../../services/WebshopServiceFactory';

const BASE = '/shops';
const router = express.Router();
const webshopFactory = new WebshopServiceFactory();

router.get('/:shopId/', async ({ params, query }, response) => {
	const webShopId = params.shopId as WebshopId;
	const searchQuery = query['search-query'] as string;
	const pageNumber = query['page'] as string;
	const shop = webshopFactory.getWebshopService(webShopId);
	const page = await shop.search(
		searchQuery,
		pageNumber ? parseInt(pageNumber) : 1
	);

	response.json(page);
});

router.get('/:shopId/all', async ({ params, query }, response) => {
	const webShopId = params.shopId as WebshopId;
	const searchQuery = query['search-query'] as string;
	const shop = webshopFactory.getWebshopService(webShopId);
	const items = await shop.getItemsFromAllPages(searchQuery);

	response.json(items);
});

export default (api: express.Express) => {
	api.use(BASE, router);
};
