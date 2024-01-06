import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IExperienceCard } from 'src/app/models/company.model';

@Component({
  selector: 'app-experiences-list-pageable',
  templateUrl: './experiences-list-pageable.component.html',
  styleUrls: ['./experiences-list-pageable.component.scss'],
})
export class ExperiencesListPageableComponent implements OnInit {
  @Input() currentPage: number = 0;
  @Input() experiencesCards: IExperienceCard[];
  @Input() totalFound: number = 0;
  @Input() pages: number = 0;
  @Output() onPageClick = new EventEmitter(true);

  constructor() {}

  ngOnInit(): void {
    if(!this.currentPage) this.currentPage = 1;
  }

  changePage(event: number): void {
    this.currentPage = event;
    this.onPageClick.emit(event);
  }
}
