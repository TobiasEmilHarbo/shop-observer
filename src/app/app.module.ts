import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { BaseUrlInterceptor } from './intercepters/base-url.interceptor';
import { SearchFieldComponent } from './components/atoms/search-field/search-field.component';
import { FormsModule } from '@angular/forms';
import { ShopItemComponent } from './components/atoms/shop-item/shop-item.component';

@NgModule({
	declarations: [AppComponent, HomePageComponent, SearchFieldComponent, ShopItemComponent],
	imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: BaseUrlInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
