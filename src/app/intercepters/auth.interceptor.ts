import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
} from '@angular/common/http';
import { from, Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private authService: AuthService) {}

	public intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		return this.authService.getUser().pipe(
			switchMap((user) => {
				if (!user) {
					return of(null);
				}
				return from(user.getIdToken());
			}),
			switchMap((token) => {
				if (!token) {
					return next.handle(request);
				}

				const requestWithHeader = request.clone({
					headers: request.headers.set(
						'Authorization',
						`Bearer ${token}`
					),
				});

				return next.handle(requestWithHeader);
			})
		);
	}
}
