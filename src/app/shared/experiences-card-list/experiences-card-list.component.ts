import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IExperienceCard } from 'src/app/models/company.model';

@Component({
  selector: 'app-experiences-card-list',
  templateUrl: './experiences-card-list.component.html',
  styleUrls: ['./experiences-card-list.component.scss'],
})
export class ExperiencesCardListComponent implements OnInit {
  @Input() experiencesCards: IExperienceCard[];

  constructor() {}

  ngOnInit(): void {}
}
