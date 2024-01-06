import { Component, Input, OnInit } from '@angular/core';
import { IMagazinePrestigeCard } from 'src/app/models/magazine-prestige-card.model';

@Component({
  selector: 'app-magazine-prestige-card',
  templateUrl: './magazine-prestige-card.component.html',
  styleUrls: ['./magazine-prestige-card.component.scss'],
})
export class MagazinePrestigeCardComponent implements OnInit {
  @Input() magazinePrestigeCard: IMagazinePrestigeCard;
  constructor() {}

  ngOnInit(): void {}
}
