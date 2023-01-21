import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { BaseUrlInterceptor } from './intercepters/base-url.interceptor';
import { SearchFieldComponent } from './components/atoms/search-field/search-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShopItemComponent } from './components/atoms/shop-item/shop-item.component';
import { environment } from 'src/environment/environment';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { SignUpComponent } from './components/pages/sign-up/sign-up.component';
import { LogInComponent } from './components/pages/log-in/log-in.component';

@NgModule({
	declarations: [
		AppComponent,
		HomePageComponent,
		SearchFieldComponent,
		ShopItemComponent,
		SignUpComponent,
  LogInComponent,
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
			provide: HTTP_INTERCEPTORS,
			useClass: BaseUrlInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
