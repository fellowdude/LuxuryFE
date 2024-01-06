import { Component, OnInit } from '@angular/core';
import { InternalService } from 'src/app/services/internal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mobile-search-input',
  templateUrl: './mobile-search-input.component.html',
  styleUrls: ['./mobile-search-input.component.scss']
})
export class MobileSearchInputComponent implements OnInit {

  internalSubscription: Subscription;
  visible: boolean;

  constructor(
    private internalService: InternalService
  ) { }

  ngOnInit(): void {
    this.internalSubscription = this.internalService.currentMessage.pipe().subscribe((message: any) => {
      if (message.type == 'HIDE_MOBILE_SEARCH_INPUT') {
        this.hideSearchInput();
      }
      if (message.type == 'SHOW_MOBILE_SEARCH_INPUT') {
        this.showSearchInput();
      }
    });
  }

  hideSearchInput() {
    this.visible = false;
  }

  showSearchInput() {
    this.visible = true;
  }

}
