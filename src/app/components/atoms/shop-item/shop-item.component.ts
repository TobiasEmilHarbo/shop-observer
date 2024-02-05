import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Item } from '@models/ShopItem.model';

@Component({
	selector: 'app-shop-item',
	templateUrl: './shop-item.component.html',
	styleUrls: ['./shop-item.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopItemComponent {
	@Input() public item: Item | null = null;
}
