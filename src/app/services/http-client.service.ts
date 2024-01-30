import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '@models/ShopItem.model';
import { Page } from '@models/Page.model';

@Injectable({
	providedIn: 'root',
})
export class HttpClientService {
	constructor(private http: HttpClient) {}

	public searchShop(
		shop: string,
		query: string,
		page: number = 1
	): Observable<Page<Item>> {
		let params = new HttpParams();
		params = params.set('search-query', query);

		if (page) {
			params = params.set('page', page);
		}

		return this.http.get<Page<Item>>(`/v1/shops/${shop}`, {
			params,
		});
	}
}
