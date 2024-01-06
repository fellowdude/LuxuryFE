import { Component, Input, OnInit } from '@angular/core';
import { IMagazinePrestigeCard } from 'src/app/models/magazine-prestige-card.model';
import { ArticlesService } from 'src/app/services/articles.service';
import { ArticlesFormatService } from 'src/app/services/internal/articles-format.service';

@Component({
  selector: 'app-magazine-prestige-list',
  templateUrl: './magazine-prestige-list.component.html',
  styleUrls: ['./magazine-prestige-list.component.scss'],
})
export class MagazinePrestigeListComponent implements OnInit {
  magazinePrestigeList: IMagazinePrestigeCard[] = [];
  @Input() highlight: boolean = false;

  constructor(
    private articlesService: ArticlesService,
    private articlesFormatService: ArticlesFormatService
  ) {}

  ngOnInit(): void {
    this.articlesService
      .getArticles()
      .pipe()
      .subscribe((response: any) => {
        this.magazinePrestigeList = this.articlesFormatService.formatArticles(
          response
        );
      });
  }
}
