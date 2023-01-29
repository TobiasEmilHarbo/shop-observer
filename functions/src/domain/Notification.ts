import Item from './Item';

/* eslint-disable semi */
export default interface Notification {
	shopName: string;
	shopUrl: string;
	items: Array<Item>;
}
