// import { Observable } from 'rxjs';
import { Item } from '../../domain/Item';
import { Page } from '../../domain/Page';

export interface WebshopService {
	// getAllItems(searchQuery: string): Observable<Array<Item>>;
	search(searchQuery: string, pageNumber?: number): Promise<Page<Item>>;
}
