import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFrequentlyQuestionsPage } from 'src/app/models/frequently-questions.model';

@Component({
  selector: 'app-frequently-questions',
  templateUrl: './frequently-questions.component.html',
  styleUrls: ['./frequently-questions.component.scss'],
})
export class FrequentlyQuestionsComponent implements OnInit {
  frequentlyQuestionsPage: IFrequentlyQuestionsPage;
  answersOpen: number[] = [];

  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.frequentlyQuestionsPage = this.activeRoute.snapshot.data.resolve;
  }

  // toggleAnswer(idx: number) {
  //   if (this.isInAnswersOpen(idx)) {
  //     const indexInArray = this.answersOpen.indexOf(idx);
  //     this.answersOpen.splice(indexInArray, 1);
  //   } else {
  //     this.answersOpen.push(idx);
  //   }
  // }

  // isInAnswersOpen(idx: number) {
  //   return this.answersOpen.includes(idx);
  // }
}
