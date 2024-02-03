import { load } from 'cheerio';
import Item from '../../../domain/Item';
import Page from '../../../domain/Page';
import { WebshopService } from '../WebshopService';
import KlaravikHttpClient from './KlaravikHttpClient';
import KlaravikObjectMapper from './KlaravikObjectMapper';
import { Observable, shareReplay, from, map, filter } from 'rxjs';
import { Shop } from '../../../domain/Shop';
import * as admin from 'firebase-admin';
import { Collection } from '../../../domain/Collection';

export default class KlaravikService implements WebshopService {
	private id = '9d1tQD9mw4CEetutLv7c';
	private httpClient: KlaravikHttpClient;
	private mapper: KlaravikObjectMapper;
	private host = 'https://www.klaravik.dk';
	private name = 'Klaravik';

	private shopData: Observable<Shop>;

	constructor(
		private database: admin.firestore.Firestore = admin.firestore()
	) {
		this.httpClient = new KlaravikHttpClient(this.host);
		this.mapper = new KlaravikObjectMapper(this.host);

		this.shopData = from(
			this.database.collection(Collection.SHOPS).doc(this.id).get()
		).pipe(
			filter((document) => document.exists),
			map((document) => document.data() as Shop),
			shareReplay()
		);
	}

	public getName(): string {
		return this.name;
	}

	public getHost(): string {
		return this.host;
	}

	public getLogoUrl(): Observable<string> {
		return this.shopData.pipe(map((shop) => shop.logoUrl));
	}

	public async getItemsFromAllPages(query: string): Promise<Array<Item>> {
		const firstPage = await this.search(query);

		console.log('FIRST PAGE', firstPage);

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
