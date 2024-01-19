import { Injectable } from '@angular/core';
import {
	BehaviorSubject,
	Observable,
	ReplaySubject,
	buffer,
	combineLatest,
	distinctUntilChanged,
	map,
	of,
	range,
	switchMap,
	toArray,
} from 'rxjs';
import { PaginationItem } from '../models/PaginationItem.model';

const width = 5;

@Injectable({
	providedIn: 'root',
})
export class PaginationService {
	private _currentPage$ = new BehaviorSubject<number>(1);
	private _totalPageCount$ = new ReplaySubject<number>(1);

	public getPaginationDisplay$(): Observable<Array<PaginationItem | null>> {
		return this.totalPageCount$.pipe(
			switchMap((totalPageCount) => {
				if (totalPageCount < 10) {
					return range(1, totalPageCount).pipe(
						map(toPaginationItem),
						toArray()
					);
				}

				return combineLatest([
					this.headPageArray$.pipe(map(toPaginationItems)),
					this.pageAccordionA$.pipe(map(toAccordionPaginationItem)),
					this.middlePageArray$.pipe(map(toPaginationItems)),
					this.pageAccordionB$.pipe(map(toAccordionPaginationItem)),
					this.tailPageArray$.pipe(map(toPaginationItems)),
				]).pipe(
					map(([head, accordionA, middle, accordionB, tail]) => {
						return [
							...head,
							accordionA,
							...middle,
							accordionB,
							...tail,
						];
					})
				);
			})
		);
	}

	public get disablePrevButton(): Observable<boolean> {
		return this.currentPage$.pipe(map((currentPage) => currentPage === 1));
	}

	public get disableNextButton(): Observable<boolean> {
		return combineLatest([this.currentPage$, this.totalPageCount$]).pipe(
			map(
				([currentPage, totalPageCount]) =>
					currentPage === totalPageCount
			)
		);
	}

	public setCurrentPage(currentPageNumber: number): void {
		this._currentPage$.next(currentPageNumber);
	}

	public setTotalPageCount(totalPageCount: number) {
		this._totalPageCount$.next(totalPageCount);
	}

	private get headPageArray$(): Observable<Array<number>> {
		return combineLatest([
			this.totalPageCount$,
			this.isInStartOrEndPages,
		]).pipe(
			switchMap(([totalPageCount, isInStartOrEndPages]) => {
				if (isInStartOrEndPages && totalPageCount > 9) {
					return range(1, 4).pipe(toArray());
				}

				return of([1]);
			})
		);
	}

	private get tailPageArray$(): Observable<Array<number>> {
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
			})
		);
	}

	private get middlePageArray$(): Observable<Array<number>> {
		return combineLatest([
			this.currentPage$,
			this.isInStartOrEndPages,
			this.totalPageCount$,
		]).pipe(
			switchMap(([currentPage, isInStartOrEndPages, totalPageCount]) => {
				if (totalPageCount <= width) {
					return range(2, totalPageCount - 2).pipe(toArray());
				}
				if (isInStartOrEndPages) {
					return of([]);
				}
				return range(currentPage - 2, 5).pipe(toArray());
			})
		);
	}

	private get pageAccordionA$(): Observable<number> {
		return combineLatest([
			this.headPageArray$,
			this.middlePageArray$,
			this.tailPageArray$,
		]).pipe(
			map(([headPageArray, middlePageArray, tailPageArray]) => {
				const endOfTail = tailPageArray.slice(-1)[0];

				if (endOfTail <= width) {
					return 0;
				}

				const endOfHead = headPageArray.slice(-1)[0];
				const startOfMiddle = middlePageArray[0] ?? tailPageArray[0];
				const lengthOfBuffer = startOfMiddle - endOfHead;
				const middleOfBuffer = lengthOfBuffer / 2 + endOfHead;
				return Math.round(middleOfBuffer);
			})
		);
	}

	private get pageAccordionB$(): Observable<number> {
		return combineLatest([this.middlePageArray$, this.tailPageArray$]).pipe(
			map(([middlePageArray, tailPageArray]) => {
				const endOfTail = tailPageArray.slice(-1)[0];

				if (endOfTail <= width) {
					return 0;
				}
				const endOfMiddle = middlePageArray.slice(-1)[0];

				if (!endOfMiddle) {
					return 0;
				}

				const startOfMiddle = tailPageArray[0];
				const lengthOfBuffer = startOfMiddle - endOfMiddle;
				const middleOfBuffer = lengthOfBuffer / 2 + endOfMiddle;
				return Math.round(middleOfBuffer);
			})
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

function toPaginationItems(
	pageNumbers: number[]
): Array<PaginationItem | null> {
	return pageNumbers.map(toPaginationItem);
}

function toPaginationItem(pageNumbers: number): PaginationItem {
	return {
		pageNumber: pageNumbers,
		type: 'page',
		symbol: pageNumbers,
	};
}

function toAccordionPaginationItem(pageNumbers: number): PaginationItem | null {
	if (!pageNumbers) {
		return null;
	}

	return {
		pageNumber: pageNumbers,
		type: 'accordion',
		symbol: '···',
	};
}
