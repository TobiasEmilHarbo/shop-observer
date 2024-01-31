import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
	NEVER,
	Observable,
	ReplaySubject,
	debounceTime,
	distinctUntilChanged,
	filter,
	map,
	merge,
	of,
	share,
	switchMap,
	take,
	tap,
} from 'rxjs';
import { Item } from '@models/ShopItem.model';
import { Page } from '@models/Page.model';
import { SearchQuery } from '@models/SearchQuery.model';
import { Shop } from '@models/Shop.model';
import { ShopsService } from '@services/shops.service';
import { ShopObserverService } from '@services/shop-observer.service';
import { ObservedSearchQuery } from '@models/ObservedSearchQuery.model';
import { PaginationService } from '@services/pagination.service';
import { PaginationSize } from '@models/PaginationSize';
import { Pagination } from '@models/Pagination.model';

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
	public isLoading$: Observable<boolean> = NEVER;
	public observedSearch$!: Observable<Array<ObservedSearchQuery>>;

	private shop!: Shop;
	private searchQuery$ = new ReplaySubject<SearchQuery>(1);
	public searchString$ = this.searchQuery$.pipe(
		map((query) => query.searchString)
	);

	public paginationMedium$: Observable<Pagination> = NEVER;
	public paginationSmall$: Observable<Pagination> = NEVER;
	public paginationMini$: Observable<Pagination> = NEVER;

	constructor(
		private route: ActivatedRoute,
		private shopService: ShopsService,
		private shopObserver: ShopObserverService,
		private paginationService: PaginationService
	) {}

	public ngOnInit(): void {
		this.paginationMedium$ = this.paginationService.getPagination$(
			PaginationSize.MEDIUM
		);

		this.paginationSmall$ = this.paginationService.getPagination$(
			PaginationSize.SMALL
		);

		this.paginationMini$ = this.paginationService.getPagination$(
			PaginationSize.MINI
		);

		this.shop = this.route.snapshot.data['shop'];
		this.shopName = this.shop?.name;
		this.shopLogo = this.shop?.logoUrl;

		this.observedSearch$ = this.shopObserver.getObservedSearchOfUser();

		this.searchResultPage$ = this.searchQuery$.pipe(
			distinctUntilChanged(compareSearchQueries),
			debounceTime(400),
			switchMap((searchQuery) => {
				console.log('DO SEARCH', searchQuery);
				if (!searchQuery.searchString.trim()) {
					return of(null);
				}
				return this.shopService.doSearch(this.shop.id, searchQuery);
			}),
			tap((searchResultPage) => {
				this.paginationService.updatePagination(
					searchResultPage?.totalPages,
					searchResultPage?.number
				);
			}),
			share()
		);

		this.isLoading$ = merge(
			this.searchQuery$.pipe(
				distinctUntilChanged(compareSearchQueries),
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

	public deleteSearch(id: string) {
		console.log('DELETE', id);
		this.shopObserver.removeObservedSearch(id);
	}

	public dismiss(): void {
		console.log('CLICK');
	}

	public addSearchToObservation(): void {
		this.shopObserver.addSearchToObservation(
			this.searchQuery$.asObservable(),
			this.shop.id
		);
	}
}

const compareSearchQueries = (a: SearchQuery, b: SearchQuery) => {
	return a.searchString === b.searchString && a.page === b.page;
};
