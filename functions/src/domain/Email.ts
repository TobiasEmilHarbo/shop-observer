/* eslint-disable semi */
import Notification from './Notification';

export default interface Email {
	toUids: Array<string>;
	template: {
		name: string;
		data: Notification;
	};
}
