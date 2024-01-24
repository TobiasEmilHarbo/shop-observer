import { TestBed } from '@angular/core/testing';

import { PaginationService } from './pagination.service';
import { TestScheduler } from 'rxjs/testing';
import { Pagination } from '../models/Pagination.model';
import { PaginationItemType } from '../models/PaginationItemType.model';
import { PaginationItem } from '../models/PaginationItem.model';

describe('PaginationService', () => {
	let service: PaginationService;
	let testScheduler: TestScheduler;
	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(PaginationService);

		testScheduler = new TestScheduler((actual, expected) => {
			expect(actual).toEqual(expected);
		});
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('getPagination$', () => {
		it('should never return values if pagination is not updated is not updated', () => {
			testScheduler.run((helper) => {
				const pagination = service.getPagination$();

				helper.expectObservable(pagination).toBe('-');
			});
		});

		it('should disable previous and next button if total page count is 1', () => {
			testScheduler.run(({ expectObservable }) => {
				// arrange
				const pagination = service.getPagination$();

				// act
				service.updatePagination(1);

				// assert
				const expectedPagination: Pagination = {
					isPreviousButtonDisabled: true,
					isNextButtonDisabled: true,
					paginationItems: generatePaginationPageItems(1, 1),
				};
				expectObservable(pagination).toBe('a', {
					a: expectedPagination,
				});
			});
		});

		it('should enable next button if total page count is 2 and current page is 1', () => {
			testScheduler.run(({ expectObservable }) => {
				// arrange
				const pagination = service.getPagination$();

				// act
				service.updatePagination(2, 1);

				// assert
				const expectedPagination: Pagination = {
					isPreviousButtonDisabled: true,
					isNextButtonDisabled: false,
					paginationItems: generatePaginationPageItems(2, 1),
				};
				expectObservable(pagination).toBe('a', {
					a: expectedPagination,
				});
			});
		});

		it('should enable previous next button if current page is not the first or last page', () => {
			testScheduler.run(({ expectObservable }) => {
				// arrange
				const pagination = service.getPagination$();

				// act
				service.updatePagination(3, 2);

				// assert
				const expectedPagination: Pagination = {
					isPreviousButtonDisabled: false,
					isNextButtonDisabled: false,
					paginationItems: generatePaginationPageItems(3, 2),
				};
				expectObservable(pagination).toBe('a', {
					a: expectedPagination,
				});
			});
		});

		it('should return pagination with 9 page items if total page count is 9', () => {
			testScheduler.run(({ expectObservable }) => {
				// arrange
				const pagination = service.getPagination$();

				// act
				service.updatePagination(9);

				// assert
				const expectedPagination: Pagination = {
					isPreviousButtonDisabled: true,
					isNextButtonDisabled: false,
					paginationItems: generatePaginationPageItems(9, 1),
				};
				expectObservable(pagination).toBe('a', {
					a: expectedPagination,
				});
			});
		});

		it('should return pagination with 10 items with 1 accordion item as 5th element', () => {
			testScheduler.run(({ expectObservable }) => {
				// arrange
				const currentPage = 1;
				const pagination = service.getPagination$();

				// act
				service.updatePagination(10, currentPage);

				// assert
				const expectedPagination: Pagination = {
					isPreviousButtonDisabled: true,
					isNextButtonDisabled: false,
					paginationItems: [
						...generatePaginationPageItems(4, currentPage, 1),
						{
							pageNumber: 6,
							current: false,
							type: PaginationItemType.ACCORDION,
						},
						...generatePaginationPageItems(4, currentPage, 7),
					],
				};
				expectObservable(pagination).toBe('a', {
					a: expectedPagination,
				});
			});
		});

		it('should return pagination with 10 items with 2 accordion item as 2nd and 2nd to last element when current page is 5', () => {
			testScheduler.run(({ expectObservable }) => {
				// arrange
				const currentPage = 5;
				const pagination = service.getPagination$();

				// act
				service.updatePagination(10, currentPage);

				// assert
				const expectedPagination: Pagination = {
					isPreviousButtonDisabled: false,
					isNextButtonDisabled: false,
					paginationItems: [
						{
							pageNumber: 1,
							current: false,
							type: PaginationItemType.PAGE,
						},
						{
							pageNumber: 2,
							current: false,
							type: PaginationItemType.ACCORDION,
						},
						...generatePaginationPageItems(5, currentPage, 3),
						{
							pageNumber: 9,
							current: false,
							type: PaginationItemType.ACCORDION,
						},
						{
							pageNumber: 10,
							current: false,
							type: PaginationItemType.PAGE,
						},
					],
				};
				expectObservable(pagination).toBe('a', {
					a: expectedPagination,
				});
			});
		});
	});
});

const generatePaginationPageItems = (
	pageCount: number,
	current: number = 0,
	from: number = 1
): Array<PaginationItem> => {
	return Array.from({ length: pageCount }, (_, i) => i + from).map(
		(pageNumber) => ({
			type: PaginationItemType.PAGE,
			current: current === pageNumber,
			pageNumber,
		})
	);
};
