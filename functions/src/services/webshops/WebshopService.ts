/* eslint-disable semi */
import Item from '../../domain/Item';
import Page from '../../domain/Page';

export default interface WebshopService {
	getName(): string;
	getHost(): string;
	getItemsFromAllPages(query: string): Promise<Array<Item>>;
	search(searchQuery: string, pageNumber?: number): Promise<Page<Item>>;
}
