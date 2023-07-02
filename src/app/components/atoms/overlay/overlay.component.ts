import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	Output,
} from '@angular/core';

@Component({
	selector: 'app-overlay',
	templateUrl: './overlay.component.html',
	styleUrls: ['./overlay.component.scss'],
	host: {
		'(click)': 'click($event)',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverlayComponent {
	@Output() public onClick = new EventEmitter();

	constructor(private hostElement: ElementRef) {}

	public click($event: PointerEvent) {
		if ($event.target === this.hostElement.nativeElement) {
			this.onClick.emit();
		}
	}
}
