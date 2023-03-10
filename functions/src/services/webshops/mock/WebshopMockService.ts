import Item from '../../../domain/Item';
import Page from '../../../domain/Page';
import WebshopService from '../WebshopService';

export default class MockWebshopService implements WebshopService {
	public getName(): string {
		throw new Error('Method not implemented.');
	}

	public getHost(): string {
		throw new Error('Method not implemented.');
	}

	public getItemsFromAllPages(query: string): Promise<Item[]> {
		throw new Error('Method not implemented.');
	}

	public search(
		searchQuery: string,
		pageNumber?: number | undefined
	): Promise<Page<Item>> {
		return new Promise((resolve) => {
			const page: Page<Item> = {
				items: [
					{
						id: '1234',
						name: 'mock',
						url: 'mock-item.com',
						imageUrl:
							'https://img.freepik.com/free-psd/beauty-products-mockup-design-set_53876-98728.jpg',
						price: '1234',
						currency: 'DKK',
						specifications: [
							{
								label: 'mock-spec',
								value: '12314',
							},
						],
					},
				],
				size: 1,
				number: 1,
				totalPages: 10,
			};
			resolve(page);
		});
	}
}
