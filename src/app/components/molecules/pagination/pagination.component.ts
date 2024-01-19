import { Observable } from 'rxjs';
import { PaginationService } from '../../../services/pagination.service';
import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';
import { PaginationItem } from '../../../models/PaginationItem.model';

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
		this.paginationService.setCurrentPage(this._currentPage);
	}

	@Input() public set totalPages(totalPages: number) {
		this._totalPages = totalPages;
		this.paginationService.setTotalPageCount(this._totalPages);
	}

	public paginationItemArray$: Observable<Array<PaginationItem | null>>;

	public disablePrevButton: Observable<boolean>;
	public disableNextButton: Observable<boolean>;

	constructor(private paginationService: PaginationService) {
		this.disablePrevButton = paginationService.disablePrevButton;
		this.disableNextButton = paginationService.disableNextButton;
		this.paginationItemArray$ = paginationService.getPaginationDisplay$();
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
