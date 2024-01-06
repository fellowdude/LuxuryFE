import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-additional-ad',
  templateUrl: './additional-ad.component.html',
  styleUrls: ['./additional-ad.component.scss']
})
export class AdditionalAdComponent implements OnInit {

  @Input() imageURL: string;
  @Input() link: string;
  @Input() internal: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  sendToPage(): void {
    if (this.link && this.link != '') {
      if (this.internal) {
        this.router.navigate([this.link]);
      } else {
        window.open(this.link, '_blank').focus();
      }
    }
  }

}
