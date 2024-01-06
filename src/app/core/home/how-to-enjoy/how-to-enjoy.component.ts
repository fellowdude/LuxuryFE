import { Component, Input, OnInit } from '@angular/core';
import { IHowToEnjoy } from 'src/app/models/static-items.model';

@Component({
  selector: 'app-how-to-enjoy',
  templateUrl: './how-to-enjoy.component.html',
  styleUrls: ['./how-to-enjoy.component.scss'],
})
export class HowToEnjoyComponent implements OnInit {
  @Input() hteList: Array<IHowToEnjoy>;

  constructor() {}

  ngOnInit(): void {}
}
