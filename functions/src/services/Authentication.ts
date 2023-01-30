import * as admin from 'firebase-admin';

export default class AuthenticationService {
	constructor(private auth = admin.auth()) {}
	public async hasUserVerifiedEmail(userId: string): Promise<boolean> {
		const user = await this.auth.getUser(userId);

		user.emailVerified;
		return true;
	}
}
