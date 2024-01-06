import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IAddressInfo } from 'src/app/models/shared.model';

@Component({
  selector: 'app-map-card',
  templateUrl: './map-card.component.html',
  styleUrls: ['./map-card.component.scss']
})
export class MapCardComponent implements OnInit {

  @Input() data: IAddressInfo;
  @Input() position: number;
  @Output() newItemEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  changeLocation() {
    this.newItemEvent.emit(this.position);
  }

}
