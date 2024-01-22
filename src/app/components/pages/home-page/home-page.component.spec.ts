import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../../../services/auth.service';
import { PaginationComponent } from '../../molecules/pagination/pagination.component';
import { SearchFieldComponent } from '../../atoms/search-field/search-field.component';
import { SearchResultPageComponent } from '../../molecules/search-result-page/search-result-page.component';
import { SearchQueryComponent } from '../../atoms/search-query/search-query.component';
import { NEVER } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('HomePageComponent', () => {
	let component: HomePageComponent;
	let fixture: ComponentFixture<HomePageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				HomePageComponent,
				SearchFieldComponent,
				SearchResultPageComponent,
				SearchQueryComponent,
				PaginationComponent,
			],
			imports: [HttpClientTestingModule, FormsModule],
			providers: [
				{
					provide: AuthService,
					useValue: {
						user$: NEVER,
					},
				},
				{
					provide: AngularFirestore,
					useValue: {},
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(HomePageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
