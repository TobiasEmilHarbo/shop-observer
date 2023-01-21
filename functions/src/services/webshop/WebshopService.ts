import { Observable } from 'rxjs';
import { Item } from '../../domain/Item';
import { Page } from '../../domain/Page';

export interface WebshopService {
	getAllItems(): Observable<Array<Item>>;
	getItemPage(pageNumber: number): Observable<Page<Item>>;
}
