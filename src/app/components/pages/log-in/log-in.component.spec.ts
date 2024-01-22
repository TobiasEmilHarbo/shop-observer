import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInComponent } from './log-in.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('LogInComponent', () => {
	let component: LogInComponent;
	let fixture: ComponentFixture<LogInComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [LogInComponent],
			imports: [RouterModule.forRoot([]), ReactiveFormsModule],
			providers: [{ provide: AuthService, useValue: {} }],
		}).compileComponents();

		fixture = TestBed.createComponent(LogInComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
