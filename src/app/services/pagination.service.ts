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
	tap,
	toArray,
} from 'rxjs';
import { PaginationItem } from '@models/PaginationItem.model';
import { PaginationItemType } from '../models/PaginationItemType.model';
import { Pagination } from '../models/Pagination.model';
import { existsGuard } from '../util';

const paginationWidth = 9;

@Injectable({
	providedIn: 'root',
})
export class PaginationService {
	private _currentPage$ = new BehaviorSubject<number>(1);
	private _totalPageCount$ = new ReplaySubject<number>(1);

	public getPagination$(): Observable<Pagination> {
		return this.totalPageCount$.pipe(
			switchMap((totalPageCount) => {
				if (totalPageCount < 10) {
					return range(1, totalPageCount).pipe(
						map(toPaginationItem),
						toArray()
					);
				}

				return combineLatest([
					this.getPaginationHead$(),
					this.getHeaderAccordion$(),
					this.getPaginationBody$(),
					this.getTailAccordion$(),
					this.getPaginationTail$(),
				]).pipe(
					map(
						([
							paginationHead,
							headerAccordion,
							paginationBody,
							tailAccordion,
							paginationTail,
						]) => {
							return [
								...paginationHead,
								headerAccordion,
								...paginationBody,
								tailAccordion,
								...paginationTail,
							].filter(existsGuard);
						}
					)
				);
			}),
			switchMap((paginationItems) =>
				this.currentPage$.pipe(
					map((currentPage) =>
						paginationItems.map((paginationItem) => ({
							...paginationItem,
							current: currentPage === paginationItem.pageNumber,
						}))
					)
				)
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

	private getPaginationHead$(): Observable<Array<PaginationItem>> {
		return combineLatest([
			this.totalPageCount$,
			this.isInStartOrEndPages,
		]).pipe(
			switchMap(([totalPageCount, isInStartOrEndPages]) => {
				if (isInStartOrEndPages && totalPageCount > paginationWidth) {
					return range(1, Math.floor(paginationWidth / 2)).pipe(
						toArray()
					);
				}

				return of([1]);
			}),
			map((pageNumbers) => pageNumbers.map(toPaginationItem))
		);
	}

	private getHeaderAccordion$(): Observable<PaginationItem> {
		return combineLatest([
			this.getPaginationHead$(),
			this.getPaginationBody$(),
			this.getPaginationTail$(),
		]).pipe(
			map(([paginationHead, paginationBody, paginationTail]) => {
				const endOfHead = paginationHead.slice(-1)[0]?.pageNumber;
				const startOfMiddle =
					paginationBody[0]?.pageNumber ??
					paginationTail[0]?.pageNumber;
				const lengthOfBuffer = startOfMiddle - endOfHead;
				const middleOfBuffer = lengthOfBuffer / 2 + endOfHead;
				return Math.round(middleOfBuffer);
			}),
			map((pageNumber) => {
				return {
					pageNumber,
					current: false,
					type: PaginationItemType.ACCORDION,
				};
			})
		);
	}

	private getPaginationBody$(): Observable<Array<PaginationItem>> {
		return combineLatest([
			this.currentPage$,
			this.isInStartOrEndPages,
			this.totalPageCount$,
		]).pipe(
			switchMap(([currentPage, isInStartOrEndPages, totalPageCount]) => {
				if (totalPageCount <= paginationWidth) {
					return range(2, totalPageCount - 2).pipe(toArray());
				}
				if (isInStartOrEndPages) {
					return of([]);
				}
				return range(currentPage - 2, 5).pipe(toArray());
			}),
			map((pageNumbers) => pageNumbers.map(toPaginationItem))
		);
	}

	private getTailAccordion$(): Observable<PaginationItem | null> {
		return combineLatest([
			this.getPaginationBody$(),
			this.getPaginationTail$(),
		]).pipe(
			map(([paginationBody, paginationTail]) => {
				const endOfTail = paginationTail.slice(-1)[0]?.pageNumber;

				if (endOfTail <= paginationWidth) {
					return null;
				}
				const endOfMiddle = paginationBody.slice(-1)[0]?.pageNumber;

				if (!endOfMiddle) {
					return null;
				}

				const startOfMiddle = paginationTail[0]?.pageNumber;
				const lengthOfBuffer = startOfMiddle - endOfMiddle;
				const middleOfBuffer = lengthOfBuffer / 2 + endOfMiddle;
				return {
					pageNumber: Math.round(middleOfBuffer),
					current: false,
					type: PaginationItemType.ACCORDION,
				};
			})
		);
	}

	private getPaginationTail$(): Observable<Array<PaginationItem>> {
		return combineLatest([
			this.totalPageCount$,
			this.isInStartOrEndPages,
		]).pipe(
			switchMap(([totalPageCount, isInStartOrEndPages]) => {
				if (totalPageCount < 2) {
					return of([]);
				}

				if (isInStartOrEndPages && totalPageCount > 9) {
					return range(totalPageCount - 3, 4).pipe(toArray());
				}

				return of([totalPageCount]);
			}),
			map((pageNumbers) => pageNumbers.map(toPaginationItem))
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

	private get isInStartOrEndPages(): Observable<boolean> {
		return combineLatest([this.currentPage$, this.totalPageCount$]).pipe(
			map(([currentPage, totalPageCount]) => {
				if (currentPage <= 4 || 4 > totalPageCount - currentPage) {
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
		current: false,
		type: PaginationItemType.PAGE,
	};
};
