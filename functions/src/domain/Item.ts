export interface Item {
	id: string;
	name: string;
	url: string;
	imageUrl: string;
	price: string;
	currency: string;
	specifications: Array<{
		label: string;
		value: string;
	}>;
}
