import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ICardItem } from 'src/app/models/card-item.model';
import { IModalContent } from 'src/app/models/confirmation.model';
import { CheckoutService } from 'src/app/services/checkout.service';
import { ConfirmationModalComponent } from '../../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-checkout-card-item',
  templateUrl: './checkout-card-item.component.html',
  styleUrls: ['./checkout-card-item.component.scss']
})
export class CheckoutCardItemComponent implements OnInit {

  modalRef: MDBModalRef;
  @Input() card: ICardItem;
  @Input() position: number;
  @Output() onClick = new EventEmitter<number>();
  @Output() onDelete = new EventEmitter<any>();

  modalContent: IModalContent = {
    title: 'Confirmación',
    icon: 'exclamation',
    text: '¿Desea eliminar esta tarjeta?',
    type: 'warning',
  };

  @ViewChild("cvvInput") cvvInput: ElementRef;

  constructor(private checkoutService: CheckoutService, private modalService: MDBModalService) { }

  ngOnInit(): void {
    this.card?.cvv?.valueChanges.subscribe((response)=>{
      this.onClick.emit(this.position);
      if(this.card?.cvv?.valid)
        this.cvvInput.nativeElement.blur();
    })
  }

  radioChange(event): void{
    this.card?.cvv?.reset();
    this.cvvInput.nativeElement.focus();
    this.onClick.emit(this.position);
  }

  deleteCard(){
    this.modalRef = this.modalService.show(ConfirmationModalComponent,{
      animated: true,
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      class: 'modal-dialog modal-dialog-centered',
      containerClass: 'modal fade',
      ignoreBackdropClick: false,
      data: {
        content: this.modalContent
      }
    })

    this.modalRef.content?.action?.subscribe((result) => {
      if(result){{
        this.checkoutService.deleteUserCard(this.card._id).subscribe(
          (result)=>{
            this.onDelete.emit();
          }
        )
      }}
    });
  }

}
