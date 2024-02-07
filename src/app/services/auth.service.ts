import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { filter, from, map, Observable, take } from 'rxjs';
import { existsGuard } from '../util';
import { Route } from '../app-routing.module';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private _user$!: Observable<firebase.default.User | null>;

	constructor(
		public angularFireAuth: AngularFireAuth,
		private router: Router
	) {
		this._user$ = this.angularFireAuth.authState;
	}

	public get user$(): Observable<firebase.default.User> {
		return this._user$.pipe(filter(existsGuard));
	}

	public signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		this.angularFireAuth.signInWithPopup(provider);
	}

	public get userAuthentication$(): Observable<boolean> {
		return this._user$.pipe(map((user) => !!user));
	}

	public async signOut(): Promise<void> {
		await this.angularFireAuth.signOut();
		this.router.navigate([Route.SIGN_IN]);
	}
}
