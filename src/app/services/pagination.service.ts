import { Injectable } from '@angular/core';
import {
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

@Injectable({
	providedIn: 'root',
})
export class PaginationService {
	private _currentPage$ = new ReplaySubject<number>(1);
	private _totalPageCount$ = new ReplaySubject<number>(1);

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

	public get headPageArray$(): Observable<Array<number>> {
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

	public get tailPageArray$(): Observable<Array<number>> {
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

	public get middlePageArray$(): Observable<Array<number>> {
		return combineLatest([
			this.currentPage$,
			this.isInStartOrEndPages,
			this.totalPageCount$,
		]).pipe(
			switchMap(([currentPage, isInStartOrEndPages, totalPageCount]) => {
				if (totalPageCount <= 9) {
					return range(2, totalPageCount - 2).pipe(toArray());
				}
				if (isInStartOrEndPages) {
					return of([]);
				}
				return range(currentPage - 2, 5).pipe(toArray());
			})
		);
	}

	public get pageBufferA(): Observable<number> {
		return combineLatest([
			this.headPageArray$,
			this.middlePageArray$,
			this.tailPageArray$,
		]).pipe(
			switchMap(([headPageArray, middlePageArray, tailPageArray]) => {
				const endOfTail = tailPageArray.slice(-1)[0];

				if (endOfTail <= 9) {
					return of(0);
				}

				const endOfHead = headPageArray.slice(-1)[0];
				const startOfMiddle = middlePageArray[0] ?? tailPageArray[0];
				const lengthOfBuffer = startOfMiddle - endOfHead;
				const middleOfBuffer = lengthOfBuffer / 2 + endOfHead;
				return of(Math.round(middleOfBuffer));
			})
		);
	}

	public get pageBufferB(): Observable<number> {
		return combineLatest([this.middlePageArray$, this.tailPageArray$]).pipe(
			switchMap(([middlePageArray, tailPageArray]) => {
				const endOfTail = tailPageArray.slice(-1)[0];

				if (endOfTail <= 9) {
					return of(0);
				}
				const endOfHead = middlePageArray.slice(-1)[0];
				const startOfMiddle = tailPageArray[0];
				const lengthOfBuffer = startOfMiddle - endOfHead;
				const middleOfBuffer = lengthOfBuffer / 2 + endOfHead;
				return of(Math.round(middleOfBuffer));
			})
		);
	}

	public setCurrentPage(
		currentPageNumber: number,
		totalPageCount: number
	): void {
		this._currentPage$.next(currentPageNumber);
		this._totalPageCount$.next(totalPageCount);
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
