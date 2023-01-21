import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from 'functions/src/domain/Item';
import { Page } from 'functions/src/domain/Page';
import { WebshopId } from 'functions/src/external/WebshopId';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class HttpClientService {
	constructor(private http: HttpClient) {}

	public searchShop(shop: WebshopId, page?: number): Observable<Page<Item>> {
		const params = new HttpParams();
		if (page) {
			params.set('page', page);
		}

		return this.http.get<Page<Item>>(`/v1/shops/${shop}`, {
			params,
		});
	}
}
