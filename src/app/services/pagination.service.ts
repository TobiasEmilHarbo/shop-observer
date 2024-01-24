import { Injectable } from '@angular/core';
import {
	BehaviorSubject,
	Observable,
	ReplaySubject,
	combineLatest,
	distinctUntilChanged,
	map,
	of,
	range,
	switchMap,
	toArray,
} from 'rxjs';
import { PaginationItem } from '@models/PaginationItem.model';
import { PaginationItemType } from '../models/PaginationItemType.model';
import { Pagination } from '../models/Pagination.model';
import { existsGuard } from '../util';
import { PaginationSize } from '../models/PaginationSize.model';

@Injectable({
	providedIn: 'root',
})
export class PaginationService {
	private _currentPage$ = new BehaviorSubject<number>(1);
	private _totalPageCount$ = new ReplaySubject<number>(1);

	public getPagination$(size: PaginationSize): Observable<Pagination> {
		const paginationWidth = size;

		return this.totalPageCount$.pipe(
			switchMap((totalPageCount) => {
				if (totalPageCount <= paginationWidth) {
					return range(1, totalPageCount).pipe(
						map(toPaginationItem),
						toArray()
					);
				}

				return this.getCombinedPaginationItems(paginationWidth);
			}),
			switchMap((paginationItems) =>
				this.markCurrentPaginationItem(paginationItems)
			),
			switchMap((paginationItems) =>
				combineLatest([
					this.previousButtonDisabling$,
					this.nextButtonDisabling$,
				]).pipe(
					map(([isPreviousButtonDisabled, isNextButtonDisabled]) => ({
						isPreviousButtonDisabled,
						isNextButtonDisabled,
						paginationItems,
					}))
				)
			)
		);
	}

	public get previousButtonDisabling$(): Observable<boolean> {
		return this.currentPage$.pipe(map((currentPage) => currentPage === 1));
	}

	public get nextButtonDisabling$(): Observable<boolean> {
		return combineLatest([this.currentPage$, this.totalPageCount$]).pipe(
			map(
				([currentPage, totalPageCount]) =>
					currentPage === totalPageCount
			)
		);
	}

	public updatePagination(
		totalPageCount: number = 1,
		currentPageNumber: number = 1
	) {
		this._totalPageCount$.next(totalPageCount);
		this._currentPage$.next(currentPageNumber);
	}

	private getCombinedPaginationItems(
		paginationWidth: number
	): Observable<Array<PaginationItem>> {
		return combineLatest([
			this.getPaginationHead$(paginationWidth),
			this.getHeaderAccordion$(paginationWidth),
			this.getPaginationMiddle$(paginationWidth),
			this.getTailAccordion$(paginationWidth),
			this.getPaginationTail$(paginationWidth),
		]).pipe(
			map(
				([
					paginationHead,
					headerAccordion,
					paginationMiddle,
					tailAccordion,
					paginationTail,
				]) =>
					[
						...paginationHead,
						headerAccordion,
						...paginationMiddle,
						tailAccordion,
						...paginationTail,
					].filter(existsGuard)
			)
		);
	}

	private getPaginationHead$(
		paginationWidth: number
	): Observable<Array<PaginationItem>> {
		return this.isCurrentPageInHeadOrTail(paginationWidth).pipe(
			switchMap((isCurrentPageInHeadOrTail) => {
				if (isCurrentPageInHeadOrTail) {
					const headWidth = Math.floor(paginationWidth / 2);
					return range(1, headWidth).pipe(toArray());
				}

				return of([1]);
			}),
			map((pageNumbers) => pageNumbers.map(toPaginationItem))
		);
	}

	private getPaginationMiddle$(
		paginationWidth: number
	): Observable<Array<PaginationItem>> {
		return combineLatest([
			this.currentPage$,
			this.isCurrentPageInHeadOrTail(paginationWidth),
		]).pipe(
			switchMap(([currentPage, isCurrentPageInHeadOrTail]) => {
				if (isCurrentPageInHeadOrTail) {
					return of([]);
				}

				const middleWidth = paginationWidth - 4; // 2 for first and last page and two for accordions
				const middleHalfWidth = Math.floor(middleWidth / 2);
				return range(currentPage - middleHalfWidth, middleWidth).pipe(
					toArray()
				);
			}),
			map((pageNumbers) => pageNumbers.map(toPaginationItem))
		);
	}

