import { TestBed } from '@angular/core/testing';

import { GuestGuard } from './guest.guard';
import { AuthService } from '@services/auth.service';

describe('AuthGuard', () => {
	let guard: GuestGuard;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: AuthService,
					useValue: {},
				},
			],
		});
		guard = TestBed.inject(GuestGuard);
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});
});
