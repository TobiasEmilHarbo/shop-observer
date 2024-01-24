import { PaginationItemType } from './PaginationItemType.model';

export interface PaginationItem {
	pageNumber: number;
	current: boolean;
	type: PaginationItemType;
}
