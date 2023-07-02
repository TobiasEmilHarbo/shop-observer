import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-pagination',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
	private _currentPage!: number;

	public firstPages: Array<number> = [];
	public pagination: Array<number> = [];
	public lastPages: Array<number> = [];

	@Output() public onPageSelect = new EventEmitter<number>();

	@Input() public set currentPage(currentPage: number) {
		this._currentPage = currentPage;
		this.calculatePagination(currentPage);
	}

	@Input() public totalPages: number = 0;

	public get currentPage(): number {
		return this._currentPage;
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

	private calculatePagination(currentPage: number) {
		this.pagination = [];
		this.firstPages = [];
		const leadingPages: Array<number> = [];
		const trailingPages: Array<number> = [];

		const numberMargin = 2;

		if (this.totalPages > 9) {
			const start = currentPage - numberMargin;
			const end = currentPage + numberMargin;

			for (let index = start; index <= end; index++) {
				if (1 <= index && index <= this.totalPages) {
					this.pagination.push(index);
				}
			}

			if (this.pagination.length < 4) {
				const head = this.pagination[0];
				const tail = this.pagination[this.pagination.length - 1];
				const newHead = head - 1;
				const newTail = tail + 1;

				if (newHead > 0) {
					this.pagination.unshift(newHead);
				}
				if (newTail <= this.totalPages) {
					this.pagination.push(newTail);
				}
			}

			const head = this.pagination[0];
			const tail = this.pagination[this.pagination.length - 1];

			if (true) {
			}

			console.log(leadingPages, trailingPages);
		} else {
			for (let index = 1; index <= this.totalPages; index++) {
				this.pagination.push(index);
			}
		}
	}
}
