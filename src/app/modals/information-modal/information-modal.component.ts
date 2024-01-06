import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-information-modal',
  templateUrl: './information-modal.component.html',
  styleUrls: ['./information-modal.component.scss'],
  styles: [
  ],
})
export class InformationModalComponent implements OnInit {
  modalTitle: string = '';
  modalBody: string = '';
  innerBody: boolean = false;

  constructor(public modalRef: MDBModalRef) {}

  ngOnInit(): void {}

  hideModal(): void {
    this.modalRef.hide();
  }
}
