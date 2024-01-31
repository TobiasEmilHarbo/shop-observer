import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, catchError, of } from 'rxjs';
import { Param, Route } from '../app-routing.module';
import { ShopsService } from '@services/shops.service';
import { Shop } from '@models/Shop.model';
import { WebshopId } from '@models/WebshopId';

@Injectable({
	providedIn: 'root',
})
export class ShopResolver {
	constructor(private router: Router, private shopService: ShopsService) {}

	public resolve(route: ActivatedRouteSnapshot): Observable<Shop> {
		const shopId: string = route.params[Param.SHOP_ID];
		if (shopId.toUpperCase() == WebshopId.MOCK) {
			return of({
				id: WebshopId.MOCK,
				url: 'mock.com',
				name: 'Mock store',
				logoUrl:
					'http://localhost:4200/assets/images/binoculars_64.png',
			});
		}

		return this.shopService.getShop(shopId).pipe(
			catchError((error) => {
				console.error(error);
				this.router.navigate([Route.HOME]);
				return EMPTY;
			})
		);
	}
}
