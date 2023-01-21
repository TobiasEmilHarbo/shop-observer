import * as express from 'express';
import * as admin from 'firebase-admin';

export default async (
	request: express.Request,
	response: express.Response,
	next: express.NextFunction
): Promise<void> => {
	const token = request.headers.authorization?.replace('Bearer ', '');

	if (!token) {
		response.status(401).send();
		return;
	}

	admin
		.auth()
		.verifyIdToken(token)
		.then(() => {
			next();
		})
		.catch(() => response.status(401).send());
};
