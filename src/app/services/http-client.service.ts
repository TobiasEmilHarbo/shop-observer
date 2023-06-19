import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Item from 'functions/src/domain/Item';
import Page from 'functions/src/domain/Page';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root',
})
export class HttpClientService {
	constructor(private http: HttpClient, private authService: AuthService) {}

	public searchShop(
		shop: string,
		query: string,
		page?: number
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
