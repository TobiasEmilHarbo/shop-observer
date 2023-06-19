import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { LogInComponent } from './components/pages/log-in/log-in.component';
import { SignUpComponent } from './components/pages/sign-up/sign-up.component';
import { AuthGuard } from './guards/auth.guard';
import { ShopPageComponent } from './components/pages/shop-page/shop-page.component';
import { ShopResolver } from './resolvers/shop.resolver';

export enum Param {
	SHOP_ID = 'shopId',
}

export enum Route {
	HOME = '',
	SHOPS = 'shops',
}

const routes: Routes = [
	{
		path: Route.HOME,
		component: HomePageComponent,
		canActivate: [AuthGuard],
	},
	{
		path: `${Route.SHOPS}/:${Param.SHOP_ID}`,
		component: ShopPageComponent,
		canActivate: [AuthGuard],
		resolve: {
			shop: ShopResolver,
		},
	},
	{ path: 'sign-up', component: SignUpComponent },
	{ path: 'log-in', component: LogInComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
