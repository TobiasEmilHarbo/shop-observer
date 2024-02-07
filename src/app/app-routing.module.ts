import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ShopPageComponent } from './components/pages/shop-page/shop-page.component';
import { ShopResolver } from './resolvers/shop.resolver';
import { SignInComponent } from './components/pages/sign-in/sign-in.component';

export enum Param {
	SHOP_ID = 'shopId',
}

export enum Route {
	SHOPS = 'shops',
	SIGN_IN = 'sign-in',
}

const routes: Routes = [
	{
		path: `${Route.SHOPS}/:${Param.SHOP_ID}`,
		component: ShopPageComponent,
		canActivate: [AuthGuard],
		resolve: {
			shop: ShopResolver,
		},
	},
	{ path: Route.SIGN_IN, component: SignInComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
