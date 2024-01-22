import { TestBed } from '@angular/core/testing';

import { ShopResolver } from './shop.resolver';
import { ShopsService } from '@services/shops.service';

describe('ShopResolver', () => {
	let resolver: ShopResolver;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: ShopsService,
					useValue: {},
				},
			],
		});
		resolver = TestBed.inject(ShopResolver);
	});

	it('should be created', () => {
		expect(resolver).toBeTruthy();
	});
});
