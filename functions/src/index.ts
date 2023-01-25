import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import shopApi from './api/v1/shopApi';
import auth from './middleware/auth.middleware';

export * as searchQueries from './collections/searchQuery';

admin.initializeApp();

const v1 = express();
const main = express();

shopApi(v1);

main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
main.use(
	cors({ origin: ['http://localhost:4200', 'https://shop-observer.web.app'] })
);
main.use('/v1', auth, v1);

export const api = functions.region('europe-west1').https.onRequest(main);
