import * as functions from 'firebase-functions';
import ShopObserver from '../services/ShopObserver';

const shopObserver = new ShopObserver();

export default functions.pubsub
	.schedule('37 6/7 * * *') // https://crontab.guru/#37_6/7_*_*_*
	.onRun(async (context) => {
		console.log('Scheduler says hello!', context);
		await shopObserver.queueSearchQueriesForInspection();
	});
