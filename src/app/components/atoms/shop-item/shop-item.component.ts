import { Component, Input } from '@angular/core';
import { Item } from 'functions/src/domain/Item';

@Component({
	selector: 'app-shop-item',
	templateUrl: './shop-item.component.html',
	styleUrls: ['./shop-item.component.scss'],
})
export class ShopItemComponent {
	@Input() public item!: Item;
}
