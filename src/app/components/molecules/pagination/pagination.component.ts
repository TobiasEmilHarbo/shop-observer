import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pagination } from '../../../models/Pagination.model';

@Component({
	selector: 'app-pagination',
	templateUrl: './pagination.component.html',
	styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
	@Output() public onPageSelect = new EventEmitter<number>();

	@Input() public pagination: Pagination | null = null;
	@Input() public currentPageNumber!: number;

	public nextPage(): void {
		this.selectPage(this.currentPageNumber + 1);
	}

	public previousPage(): void {
		this.selectPage(this.currentPageNumber - 1);
	}

	public selectPage(pageNumber: number) {
		this.onPageSelect.emit(pageNumber);
	}
}
