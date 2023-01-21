import { Component, OnInit } from '@angular/core';
import { Item } from 'functions/src/domain/Item';
import { Page } from 'functions/src/domain/Page';
import { map, Observable } from 'rxjs';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
	public items!: Observable<Array<Item>>;

	constructor(private http: HttpClientService) {}

	public ngOnInit(): void {
		this.items = this.http
			.searchShop('KLARAVIK')
			.pipe(map((page: Page<Item>) => page.items));
	}
}
