import { Component, Input, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { BenefitFormComponent } from 'src/app/modals/benefit-form/benefit-form.component';
import { IContactInfo } from 'src/app/models/shared.model';
import { IPartnerBenefitsCompany } from 'src/app/resolvers/core/partner-benefits/company.resolver';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss'],
})
export class ContactInfoComponent implements OnInit {
  @Input() contactInfo: IContactInfo;
  @Input() highlight: boolean = false;
  @Input() companyInfo: IPartnerBenefitsCompany;
  modalRef: MDBModalRef;

  constructor(private modalService: MDBModalService) {}

  ngOnInit(): void {}

  openContactForm(_id: string) {
    this.modalRef = this.modalService.show(BenefitFormComponent, {
      animated: true,
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      class: 'modal-full-height modal-right mh-100 my-0',
      containerClass: 'right modal-dialog-scrollable mh-100 my-0',
      ignoreBackdropClick: false,
      data: {
        idForm: _id,
        companyInfo: this.companyInfo,
      },
    });
  }
}
