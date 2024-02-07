import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseUrlInterceptor } from './interceptors/base-url.interceptor';
import { SearchFieldComponent } from './components/atoms/search-field/search-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShopItemComponent } from './components/atoms/shop-item/shop-item.component';
import { environment } from 'src/environments/environment';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import {
	AngularFirestoreModule,
	USE_EMULATOR as USE_FIRESTORE_EMULATOR,
	SETTINGS as FIRESTORE_SETTINGS,
} from '@angular/fire/compat/firestore';
import { USE_EMULATOR as USE_FUNCTIONS_EMULATOR } from '@angular/fire/compat/functions';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { SearchQueryComponent } from './components/atoms/search-query/search-query.component';
import { SearchResultPageComponent } from './components/molecules/search-result-page/search-result-page.component';
import { ShopPageComponent } from './components/pages/shop-page/shop-page.component';
import { OverlayComponent } from './components/atoms/overlay/overlay.component';
import { ObservedQueriesComponent } from './components/molecules/observed-queries/observed-queries.component';
import { PaginationComponent } from './components/molecules/pagination/pagination.component';
import { PaginationItemComponent } from './components/molecules/pagination-item/pagination-item.component';
import { PageLogoComponent } from './components/atoms/page-logo/page-logo.component';
import { EmptyStateSearchComponent } from './components/atoms/empty-state-search/empty-state-search.component';
import { SpinnerComponent } from './components/atoms/spinner/spinner.component';

import firebaseConfig from 'firebase.json';
import { ObservedSearchQueryAsideComponent } from './components/molecules/observed-search-query-aside/observed-search-query-aside.component';
import { SignInComponent } from './components/pages/sign-in/sign-in.component';
import { SvgIconComponent } from './components/atoms/svg-icon/svg-icon.component';

@NgModule({
	declarations: [
		AppComponent,
		SearchFieldComponent,
		ShopItemComponent,
		SearchQueryComponent,
		SearchResultPageComponent,
		ShopPageComponent,
		OverlayComponent,
		ObservedQueriesComponent,
		PaginationComponent,
		PaginationItemComponent,
		PageLogoComponent,
		EmptyStateSearchComponent,
		SpinnerComponent,
		ObservedSearchQueryAsideComponent,
		SignInComponent,
		SvgIconComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireAuthModule,
		AngularFirestoreModule,
		AngularFireStorageModule,
		AngularFireDatabaseModule,
	],
	providers: [
		{
			provide: FIRESTORE_SETTINGS,
			useValue: { ignoreUndefinedProperties: true },
		},
		{
			provide: USE_FIRESTORE_EMULATOR,
			useValue: !environment.production
				? ['localhost', firebaseConfig.emulators.firestore.port]
				: undefined,
		},
		{
			provide: USE_FUNCTIONS_EMULATOR,
			useValue: !environment.production
				? ['localhost', firebaseConfig.emulators.functions.port]
				: undefined,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: BaseUrlInterceptor,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
