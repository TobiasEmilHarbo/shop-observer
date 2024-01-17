import { Observable, of } from 'rxjs';
import { PaginationService } from '../../../services/pagination.service';
import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';

@Component({
	selector: 'app-pagination',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
	private _currentPage: number = 1;
	private _totalPages: number = 1;

	@Output() public onPageSelect = new EventEmitter<number>();

	@Input() public set currentPage(currentPage: number) {
		this._currentPage = currentPage;
		this.paginationService.setCurrentPage(
			this._currentPage,
			this._totalPages
		);
	}

	@Input() public set totalPages(totalPages: number) {
		this._totalPages = totalPages;
		this.paginationService.setCurrentPage(
			this.currentPage,
			this._totalPages
		);
	}

	public disablePrevButton: Observable<boolean>;
	public disableNextButton: Observable<boolean>;
	public startPages: Observable<Array<number>>;
	public middlePages: Observable<Array<number>>;
	public endPages: Observable<Array<number>>;
	public pageBufferA: Observable<number>;
	public pageBufferB: Observable<number>;

	constructor(private paginationService: PaginationService) {
		this.disablePrevButton = paginationService.disablePrevButton;
		this.disableNextButton = paginationService.disableNextButton;
		this.startPages = paginationService.headPageArray$;
		this.middlePages = paginationService.middlePageArray$;
		this.endPages = paginationService.tailPageArray$;
		this.pageBufferA = paginationService.pageBufferA;
		this.pageBufferB = paginationService.pageBufferB;
	}

	public get currentPage(): number {
		return this._currentPage;
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
