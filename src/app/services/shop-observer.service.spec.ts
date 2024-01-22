import { TestBed } from '@angular/core/testing';

import { ShopObserverService } from './shop-observer.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

describe('ShopObserverService', () => {
	let service: ShopObserverService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: AngularFirestore,
					useValue: {},
				},
				{
					provide: AngularFireAuth,
					useValue: {},
				},
			],
		});
		service = TestBed.inject(ShopObserverService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
