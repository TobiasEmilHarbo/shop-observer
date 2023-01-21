import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-log-in',
	templateUrl: './log-in.component.html',
	styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent {
	public logInForm = new FormGroup({
		email: new FormControl(''),
		password: new FormControl(''),
	});

	constructor(private authService: AuthService, private router: Router) {}

	public onSubmit(): void {
		const { email, password } = this.logInForm.value;

		if (!email || !password) {
			return;
		}

		this.authService.logIn(email, password).subscribe((result) => {
			this.router.navigate(['/']);
		});
	}
}
