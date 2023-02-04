import { Cheerio, CheerioAPI, Element, load } from 'cheerio';
import Item from '../../../domain/Item';
import Page from '../../../domain/Page';
import Price from '../../../domain/Price';

export default class KlaravikMapper {
	constructor(private host: string) {}

	public toItemListPage(dom: Cheerio<Element>): Page<Item> {
		const items = this.toItemList(dom);

		const number = dom.find('div.pagination a.selected').first().text();

		const size = dom
			.find('select.select_page')
			.first()
			.find('option[selected]')
			.text();

		const paginationDom = dom.find('div.pagination').first();

		const textOfLastPaginationButton = paginationDom
			.find('li:last-child a')
			.text();

		const textOfSecondLastPaginationButton = paginationDom
			.find('li:nth-last-child(2) a')
			.text();

		const totalPage =
			textOfLastPaginationButton !== '>'
				? textOfLastPaginationButton
				: textOfSecondLastPaginationButton;

		return {
			items: items,
			size: parseInt(size),
			number: parseInt(number),
			totalPages: parseInt(totalPage),
		};
	}

	public toItemList(dom: Cheerio<Element>): Array<Item> {
		const itemElements = dom
			.find('div#listing_wrapper ul')
			.children()
			.toArray();
		return itemElements.map((element) => {
			const itemDom = load(element);

			const id = this.getId(itemDom);
			const name = this.getName(itemDom);
			const url = this.getUrl(itemDom);
			const imageUrl = this.getImageUrl(itemDom);
			const { price, currency } = this.getPrice(itemDom);

			const make = this.getMake(itemDom);
			const location = this.getLocation(itemDom);
			const bidCount = this.getBidCount(itemDom);
			const endsIn = this.endsIn(itemDom);

			return {
				id,
				name,
				url,
				imageUrl,
				price,
				currency,
				specifications: [
					{
						label: 'Område',
						value: location,
					},
					{
						label: 'Mærke',
						value: make,
					},
					{
						label: 'Antal bud',
						value: bidCount,
					},
					{
						label: 'Afsluttes om',
						value: endsIn,
					},
				],
			};
		});
	}

	private getPrice(itemDom: CheerioAPI): Price {
		const highestBid = itemDom('div.highestBid').text();
		const currency = highestBid.split(' ').at(-1) as string;
		const price = highestBid
			.substring(0, highestBid.lastIndexOf(' '))
			.replace(' ', '');

		return {
			price,
			currency,
		};
	}

	private endsIn(itemDom: CheerioAPI): string {
		return itemDom('div.closeBox').text().trim();
	}

	private getLocation(itemDom: CheerioAPI): string {
		return itemDom('span.objectModel').text();
	}

	private getMake(itemDom: CheerioAPI): string {
		return itemDom('span.objectMaker').text();
	}

	private getBidCount(itemDom: CheerioAPI): string {
		return itemDom('div.noOfBids strong')
			.text()
			.replace('\n', '')
			.replace('\n', ' ')
			.trim();
	}

	private getId(itemDom: CheerioAPI): string {
		return itemDom('div.listingBox')
			.attr('id')
			?.replace('object_li_', '') as string;
	}

	private getImageUrl(itemDom: CheerioAPI): string {
		return `${this.host}${load(itemDom('div.listingBox a noscript').text())(
			'img'
		).attr('src')}`;
	}

	private getName(itemDom: CheerioAPI): string {
		return itemDom('span.objectTitle').text();
	}

	private getUrl(itemDom: CheerioAPI): string {
		return `${this.host}${itemDom('a').attr('href')}`;
	}
}
