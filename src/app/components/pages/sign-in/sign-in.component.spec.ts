import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import { AuthService } from '@services/auth.service';
import { NEVER } from 'rxjs';
import { SvgIconComponent } from '../../atoms/svg-icon/svg-icon.component';
import { PageLogoComponent } from '../../atoms/page-logo/page-logo.component';

describe('SignInComponent', () => {
	let component: SignInComponent;
	let fixture: ComponentFixture<SignInComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [
				SignInComponent,
				PageLogoComponent,
				SvgIconComponent,
			],
			providers: [
				{
					provide: AuthService,
					useValue: {
						userAuthentication$: NEVER,
					},
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(SignInComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
