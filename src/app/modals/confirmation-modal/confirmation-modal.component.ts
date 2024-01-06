import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { IModalContent } from 'src/app/models/confirmation.model';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  content: IModalContent = null;
  action: Subject<boolean> = new Subject();

  constructor(private modalRef: MDBModalRef) { }

  ngOnInit(): void {
  }

  confirm(): void{
    this.action.next(true);
    this.hideModal();
  }

  deny(): void{
    this.action.next(false);
    this.hideModal();
  }

  hideModal(): void{
    this.modalRef.hide();
  }
}
