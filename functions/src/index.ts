import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as functions from 'firebase-functions';
import shopApi from './api/v1/shopApi';

const v1 = express();
const main = express();

shopApi(v1);

main.use('/v1', v1);
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

export const api = functions.region('europe-west1').https.onRequest(main);
