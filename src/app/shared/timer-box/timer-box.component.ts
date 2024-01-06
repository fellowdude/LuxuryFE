import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer-box',
  templateUrl: './timer-box.component.html',
  styleUrls: ['./timer-box.component.scss'],
})
export class TimerBoxComponent implements OnInit {
  @Input() counter: number = 0;
  @Input() tag: string = null;
  @Input() tagMobile: string = null;

  constructor() {}

	ngOnInit(): void {
		this.tagMobile = this.tagMobile || this.tag;
	}
}
