import {
	ChangeDetectionStrategy,
	EventEmitter,
	Component,
	Output,
	Input,
} from '@angular/core';
import { ObservedSearchQuery } from '@models/ObservedSearchQuery.model';

@Component({
	selector: 'app-observed-queries',
	templateUrl: './observed-queries.component.html',
	styleUrls: ['./observed-queries.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObservedQueriesComponent {
	@Input() public observedSearches: Array<ObservedSearchQuery> | null = null;
	@Output() public deleteSearch = new EventEmitter<string>();
	@Output() public executeSearch = new EventEmitter<ObservedSearchQuery>();

	public trackById(_: number, query: ObservedSearchQuery) {
		return query.id;
	}
}
