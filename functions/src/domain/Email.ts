/* eslint-disable semi */
import Notification from './Notification';

export default interface Email {
	to: string | undefined;
	template: {
		name: string;
		data: Notification;
	};
}
