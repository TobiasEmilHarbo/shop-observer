import { PaginationItem } from './PaginationItem.model';

export interface Pagination {
	isPreviousButtonDisabled: boolean;
	isNextButtonDisabled: boolean;
	paginationItems: Array<PaginationItem>;
}
