import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';
import { PaginationItem } from '../../../models/PaginationItem.model';
import { PaginationItemType } from '../../../models/PaginationItemType';

@Component({
	selector: 'app-pagination-item',
	templateUrl: './pagination-item.component.html',
	styleUrl: './pagination-item.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationItemComponent {
	public readonly PaginationItemType = PaginationItemType;

	@Input() public paginationItem: PaginationItem | null = null;

	@Output() public onPageSelect = new EventEmitter<number>();

	public selectPage(pageNumber: number) {
		this.onPageSelect.emit(pageNumber);
	}
}
