import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

	constructor(private authService: AuthService) {
		this.authService.isLoggedIn().subscribe((value) => {
			console.log('IS LOGGED IN', value);
		});
	}

	public onSubmit(): void {
		console.log('SIGN UP', this.signUpForm.value);

		const { email, password } = this.signUpForm.value;

		if (!email || !password) {
			return;
		}

		this.authService.signUp(email, password).subscribe((result) => {
			console.log(result);
		});
	}
}
