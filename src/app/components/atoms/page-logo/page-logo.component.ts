import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-page-logo',
	templateUrl: './page-logo.component.html',
	styleUrl: './page-logo.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLogoComponent {}
