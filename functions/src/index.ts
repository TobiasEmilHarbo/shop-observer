import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import shopApi from './api/v1/shopApi';
import auth from './middleware/auth.middleware';
import ShopObserver from './services/ShopObserver';

admin.initializeApp();

export * as searchQueries from './collections/searchQuery';
export * as observationQueue from './collections/observationQueue';
// export * as scheduler from './schedulers';

const shopObserver = new ShopObserver();

const v1 = express();
const main = express();

shopApi(v1);

main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
main.use(
	cors({ origin: ['http://localhost:4200', 'https://shop-observer.web.app'] })
);
main.use('/v1', auth, v1);

main.use('/check-saved-search-queries', async (_, response) => {
	await shopObserver.queueSearchQueriesForInspection();
	return response.send('Done');
});

export const api = functions.region('europe-west1').https.onRequest(main);
