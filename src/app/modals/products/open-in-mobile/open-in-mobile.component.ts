import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-open-in-mobile',
  templateUrl: './open-in-mobile.component.html',
  styleUrls: ['./open-in-mobile.component.scss']
})
export class OpenInMobileComponent implements OnInit {

  type: string = null;
  action: Subject<any> = new Subject();

  constructor(private modalRef: MDBModalRef) { }

  ngOnInit(): void {
  }

  confirm(): void{
    this.action.next(true);
    this.closeModal();
  }

  deny(): void{
    this.action.next(false);
    this.closeModal();
  }

  closeModal(): void {
    this.modalRef.hide();
  }

}
