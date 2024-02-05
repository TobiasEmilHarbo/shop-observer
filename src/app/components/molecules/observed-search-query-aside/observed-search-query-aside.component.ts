import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';
import { NEVER, Observable } from 'rxjs';
import { ObservedSearchQuery } from '@models/ObservedSearchQuery.model';

@Component({
	selector: 'app-observed-search-query-aside',
	templateUrl: './observed-search-query-aside.component.html',
	styleUrl: './observed-search-query-aside.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObservedSearchQueryAsideComponent {
	@Input() public observedSearches: Array<ObservedSearchQuery> = [];

	@Output() public doSearch = new EventEmitter<string>();
	@Output() public deleteSearch = new EventEmitter<string>();
}
