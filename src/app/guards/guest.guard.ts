import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '@services/auth.service';
import { Route } from '../app-routing.module';

@Injectable({
	providedIn: 'root',
})
export class GuestGuard {
	constructor(private authService: AuthService, private router: Router) {}

	public canActivate(): Observable<boolean> {
		return this.authService.userAuthentication$.pipe(
			take(1),
			map((isAuthenticated) => {
				if (isAuthenticated) {
					this.router.navigate([Route.SHOPS, '9d1tQD9mw4CEetutLv7c']);
				}
				return !isAuthenticated;
			})
		);
	}
}
