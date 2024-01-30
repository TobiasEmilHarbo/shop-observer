import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ObservedSearchQuery } from '@models/ObservedSearchQuery.model';

@Component({
	selector: 'app-search-query',
	templateUrl: './search-query.component.html',
	styleUrls: ['./search-query.component.scss'],
})
export class SearchQueryComponent {
	@Input() public search: ObservedSearchQuery | null = null;
	@Output() public deleteSearch = new EventEmitter<string>();
}
