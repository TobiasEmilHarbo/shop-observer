import { Component, Input } from '@angular/core';
import Item from 'functions/src/domain/Item';
import Page from 'functions/src/domain/Page';

@Component({
	selector: 'app-search-result-page',
	templateUrl: './search-result-page.component.html',
	styleUrls: ['./search-result-page.component.scss'],
})
export class SearchResultPageComponent {
	@Input() public page!: Page<Item>;
}
