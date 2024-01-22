import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopPageComponent } from './shop-page.component';
import { RouterModule } from '@angular/router';
import { ShopsService } from '@services/shops.service';
import { ShopObserverService } from '@services/shop-observer.service';
import { NEVER } from 'rxjs';
import { SearchFieldComponent } from '../../atoms/search-field/search-field.component';
import { PaginationComponent } from '../../molecules/pagination/pagination.component';
import { SearchResultPageComponent } from '../../molecules/search-result-page/search-result-page.component';
import { ObservedQueriesComponent } from '../../molecules/observed-queries/observed-queries.component';
import { FormsModule } from '@angular/forms';

describe('ShopPageComponent', () => {
	let component: ShopPageComponent;
	let fixture: ComponentFixture<ShopPageComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				ShopPageComponent,
				SearchFieldComponent,
				PaginationComponent,
				SearchResultPageComponent,
				ObservedQueriesComponent,
			],
			imports: [RouterModule.forRoot([]), FormsModule],
			providers: [
				{ provide: ShopsService, useValue: {} },
				{
					provide: ShopObserverService,
					useValue: {
						getObservedSearchOfUser: () => NEVER,
					},
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(ShopPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
