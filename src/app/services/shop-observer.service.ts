import { Injectable } from '@angular/core';
import { Observable, combineLatest, first, switchMap, take, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SearchQuery } from '@models/SearchQuery.model';
import { ObservedSearchQuery } from '@models/ObservedSearchQuery.model';
import { Collection } from '@models/Collection';

@Injectable({
	providedIn: 'root',
})
export class ShopObserverService {
	constructor(
		private authService: AuthService,
		private database: AngularFirestore
	) {}

	public getObservedSearchOfUser(): Observable<Array<ObservedSearchQuery>> {
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

	public addSearchToObservation(
		search$: Observable<SearchQuery>,
		shopId: string
	): void {
		combineLatest([search$.pipe(take(1)), this.getObservedSearchOfUser()])
			.pipe(
				first(),
				tap(([search, observedSearches]) => {
					const match = observedSearches.find((observedSearch) => {
						return observedSearch.query === search.searchString;
					});

					if (!!match) {
						throw new Error('Already saved');
					}
				}),
				switchMap(() =>
					combineLatest([
						this.authService.user$.pipe(first()),
						search$.pipe(take(1)),
					])
				)
			)
			.subscribe(([user, search]) => {
				this.database.collection(Collection.SEARCH_QUERIES).add({
					userId: user?.uid,
					shopId: shopId,
					query: search.searchString,
				});
			});
	}

	public removeObservedSearch(searchId: string): void {
		this.database
			.collection(Collection.SEARCH_QUERIES)
			.doc(searchId)
			.delete()
			.catch((error) => console.log(error));
	}
}
