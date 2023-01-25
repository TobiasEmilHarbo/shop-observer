import { load } from 'cheerio';
import Item from '../../../domain/Item';
import Page from '../../../domain/Page';
import WebshopService from '../WebshopService';
import KlaravikHttpClient from './KlaravikHttpClient';
import KlaravikMapper from './KlaravikMapper';

export default class KlaravikService implements WebshopService {
	private httpClient: KlaravikHttpClient;
	private mapper: KlaravikMapper;
	private host = 'https://www.klaravik.dk';

	constructor() {
		this.httpClient = new KlaravikHttpClient(this.host);
		this.mapper = new KlaravikMapper(this.host);
	}

	public async getItemsFromAllPages(query: string): Promise<Array<Item>> {
		const firstPage = await this.search(query);

		const pageSearches = [];

		for (
			let pageNumber = 2;
			pageNumber <= firstPage.totalPages;
			pageNumber++
		) {
			pageSearches.push(this.search(query, pageNumber));
		}

		const pages = await Promise.all(pageSearches);

		const items = pages.reduce<Array<Item>>((items: Array<Item>, page) => {
			return [...items, ...page.items];
		}, firstPage.items);

		return items;
	}

	public async search(query: string, pageNumber = 1): Promise<Page<Item>> {
		const response = await this.httpClient.query(query, pageNumber);
		const dom = load(response.data)('html');
		return this.mapper.toItemListPage(dom);
	}
}
