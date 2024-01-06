import { Component, Input, OnInit } from '@angular/core';
import { IExperienceCard } from 'src/app/models/company.model';

@Component({
  selector: 'app-experience-card',
  templateUrl: './experience-card.component.html',
  styleUrls: ['./experience-card.component.scss'],
})
export class ExperienceCardComponent implements OnInit {
  @Input() experience: IExperienceCard;

  constructor() {}

  ngOnInit(): void {}
}
