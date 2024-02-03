import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ObservedSearchQuery } from '@models/ObservedSearchQuery.model';

@Component({
	selector: 'app-search-query',
	templateUrl: './search-query.component.html',
	styleUrls: ['./search-query.component.scss'],
})
export class SearchQueryComponent {
	private _searchQuery: ObservedSearchQuery | null = null;
	public searchQueryString: string = '';
	public searchQueryId: string = '';
	public shopIconUrl: string = '';
	public itemCount: number = 0;
	public dateOfSearch: number = 0;

	public isLoading: boolean = true;

	@Input() public set search(searchQuery: ObservedSearchQuery) {
		this._searchQuery = searchQuery;

		console.log('searchQuery', searchQuery);

		this.isLoading = searchQuery.updateTime ? false : true;

		this.searchQueryId = searchQuery.id ?? '';
		this.searchQueryString = searchQuery.searchString ?? '';
		this.shopIconUrl = searchQuery.shop.logoUrl ?? '';
		this.itemCount = searchQuery.itemIds?.length ?? 0;

		this.dateOfSearch = searchQuery?.updateTime ?? 0;
	}

	@Output() public deleteSearch = new EventEmitter<string>();
	@Output() public executeSearch = new EventEmitter<ObservedSearchQuery>();

	public doSearch(): void {
		if (!this._searchQuery) {
			return;
		}

		this.executeSearch.emit(this._searchQuery);
	}
}
