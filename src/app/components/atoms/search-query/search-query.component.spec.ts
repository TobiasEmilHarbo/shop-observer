import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchQueryComponent } from './search-query.component';
import { SpinnerComponent } from '../spinner/spinner.component';

describe('SearchQueryComponent', () => {
	let component: SearchQueryComponent;
	let fixture: ComponentFixture<SearchQueryComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SearchQueryComponent, SpinnerComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(SearchQueryComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
