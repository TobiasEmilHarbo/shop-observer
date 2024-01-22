import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { AuthService } from '@services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('SignUpComponent', () => {
	let component: SignUpComponent;
	let fixture: ComponentFixture<SignUpComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [SignUpComponent],
			imports: [ReactiveFormsModule, FormsModule],
			providers: [
				{
					provide: AuthService,
					useValue: {},
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(SignUpComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
