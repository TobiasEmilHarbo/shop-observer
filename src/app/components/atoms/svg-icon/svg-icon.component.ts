import { Component, HostBinding, Input } from '@angular/core';

@Component({
	selector: 'app-svg-icon',
	template: '',
	styleUrls: ['./svg-icon.component.scss'],
})
export class SvgIconComponent {
	@HostBinding('style.background')
	private _path: string = '';

	@Input()
	public set path(filePath: string) {
		this._path = `url("${filePath}")`;
	}
}
