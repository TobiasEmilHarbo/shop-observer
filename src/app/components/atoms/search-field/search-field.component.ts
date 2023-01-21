import {
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
} from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
	selector: 'app-search-field',
	templateUrl: './search-field.component.html',
	styleUrls: ['./search-field.component.scss'],
})
export class SearchFieldComponent implements OnInit, OnDestroy {
	@Output()
	public doSearch = new EventEmitter<string>();
	@Input()
	public debounceTime: number = 400;

	public debouncer = new Subject<string>();
	public queryString!: string;

	public ngOnInit(): void {
		this.debouncer
			.pipe(debounceTime(this.debounceTime), distinctUntilChanged())
			.subscribe((value) => {
				this.doSearch.emit(value);
			});
	}

	public ngOnDestroy(): void {
		this.debouncer.unsubscribe();
	}
}
