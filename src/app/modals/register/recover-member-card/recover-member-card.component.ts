import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ClipboardService } from 'ngx-clipboard';
import { Subject } from 'rxjs';
import { ILdV } from 'src/app/models/ldv.model';
import { LdvService } from 'src/app/services/ldv.service';
import { NEW_MEMBER_CARD } from '../new-member-card-form/new-member-card';
import * as KJUR from 'jsrsasign';
import { Constants } from 'src/app/constants';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-recover-member-card',
  templateUrl: './recover-member-card.component.html',
  styleUrls: ['./recover-member-card.component.scss']
})
export class RecoverMemberCardComponent implements OnInit {

  recoveryForm: FormGroup;
  typeDocList: Array<ILdV> = [];
  action: Subject<any> = new Subject();
  memberNumber: string = null;
  requested: boolean = false;
  loading: boolean = false;
  newModalRef: MDBModalRef;

  constructor(@Inject(NEW_MEMBER_CARD) private newMemberComponent: any, private loginService: LoginService, private modalRef: MDBModalRef, private ldVService: LdvService, private clipboardApi: ClipboardService, private modalService: MDBModalService) { }

  ngOnInit(): void {
    this.recoveryForm = new FormGroup({
      type_document: new FormControl(null, [Validators.required]),
      document: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12),
      ]),
    });
    this.loading = true;
    this.ldVService
      .getLdvDetail('TYPE-DOCUMENT-CUSTOMER')
      .subscribe((docResponse: Array<any>) => {
        this.typeDocList = docResponse;
        this.loading = false;
        this.recoveryForm.get('type_document').setValue(this.typeDocList?.[0]?._id);
      });
  }

  requestMemberNumber(): void{
    const oHeader = { alg: 'RS256', typ: 'JWT' };
    const oPayload: any = {};
    oPayload.type_document = this.recoveryForm.value.type_document;
    oPayload.number_document = this.recoveryForm.value.document;
    const sHeader = JSON.stringify(oHeader);
    const sPayload = JSON.stringify(oPayload);
    const sJWT = KJUR.jws.JWS.sign(
      'RS256',
      sHeader,
      sPayload,
      Constants.FRONT_KEY
    );

    this.loginService.recoverMemberNumber({ jwt: sJWT }).subscribe(
      (result: any) => {
        this.requested = true;
        if(result?.result){
          this.recoveryForm.reset();
          this.memberNumber = result?.result;
        }
      }
    );
  }

  copyMemberNumber(): void{
    this.clipboardApi.copyFromContent(this.memberNumber)
  }

  closeModal(): void {
    this.action.next(this.memberNumber);
    this.modalRef.hide();
  }

  wait(event: any):void{
    setTimeout( ()=>{
      event?.hide()
    }, 1000)
  }

  openNewMemberForm(): void{
    this.closeModal();
    this.newModalRef = this.modalService.show(this.newMemberComponent, {
      animated: true,
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      class:
        'modal-information modal-dialog modal-dialog-centered mw-popup-container',
      containerClass: 'modal fade d-flex justify-content-center d-md-block',
      ignoreBackdropClick: false,
      data: {
        previousData: this.recoveryForm.value
      }
    });
  }

  reset(): void{
    this.requested = false;
    this.memberNumber = null;
  }
}
