import { Component, Input } from '@angular/core';
import { Item } from '@models/Item.model';

@Component({
	selector: 'app-shop-item',
	templateUrl: './shop-item.component.html',
	styleUrls: ['./shop-item.component.scss'],
})
export class ShopItemComponent {
	@Input() public item: Item | null = null;
}
