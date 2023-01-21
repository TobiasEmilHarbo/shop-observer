import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { from, map, Observable, take } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private user$!: Observable<firebase.default.User | null>;

	constructor(
		public angularFireAuth: AngularFireAuth,
		private router: Router
	) {
		this.user$ = this.angularFireAuth.authState;
	}

	public signUp(email: string, password: string) {
		return from(
			this.angularFireAuth.createUserWithEmailAndPassword(email, password)
		).pipe(take(1));
	}

	public logIn(email: string, password: string) {
		return from(
			this.angularFireAuth.signInWithEmailAndPassword(email, password)
		).pipe(take(1));
	}

	public isLoggedIn(): Observable<boolean> {
		return this.user$.pipe(map((user) => !!user));
	}

	public async signOut(): Promise<void> {
		await this.angularFireAuth.signOut();
		this.router.navigate(['/log-in']);
	}
}
