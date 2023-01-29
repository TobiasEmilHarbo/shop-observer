/* eslint-disable semi */
import Email from './Email';

export default interface EmailDelivery extends Email {
	delivery: {
		attempts: number;
		state: 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'ERROR';
	};
}