	private getPaginationTail$(
		paginationWidth: number
	): Observable<Array<PaginationItem>> {
		return combineLatest([
			this.totalPageCount$,
			this.isCurrentPageInHeadOrTail(paginationWidth),
		]).pipe(
			switchMap(([totalPageCount, isCurrentPageInHeadOrTail]) => {
				if (totalPageCount < 2) {
					return of([]);
				}

				if (isCurrentPageInHeadOrTail) {
					const tailWidth = Math.floor(paginationWidth / 2);
					return range(
						totalPageCount - tailWidth + 1,
						tailWidth
					).pipe(toArray());
				}

				return of([totalPageCount]);
			}),
			map((pageNumbers) => pageNumbers.map(toPaginationItem))
		);
	}

	private getHeaderAccordion$(
		paginationWidth: number
	): Observable<PaginationItem | null> {
		return combineLatest([
			this.getPaginationHead$(paginationWidth).pipe(map(toPageNumbers)),
			this.getPaginationMiddle$(paginationWidth).pipe(map(toPageNumbers)),
			this.getPaginationTail$(paginationWidth).pipe(map(toPageNumbers)),
		]).pipe(
			map(([paginationHead, paginationMiddle, paginationTail]) => {
				const lastPageOfHead = paginationHead.at(-1);

				if (!lastPageOfHead) {
					return null;
				}

				const firstPageOfMiddle = paginationMiddle.at(0);
				const firstPageOfTail = paginationTail.at(0);

				const startPageOfNextSection =
					firstPageOfMiddle ?? firstPageOfTail;

				if (!startPageOfNextSection) {
					return null;
				}

				const lengthOfAccordion =
					startPageOfNextSection - lastPageOfHead - 1;

				const accordionHalfwayPoint =
					Math.round(lengthOfAccordion / 2) + lastPageOfHead;

				return {
					pageNumber: accordionHalfwayPoint,
					type:
						lengthOfAccordion < 2
							? PaginationItemType.PAGE
							: PaginationItemType.ACCORDION,
				};
			})
		);
	}

	private getTailAccordion$(
		paginationWidth: number
	): Observable<PaginationItem | null> {
		return combineLatest([
			this.getPaginationMiddle$(paginationWidth).pipe(map(toPageNumbers)),
			this.getPaginationTail$(paginationWidth).pipe(map(toPageNumbers)),
		]).pipe(
			map(([paginationMiddle, paginationTail]) => {
				const lastPageOfMiddle = paginationMiddle.at(-1);

				if (!lastPageOfMiddle) {
					return null;
				}

				const firstPageOfTail = paginationTail.at(0);

				if (!firstPageOfTail) {
					return null;
				}

				const lengthOfAccordion =
					firstPageOfTail - lastPageOfMiddle - 1;

				const accordionHalfwayPoint =
					Math.round(lengthOfAccordion / 2) + lastPageOfMiddle;

				return {
					pageNumber: accordionHalfwayPoint,
					type:
						lengthOfAccordion < 2
							? PaginationItemType.PAGE
							: PaginationItemType.ACCORDION,
				};
			})
		);
	}

	private markCurrentPaginationItem(paginationItems: Array<PaginationItem>) {
		return this.currentPage$.pipe(
			map((currentPage) =>
				paginationItems.map((paginationItem) => ({
					...paginationItem,
					current: currentPage === paginationItem.pageNumber,
				}))
			)
		);
	}

	private get currentPage$(): Observable<number> {
		return this._currentPage$.asObservable().pipe(distinctUntilChanged());
	}

	private get totalPageCount$(): Observable<number> {
		return this._totalPageCount$
			.asObservable()
			.pipe(distinctUntilChanged());
	}

	private isCurrentPageInHeadOrTail(
		paginationWidth: number
	): Observable<boolean> {
		return combineLatest([this.currentPage$, this.totalPageCount$]).pipe(
			map(([currentPage, totalPageCount]) => {
				const headAndTailWidth = Math.floor(paginationWidth / 2);

				if (
					currentPage <= headAndTailWidth ||
					headAndTailWidth > totalPageCount - currentPage
				) {
					return true;
				}
				return false;
			})
		);
	}
}

const toPaginationItem = (pageNumbers: number): PaginationItem => {
	return {
		pageNumber: pageNumbers,
		type: PaginationItemType.PAGE,
	};
};

const toPageNumbers = (
	paginationItem: Array<PaginationItem>
): Array<number> => {
	return paginationItem.map((item) => item.pageNumber);
};
