import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Collection } from '../domain/Collection';
const database = admin.firestore();

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
	database.collection(Collection.USERS).doc(user.uid).set({
		email: user.email,
	});
});
