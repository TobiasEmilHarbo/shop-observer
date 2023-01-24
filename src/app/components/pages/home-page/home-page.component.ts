import { Component, OnInit } from '@angular/core';
import { Item } from 'functions/src/domain/Item';
import { Page } from 'functions/src/domain/Page';
import { SearchQuery } from 'functions/src/domain/SearchQuery';
import { first, map, Observable, switchMap, tap } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClientService } from 'src/app/services/http-client.service';
import { ObservedSearchQuery } from 'functions/src/domain/ObservedSearchQuery';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
	public items!: Observable<Array<Item>>;
	public searches!: Observable<Array<ObservedSearchQuery>>;
	public currentSearch!: string;

	constructor(
		private http: HttpClientService,
		private authService: AuthService,
		private database: AngularFirestore
	) {}

	public ngOnInit(): void {
		this.searches = this.authService.getUser().pipe(
			switchMap((user) => {
				return this.database
					.collection('search-queries', (reference) =>
						reference.where('userId', '==', user?.uid)
					)
					.valueChanges() as Observable<Array<ObservedSearchQuery>>;
			})
		);
	}

	public search(searchQuery: string): void {
		this.currentSearch = searchQuery;
		this.items = this.http
			.searchShop('KLARAVIK', searchQuery)
			.pipe(map((page: Page<Item>) => page.items));
	}

	public signOut(): void {
		this.authService.signOut();
	}

	public saveSearch(): void {
		if (!this.currentSearch) {
			return;
		}

		this.searches
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
				switchMap(() => this.authService.getUser().pipe(first()))
			)
			.subscribe((user) => {
				this.database.collection('search-queries').add({
					userId: user?.uid,
					shopId: 'KLARAVIK',
					query: this.currentSearch,
				} as SearchQuery);
			});
	}

	public deleteSearch(searchId: string) {
		console.log('DELETE', searchId);
	}
}
