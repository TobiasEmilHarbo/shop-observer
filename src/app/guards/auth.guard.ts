import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { AuthService } from '@services/auth.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard {
	constructor(private authService: AuthService, private router: Router) {}

	public canActivate(): Observable<boolean> {
		return this.authService.isLoggedIn().pipe(
			take(1),
			tap((isLoggedIn) => {
				if (!isLoggedIn) {
					this.router.navigate(['sign-up']);
				}
			})
		);
	}
}
