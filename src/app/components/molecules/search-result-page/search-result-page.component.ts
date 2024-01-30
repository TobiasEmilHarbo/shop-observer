import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Item } from '@models/ShopItem.model';
import { Page } from '@models/Page.model';

@Component({
	selector: 'app-search-result-page',
	templateUrl: './search-result-page.component.html',
	styleUrls: ['./search-result-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultPageComponent {
	public items: Array<Item> = [];

	@Input() public set page(page: Page<Item> | null) {
		this.items = page?.items ?? [];
	}

	@Input() public isLoading: boolean = false;
}
