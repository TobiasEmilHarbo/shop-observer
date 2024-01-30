import { PaginationItemType } from './PaginationItemType';

export interface PaginationItem {
	pageNumber: number;
	current?: boolean;
	type: PaginationItemType;
}
