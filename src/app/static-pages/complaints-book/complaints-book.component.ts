import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Messages } from 'src/app/messages';
import { IComplaintsBookPage } from 'src/app/models/complaints-book-model';
import {
  EmailFormService,
  IEmailBody,
} from 'src/app/services/email-form.service';
import { ToastrControllerService } from 'src/app/services/internal/toastr-controller.service';

@Component({
  selector: 'app-complaints-book',
  templateUrl: './complaints-book.component.html',
  styleUrls: ['./complaints-book.component.scss'],
  styles: [
    `
      input[type='number']::-webkit-inner-spin-button,
      input[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    `,
  ],
})
export class ComplaintsBookComponent implements OnInit {
  complaintsBookPage: IComplaintsBookPage;
  complainsBookForm: FormGroup;
  loadingComplainSending: boolean = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private emailService: EmailFormService,
    private toastrService: ToastrControllerService
  ) {}

  ngOnInit(): void {
    this.complainsBookForm = this.fb.group({});
    this.complaintsBookPage = this.activeRoute.snapshot.data.resolve;

    this.complaintsBookPage.formFields.map((item) => {
      if (item.type !== 'instruction') {
        this.complainsBookForm.addControl(
          item.field,
          this.fb.control('', this.validatorType(item.field))
        );
      }
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
    } else if (field === 'numero_de_documento') {
      validators.push(
        Validators.pattern('[0-9 ]{8,11}'),
        Validators.minLength(8),
        Validators.maxLength(11)
      );
    }

    return validators;
  }

  resetForm(): void {
    this.complainsBookForm.reset();
  }

  submit() {
    if (this.complainsBookForm.valid) {
      this.loadingComplainSending = true;
      const emailBody: IEmailBody = {
        id_form_email: this.complaintsBookPage.id_form_email,
        data: this.complainsBookForm.value,
      };

      this.emailService.sendEmailForm(emailBody).subscribe(
        (resp) => {
          this.loadingComplainSending = false;
          this.resetForm();
          this.toastrService.successToastr(
            Messages.successSubmittedForm,
            Messages.successTitle
          );
        },
        (_) => {
          this.loadingComplainSending = false;
        }
      );
    }
  }
}
