import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { INewMemberModal, IStaticPageNewMember } from 'src/app/models/contact-modal.model';
import { ILdV } from 'src/app/models/ldv.model';
import { EmailFormService, IEmailBody } from 'src/app/services/email-form.service';
import { NewMemberTransformService } from 'src/app/services/internal/new-member-transform.service';
import { StaticPageService } from 'src/app/services/static-page.service';

@Component({
  selector: 'app-new-member-card-form',
  templateUrl: './new-member-card-form.component.html',
  styleUrls: ['./new-member-card-form.component.scss']
})
export class NewMemberCardFormComponent implements OnInit {

  previousData: any = null;
  newMemberForm: FormGroup;
  typeDocList: Array<ILdV> = [];
  loading: boolean = false;
  requested: boolean = false;
  group: {};
  newMemberModal: INewMemberModal;

  constructor(private modalRef: MDBModalRef, private staticPageService: StaticPageService, private emailFormService: EmailFormService, private newMemberTransformService: NewMemberTransformService) { }

  ngOnInit(): void {
    this.loading = true;
    this.staticPageService
      .getPublicStaticPage('formulario_de_nuevo_socio')
      .subscribe((response: IStaticPageNewMember) => {
        this.newMemberModal = this.newMemberTransformService.transformNewMemberForm(
          response
        );
        this.loading = false;
        for (let reqField of this.newMemberModal.requestFields) {
          this.group = {
            ...this.group,
            [reqField.field]: new FormControl(
              null,
              reqField.required ? this.validatorType(reqField.field) : []
            ),
          };
        }
        this.newMemberForm = new FormGroup(this.group);
      }
    )
  }

  validatorType(field: string): Validators {
    const validators = [Validators.required];
    if (field === "correo_personal") {
      validators.push(Validators.email);
    } else if (field === 'telefono_de_contacto') {
      validators.push(
        Validators.pattern('[0-9]{7,9}'),
        Validators.minLength(7),
        Validators.maxLength(9)
      );
    }
    return validators;
  }


  closeModal(): void {
    this.modalRef.hide();
    this.newMemberForm?.reset();
  }

  requestNewMemberNumber(): void {
    const emailBody: IEmailBody = {
      id_form_email: this.newMemberModal._id,
      data: this.newMemberForm.value,
    };

    this.emailFormService.sendPublicFormData(emailBody).subscribe((response) => {
      this.requested = true;
      this.newMemberForm.reset();
    });
  }
}
