import {
	ChangeDetectionStrategy,
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
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFieldComponent implements OnInit, OnDestroy {
	@Output() public doSearch = new EventEmitter<string>();
	@Input() public queryString: string | null = null;
	@Input() public debounceTime: number = 600;
	@Input() public placeholderText = 'Search';

	public debouncer = new Subject<string>();

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

	public clear(): void {
		this.doSearch.emit('');
	}
}
