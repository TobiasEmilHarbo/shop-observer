import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { AuthService } from '@services/auth.service';
import { Route } from '../app-routing.module';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard {
	constructor(private authService: AuthService, private router: Router) {}

	public canActivate(): Observable<boolean> {
		return this.authService.userAuthentication$.pipe(
			take(1),
			tap((isAuthenticated) => {
				if (!isAuthenticated) {
					this.router.navigate([Route.SIGN_IN]);
				}
			})
		);
	}
}
