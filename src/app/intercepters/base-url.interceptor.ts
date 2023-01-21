import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
	public intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		const baseUrl = environment.apiBase;
		const requestWithBaseUrl = request.clone({
			url: `${baseUrl}${request.url}`,
		});
		return next.handle(requestWithBaseUrl);
	}
}
