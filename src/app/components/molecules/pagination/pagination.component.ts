import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-pagination',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
	@Output() public onPageSelect = new EventEmitter<number>();

	@Input() public currentPage!: number;
	@Input() public set totalPages(totalPages: number) {
		this._totalPages = totalPages;
		const pageNumbers = [];
		for (let index = 1; index <= totalPages; index++) {
			pageNumbers.push(index);
		}
		this.pageNumbers = pageNumbers;
	}

	public pageNumbers: Array<number> = [1];
	private _totalPages!: number;

	public get totalPages(): number {
		return this._totalPages;
	}

	public get showPrevious(): boolean {
		return 1 !== this.currentPage && this.totalPages > 1;
	}

	public get showNext(): boolean {
		return this.totalPages !== this.currentPage && this.totalPages > 1;
	}

	public next(): void {
		this.selectPage(this.currentPage + 1);
	}

	public previous(): void {
		this.selectPage(this.currentPage - 1);
	}

	public selectPage(pageNumber: number) {
		this.onPageSelect.emit(pageNumber);
	}
}
