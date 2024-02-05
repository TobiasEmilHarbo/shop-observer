import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-empty-state-search',
	templateUrl: './empty-state-search.component.html',
	styleUrl: './empty-state-search.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateSearchComponent {}
