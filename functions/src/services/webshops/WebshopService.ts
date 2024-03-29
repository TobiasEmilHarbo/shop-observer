import Item from '../../domain/Item';
import Page from '../../domain/Page';

export interface WebshopService {
	getItemsFromAllPages(query: string): Promise<Array<Item>>;
	search(searchQuery: string, pageNumber?: number): Promise<Page<Item>>;
}
