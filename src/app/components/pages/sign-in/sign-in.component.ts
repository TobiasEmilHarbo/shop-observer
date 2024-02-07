import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { first } from 'rxjs';
import { Router } from '@angular/router';
import { Route } from '../../../app-routing.module';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
	constructor(private authService: AuthService, private router: Router) {
		const userAuthenticationSubscription =
			this.authService.userAuthentication$
				.pipe(first((auth) => !!auth))
				.subscribe(() => {
					this.router.navigate([Route.SHOPS, '9d1tQD9mw4CEetutLv7c']);
					userAuthenticationSubscription.unsubscribe();
				});
	}

	public signInWithGoogle(): void {
		this.authService.signInWithGoogle();
	}
}
