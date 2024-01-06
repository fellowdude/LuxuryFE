import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICardItem } from 'src/app/models/card-item.model';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { IValidationItem } from 'src/app/models/checkout.model';
import { CheckoutService } from 'src/app/services/checkout.service';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-card-select',
  templateUrl: './card-select.component.html',
  styleUrls: ['./card-select.component.scss']
})
export class CardSelectComponent implements OnInit {

  cardList: Array<ICardItem> = [];
  selectedCard: ICardItem;
  loading: boolean = false;
  modalRef: MDBModalRef;

  @Input() validationItem: IValidationItem;
  @Output() onClick = new EventEmitter<any>(true);

  constructor(private checkoutService: CheckoutService, private router: Router, private route: ActivatedRoute, private modalService: MDBModalService) { }

  ngOnInit(): void {

    this.router.navigate( [],
      {
        relativeTo: this.route,
        queryParams: { step: 'card-select' },
        queryParamsHandling: 'merge',
        replaceUrl: true
      }
    );
    this.initialize();
  }

  initialize(): void {
    this.loading = true;
    this.checkoutService.getUserCards().pipe().subscribe((response)=>{
      this.cardList = response;
      this.cardList.forEach((e) => {
        e.checked = false;
        e.cvv = new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(4)])
      });
      this.onClick.emit({
        noToken: true,
        card: null
      });

      this.loading = false;
    })
  }

  changeChecked(event): void {
    this.cardList.forEach((e, i) => {
      e.checked = false;
      if(event != i)
        e.cvv?.setValue(null, { emitEvent: false });
    });
    this.cardList[event].checked = true;
    this.selectedCard = this.cardList[event];
    this.onClick.emit({
      noToken: true,
      card: this.selectedCard
    });
  }

  otherPaymentMethod(): void {
    this.onClick.emit({
      noToken: false
    });
  }

  deletedCard(event): void {
    this.initialize();
  }

}
