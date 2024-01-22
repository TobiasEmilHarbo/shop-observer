import { Injectable } from '@angular/core';
import { Shop } from '@models/Shop.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Collection } from 'functions/src/domain/Collection';
import { Observable, filter, map, tap } from 'rxjs';
import { Item } from '@models/Item.model';
import { Page } from '@models/Page.model';
import { SearchQuery } from '@models/SearchQuery.model';
import { HttpClientService } from './http-client.service';
import { existsGuard } from '../util';

@Injectable({
	providedIn: 'root',
})
export class ShopsService {
	constructor(
		private database: AngularFirestore,
		private http: HttpClientService
	) {}

	public getShop(shopId: string): Observable<Shop> {
		return this.database
			.collection(Collection.SHOPS)
			.doc<Shop>(shopId)
			.get()
			.pipe(
				tap((document) => {
					if (!document.exists) {
						throw new Error('Document does not exist');
					}
				}),
				map((document) => document.data()),
				filter(existsGuard)
			);
	}

	public doSearch(
		shopId: string,
		searchQuery: SearchQuery
	): Observable<Page<Item>> {
		return this.http.searchShop(
			shopId,
			searchQuery.searchString,
			searchQuery.page
		);
	}
}
