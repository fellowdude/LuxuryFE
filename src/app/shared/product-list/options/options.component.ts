import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {
  @Input() option: string = '0';
  @Input() total: number = 0;
  @Input() options: Array<any>;
  @Output() onClick = new EventEmitter(true);

  constructor() { }

  ngOnInit(): void {
  }

}
