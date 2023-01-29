import * as functions from 'firebase-functions';
import ShopObserver from '../services/ShopObserver';

const shopObserver = new ShopObserver();

export default functions.pubsub
	// .schedule('*/263 * * * *')
	.schedule('*/3 * * * *')
	.onRun(async (context) => {
		console.log('Scheduler says hello!', context);
		await shopObserver.queueSearchQueriesForInspection();
	});
