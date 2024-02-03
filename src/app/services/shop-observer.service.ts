import { Injectable } from '@angular/core';
import {
	Observable,
	Subject,
	combineLatest,
	first,
	from,
	switchMap,
	take,
	tap,
} from 'rxjs';
import { AuthService } from './auth.service';
import {
	AngularFirestore,
	DocumentReference,
} from '@angular/fire/compat/firestore';
import { SearchQuery } from '@models/SearchQuery.model';
import { ObservedSearchQuery } from '@models/ObservedSearchQuery.model';
import { Collection } from '@models/Collection';
import { Shop } from '@models/Shop.model';
import { ObservedSearchQuery2 } from '../models/ObservedSearchQuery2.model';

@Injectable({
	providedIn: 'root',
})
export class ShopObserverService {
	constructor(
		private authService: AuthService,
		private database: AngularFirestore
	) {}

	public getUsersObservedSearchArray$(): Observable<
		Array<ObservedSearchQuery>
	> {
		return this.authService.user$.pipe(
			switchMap((user) =>
				this.database
					.collection<ObservedSearchQuery>(
						Collection.SEARCH_QUERIES,
						(reference) => reference.where('userId', '==', user.uid)
					)
					.valueChanges()
			)
		);
	}

	public addSearchQueryObservationList(
		shop: Shop,
		searchQuery$: Observable<SearchQuery>
	): Observable<DocumentReference<ObservedSearchQuery2>> {
		return this.getUsersObservedSearchArray$().pipe(
			take(1),
			switchMap((observedSearchArray) =>
				searchQuery$.pipe(
					tap((searchQuery) => {
						const match = observedSearchArray.find(
							(observedSearch) =>
								observedSearch.searchString ===
								searchQuery.searchString
						);

						if (!!match) {
							throw 'Search query is already added to list of observed queries.';
						}
					})
				)
			),
			take(1),
			switchMap(({ searchString }) =>
				this.authService.user$.pipe(
					switchMap((user) => {
						const collection = new Subject<
							DocumentReference<ObservedSearchQuery2>
						>();
						this.database
							.collection<ObservedSearchQuery2>(
								Collection.SEARCH_QUERIES
							)
							.add({
								shop: shop,
								searchString,
								userId: user.uid,
							})
							.then(collection.next)
							.catch(collection.error)
							.finally(collection.complete);

						return collection.asObservable();
					})
				)
			),
			take(1)
		);
	}

	public removeObservedSearch(searchId: string): void {
		this.database
			.collection(Collection.SEARCH_QUERIES)
			.doc(searchId)
			.delete()
			.catch((error) => console.log(error));
	}
}
