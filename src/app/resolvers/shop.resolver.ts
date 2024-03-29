import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, catchError, of } from 'rxjs';
import { Param, Route } from '../app-routing.module';
import { ShopsService } from '@services/shops.service';
import { Shop } from '@models/Shop.model';

@Injectable({
	providedIn: 'root',
})
export class ShopResolver {
	constructor(private router: Router, private shopService: ShopsService) {}

	public resolve(route: ActivatedRouteSnapshot): Observable<Shop> {
		const shopId: string = route.params[Param.SHOP_ID];

		return this.shopService.getShop(shopId).pipe(
			catchError((error) => {
				console.error(error);
				this.router.navigate([Route.SHOPS, '9d1tQD9mw4CEetutLv7c']);
				return EMPTY;
			})
		);
	}
}
