import { WebshopId } from '../external/WebshopId';

export interface Shop {
	id: WebshopId;
	logoUrl: string;
	name: string;
	url: string;
}
