import { Component, OnInit } from '@angular/core';
import {
	first,
	Observable,
	of,
	ReplaySubject,
	switchMap,
	take,
	tap,
} from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClientService } from 'src/app/services/http-client.service';
import { Collection } from 'functions/src/domain/Collection';
import { WebshopId } from 'functions/src/external/WebshopId';
import { Page } from '../../../models/Page.model';
import { Item } from '../../../models/Item.model';
import { ObservedSearchQuery } from '../../../models/ObservedSearchQuery.model';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
	public observedSearches$!: Observable<Array<ObservedSearchQuery>>;
	public currentSearch!: string;
	public currentSearchResultPage$!: Observable<Page<Item> | null>;

	public searchResultPage$!: Observable<Page<Item> | null>;

	private webshopId: WebshopId = WebshopId.MOCK;

	public showObservationsPanel = false;

	private searchQuery$ = new ReplaySubject<{
		searchString: string;
		page?: number;
	}>(1);

	constructor(
		private http: HttpClientService,
		private authService: AuthService,
		private database: AngularFirestore
	) {}

	public ngOnInit(): void {
		this.observedSearches$ = this.authService.user$.pipe(
			switchMap((user) => {
				return this.database
					.collection(Collection.SEARCH_QUERIES, (reference) =>
						reference.where('userId', '==', user.uid)
					)
					.valueChanges() as Observable<Array<ObservedSearchQuery>>;
			})
		);

		this.searchResultPage$ = this.searchQuery$.pipe(
			switchMap((searchQuery) => {
				if (!searchQuery?.searchString?.trim()) {
					return of(null);
				}
				return this.http.searchShop(
					this.webshopId,
					searchQuery.searchString,
					searchQuery.page ?? 1
				);
			})
		);

		this.search('aw');
	}

	public search(searchQuery: string): void {
		this.currentSearch = searchQuery;

		this.searchQuery$.next({
			searchString: searchQuery,
		});
	}

	public signOut(): void {
		this.authService.signOut();
	}

	public addSearchToObservation(): void {
		if (!this.currentSearch) {
			return;
		}

		this.observedSearches$
			.pipe(
				first(),
				tap((searches) => {
					const match = searches.find((search) => {
						return search.query === this.currentSearch;
					});

					if (!!match) {
						throw new Error('Already saved');
					}
				}),
				switchMap(() => this.authService.user$.pipe(first()))
			)
			.subscribe((user) => {
				this.database.collection(Collection.SEARCH_QUERIES).add({
					userId: user?.uid,
					shopId: this.webshopId,
					query: this.currentSearch,
				});
			});
	}

	public deleteSearch(searchId: string): void {
		console.log('delete', searchId);
		this.database
			.collection(Collection.SEARCH_QUERIES)
			.doc(searchId)
			.delete()
			.catch((error) => console.log(error));
	}

	public async pageSelect(pageNumber: number): Promise<void> {
		this.searchQuery$.pipe(take(1)).subscribe((searchQuery) => {
			this.searchQuery$.next({
				searchString: searchQuery.searchString,
				page: pageNumber,
			});
		});
	}

	public showObservations(): void {
		this.showObservationsPanel = !this.showObservationsPanel;
	}
}
