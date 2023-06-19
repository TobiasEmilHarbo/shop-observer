import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
	Observable,
	ReplaySubject,
	debounceTime,
	filter,
	map,
	merge,
	of,
	share,
	switchMap,
	take,
} from 'rxjs';
import { Item } from 'src/app/models/Item.model';
import { Page } from 'src/app/models/Page.model';
import { SearchQuery } from 'src/app/models/SearchQuery.model';
import { Shop } from 'src/app/models/Shop.model';
import { ShopsService } from 'src/app/services/shops.service';

@Component({
	selector: 'app-shop-page',
	templateUrl: './shop-page.component.html',
	styleUrls: ['./shop-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopPageComponent implements OnInit {
	public shopName!: String;
	public shopLogo!: String;
	public searchResultPage$!: Observable<Page<Item> | null>;
	public isLoading$!: Observable<boolean>;

	private shop!: Shop;
	private searchQuery$ = new ReplaySubject<SearchQuery>(1);

	constructor(
		private route: ActivatedRoute,
		private shopService: ShopsService
	) {}

	public ngOnInit(): void {
		this.shop = this.route.snapshot.data['shop'];
		this.shopName = this.shop.name;
		this.shopLogo = this.shop.logoUrl;

		this.searchResultPage$ = this.searchQuery$.pipe(
			debounceTime(200),
			switchMap((searchQuery) => {
				console.log('DO SEARCH', searchQuery);
				if (!searchQuery.searchString.trim()) {
					return of(null);
				}
				return this.shopService.doSearch(this.shop.id, searchQuery);
			}),
			share()
		);

		this.isLoading$ = merge(
			this.searchQuery$.pipe(
				filter((searchString) => !!searchString.searchString.trim()),
				map(() => true)
			),
			this.searchResultPage$.pipe(map(() => false))
		);
	}

	public doSearch(query: string): void {
		this.searchQuery$.next({
			searchString: query,
		});
	}

	public selectPage(pageNumber: number): void {
		this.searchQuery$.pipe(take(1)).subscribe((searchQuery) => {
			this.searchQuery$.next({
				searchString: searchQuery.searchString,
				page: pageNumber,
			});
		});
	}
}
