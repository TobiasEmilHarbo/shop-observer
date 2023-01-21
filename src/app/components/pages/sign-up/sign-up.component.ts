import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
	public signUpForm = new FormGroup({
		email: new FormControl(''),
		password: new FormControl(''),
	});

	constructor(private authService: AuthService, private router: Router) {}

	public onSubmit(): void {
		const { email, password } = this.signUpForm.value;

		if (!email || !password) {
			return;
		}

		this.authService.signUp(email, password).subscribe(() => {
			this.router.navigate(['/']);
		});
	}
}
