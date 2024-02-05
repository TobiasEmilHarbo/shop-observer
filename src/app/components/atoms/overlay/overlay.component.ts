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
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverlayComponent {
	@Output() public dismiss = new EventEmitter();

	constructor(private hostElement: ElementRef) {}

	public onClick($event: MouseEvent) {
		console.log($event.target, this.hostElement.nativeElement);
	}
}
