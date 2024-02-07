/* eslint-disable max-len */
import { Observable, of } from 'rxjs';
import Item from '../../../domain/Item';
import Page from '../../../domain/Page';
import { WebshopService } from '../WebshopService';

export default class MockWebshopService implements WebshopService {
	public getName(): string {
		throw new Error('Method not implemented.');
	}

	public getHost(): string {
		throw new Error('Method not implemented.');
	}

	public getLogoUrl(): Observable<string> {
		return of('http://localhost:4200/assets/images/binoculars_64.png');
	}

	public getItemsFromAllPages(query: string): Promise<Item[]> {
		console.log('getItemsFromAllPages', query);
		return new Promise((resolve) => {
			query;
			resolve(this.getMockItems());
		});
	}

	public search(
		searchQuery: string,
		pageNumber?: number | undefined
	): Promise<Page<Item>> {
		console.log('search', searchQuery, 'page', pageNumber);
		return new Promise((resolve) => {
			const page: Page<Item> = {
				items: this.getMockItems(),
				size: 1,
				number: pageNumber ?? 1,
				totalPages: 1,
			};
			resolve(page);
		});
	}

	private getMockItems(): Array<Item> {
		return [
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
			{
				id: '1235',
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
			{
				id: '1236',
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
			{
				id: '1237',
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
			{
				id: '12373',
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
			{
				id: '12374',
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
			{
				id: '12375',
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
			{
				id: '12376',
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
			{
				id: '12377',
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
			{
				id: '12378',
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
			{
				id: '12379',
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
		];
	}
}
