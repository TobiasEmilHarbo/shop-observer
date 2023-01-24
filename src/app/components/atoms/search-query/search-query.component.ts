import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ObservedSearchQuery } from 'functions/src/domain/ObservedSearchQuery';

@Component({
	selector: 'app-search-query',
	templateUrl: './search-query.component.html',
	styleUrls: ['./search-query.component.scss'],
})
export class SearchQueryComponent {
	@Input() search!: ObservedSearchQuery;
	@Output() deleteSearch = new EventEmitter<string>();
}
