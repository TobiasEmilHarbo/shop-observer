import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFieldComponent } from './search-field.component';
import { FormsModule } from '@angular/forms';

describe('SearchFieldComponent', () => {
	let component: SearchFieldComponent;
	let fixture: ComponentFixture<SearchFieldComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SearchFieldComponent],
			imports: [FormsModule],
		}).compileComponents();

		fixture = TestBed.createComponent(SearchFieldComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
