import { TestBed } from '@angular/core/testing';

import { ShopsService } from './shops.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ShopsService', () => {
	let service: ShopsService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: AngularFirestore,
					useValue: {},
				},
			],
			imports: [HttpClientTestingModule],
		});
		service = TestBed.inject(ShopsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
