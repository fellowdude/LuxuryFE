import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Messages } from 'src/app/messages';
import {
  IContactModal,
  IStaticPageContact,
} from 'src/app/models/contact-modal.model';
import {
  EmailFormService,
  IEmailBody,
} from 'src/app/services/email-form.service';
import { ContactFormTransformService } from 'src/app/services/internal/contact-form-transform.service';
import { ToastrControllerService } from 'src/app/services/internal/toastr-controller.service';
import { ProfileService } from 'src/app/services/profile.service';
import { StaticPageService } from 'src/app/services/static-page.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  loadingForm: boolean;
  loadingSending: boolean;
  group: {};
  contactModal: IContactModal;
  contactForm: FormGroup;
  constructor(
    private toastrService: ToastrControllerService,
    private modalRef: MDBModalRef,
    private staticPageService: StaticPageService,
    private emailFormService: EmailFormService,
    private profileService: ProfileService,
    private contactTransformService: ContactFormTransformService
  ) {}

  ngOnInit(): void {
    this.loadingForm = true;
    this.staticPageService
      .getPublicStaticPage('contactenos')
      .subscribe((response: IStaticPageContact) => {
        this.profileService.getProfile().subscribe((profile) => {
          this.contactModal = this.contactTransformService.transformContactForm(
            response
          );
          this.loadingForm = false;
          for (let reqField of this.contactModal.requestFields) {
            this.group = {
              ...this.group,
              [reqField.field]: new FormControl(
                reqField.field == 'email'? profile?.[reqField.field]:null,
                reqField.required ? this.validatorType(reqField.field) : []
              ),
            };
          }
          this.contactForm = new FormGroup(this.group);
        })
      });
  }

  validatorType(field: string): Validators {
    const validators = [Validators.required];
    if (field === 'email') {
      validators.push(Validators.email);
    } else if (field === 'telefono') {
      validators.push(
        Validators.pattern('[0-9 ]{7,9}'),
        Validators.minLength(7),
        Validators.maxLength(9)
      );
    }
    return validators;
  }

  sendForm() {
    if (this.contactForm.valid) {
      this.loadingSending = true;
      const emailBody: IEmailBody = {
        id_form_email: this.contactModal._id,
        data: this.contactForm.value,
      };

      this.emailFormService.sendEmailForm(emailBody).subscribe((response) => {
        this.contactForm.reset();
        this.loadingSending = false;
        this.toastrService.successToastr(
          Messages.successContact,
          Messages.successTitle
        );
      }, (error)=>{
        this.loadingSending = false;
      });
    }
  }
  closeModal() {
    this.modalRef.hide();
  }
}
