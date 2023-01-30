import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Collection } from '../domain/Collection';
const datebase = admin.firestore();

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
	datebase.collection(Collection.USERS).doc(user.uid).set({
		email: user.email,
	});
});
