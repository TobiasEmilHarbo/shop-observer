import { Observable } from 'rxjs';
import Item from '../../domain/Item';
import Page from '../../domain/Page';

export interface WebshopService {
	getName(): string;
	getHost(): string;
	getLogoUrl(): Observable<string>;
	getItemsFromAllPages(query: string): Promise<Array<Item>>;
	search(searchQuery: string, pageNumber?: number): Promise<Page<Item>>;
}
