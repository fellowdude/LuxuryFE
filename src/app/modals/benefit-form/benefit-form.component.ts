import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { IBenefitForm } from 'src/app/models/benefit-form.model';
import { ExperiencesService } from 'src/app/services/experiences.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IPartnerBenefitsDetail } from 'src/app/resolvers/core/partner-benefits/benefit-detail.resolver';
import { IPartnerBenefitsCompany } from 'src/app/resolvers/core/partner-benefits/company.resolver';
import { BookingService } from 'src/app/services/booking.service';
import { Messages } from 'src/app/messages';
import { ToastrControllerService } from 'src/app/services/internal/toastr-controller.service';

@Component({
  selector: 'app-benefit-form',
  templateUrl: './benefit-form.component.html',
  styleUrls: ['./benefit-form.component.scss'],
})
export class BenefitFormComponent implements OnInit {
  idForm: string;
  companyInfo: IPartnerBenefitsCompany;
  benefitInfo: IPartnerBenefitsDetail;
  isRestaurant: boolean;
  benefitFormData: IBenefitForm = {
    title: '',
    footerMessage: '',
    buttonText: '',
    formFields: [],
    completeFormFields: [],
  };
  benefitForm: FormGroup;
  group: any = {};
  localList: any;
  loadingSending: boolean = false;

  constructor(
    private toastrService: ToastrControllerService,
    private experiencesService: ExperiencesService,
    public modalRef: MDBModalRef,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.experiencesService
      .getFormExperience(this.idForm)
      .subscribe((data: IBenefitForm) => {
        this.benefitFormData = data;
        this.benefitFormData.formFields.forEach((field) => {
          if (
            this.benefitFormData.completeFormFields &&
            this.benefitFormData.completeFormFields.length > 0 &&
            field.type != 'instruction'
          ) {
            this.benefitFormData.completeFormFields.forEach((filledField) => {
              if (filledField.field_replace == field.field) {
                this.group[field.field] = new FormControl(
                  this.benefitInfo && this.benefitInfo[filledField.ref1]
                    ? this.benefitInfo[filledField.ref1]
                    : '',
                  field.required ? [Validators.required] : []
                );
              } else {
                this.group[field.field] = new FormControl(
                  '',
                  field.required ? [Validators.required] : []
                );
              }
            });
          } else {
            this.group[field.field] = new FormControl(
              '',
              field.required ? [Validators.required] : []
            );
          }
          if (field.type == 'text' && field.sub_type == 'number') {
            this.group[field.field].setValidators(
              field.required
                ? [Validators.required, Validators.min(0)]
                : [Validators.min(0)]
            );
          }

          if (field.type == 'text' && field.field === 'telefono') {
            this.group[field.field].setValidators(
              field.required
                ? [
                    Validators.required,
                    Validators.min(0),
                    Validators.pattern('[0-9 ]{7,9}'),
                    Validators.minLength(7),
                    Validators.maxLength(9),
                  ]
                : [
                    Validators.min(0),
                    Validators.pattern('[0-9 ]{7,9}'),
                    Validators.minLength(7),
                    Validators.maxLength(9),
                  ]
            );
          }

          if (field.type === 'local') {
            this.localList = this.companyInfo.list_address;
          }
        });
        this.benefitForm = new FormGroup(this.group);
      });
  }

  sendForm(): void {
    if (this.benefitForm.valid) {
      this.loadingSending = true;
      let sendForm = {
        data: this.benefitForm.value,
        id_form_email: this.idForm,
        personalized: true,
        additional_data: {
          _id: this.companyInfo._id,
          name: this.companyInfo.name,
        },
      };
      if (this.isRestaurant && this.benefitForm.value['local']) {
        var bodySend = {
          experience_id: this.companyInfo._id,
          local: this.benefitForm.value['local'],
          booking_date: this.benefitForm.value['fecha'],
          booking_hour: this.benefitForm.value['horario'],
          booking_number: this.benefitForm.value['n°_de_personas'],
          booking_requirements: this.benefitForm.value[
            'requerimientos__ejem__alergias'
          ],
          booking_coments: this.benefitForm.value['comentario'],
          booking_phone:
            this.benefitForm.value['celular'] ||
            this.benefitForm.value['telefono'],
          booking_email: this.benefitForm.value['correo_electronico'],
        };
        this.bookingService.createBooking(bodySend).subscribe((response) => {
          this.experiencesService.sendFormExperience(sendForm).subscribe(
            (response) => {
              this.loadingSending = false;
              this.toastrService.successToastr(
                Messages.successBookingRequest,
                Messages.successTitle
              );
              this.closeModal();
            },
            (_) => {
              this.loadingSending = false;
            }
          );
        });
      } else {
        this.experiencesService.sendFormExperience(sendForm).subscribe(
          (response) => {
            this.loadingSending = false;
            this.toastrService.successToastr(
              Messages.successExperienceFormSend,
              Messages.successTitle
            );
            this.closeModal();
          },
          (_) => {
            this.loadingSending = false;
          }
        );
      }
    }
  }

  closeModal(): void {
    this.modalRef.hide();
  }
}
