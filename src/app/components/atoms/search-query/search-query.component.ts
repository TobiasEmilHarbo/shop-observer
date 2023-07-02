import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ObservedSearchQuery } from 'functions/src/domain/ObservedSearchQuery';

@Component({
	selector: 'app-search-query',
	templateUrl: './search-query.component.html',
	styleUrls: ['./search-query.component.scss'],
})
export class SearchQueryComponent {
	@Input() public search!: ObservedSearchQuery;
	@Output() public deleteSearch = new EventEmitter<string>();
}
