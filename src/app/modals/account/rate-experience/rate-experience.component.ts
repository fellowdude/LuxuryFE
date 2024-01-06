import { CategoryGroupService } from 'src/app/services/category-group.service';
import { CategoryService } from 'src/app/services/category.service';
import { CompanyService } from 'src/app/services/company.service';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  EmailFormService,
  IEmailBody,
} from 'src/app/services/email-form.service';
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
} from '@angular/forms';
import { IRateExperienceFormModal } from 'src/app/models/rate-experience.model';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { MENU_ACCOUNT_TOKEN } from '../menu-account/menu-account';
import { Messages } from 'src/app/messages';
import { RateExperienceService } from 'src/app/services/rate-experience.service';
import { RateExperienceTransformService } from 'src/app/services/internal/rate-experience-transform.service';
import { of, Subject } from 'rxjs';
import { ToastrControllerService } from 'src/app/services/internal/toastr-controller.service';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-rate-experience',
  templateUrl: './rate-experience.component.html',
  styleUrls: ['./rate-experience.component.scss'],
})
export class RateExperienceComponent implements OnInit {
  @ViewChild('dateInput') dateInput: ElementRef;
  canBack: boolean = true;
  initialRating: number = 5;
  loadingForm: boolean;
  loadingSendingEmail: boolean;
  rateExperienceForm: FormGroup = this.fb.group({});
  rateExperienceFormModal: IRateExperienceFormModal;
  resetRatingEvent: Subject<void> = new Subject<void>();

  constructor(
    @Inject(MENU_ACCOUNT_TOKEN) private menuAccountComponent: any,
    private categoryGroupService: CategoryGroupService,
    private categoryService: CategoryService,
    private companyService: CompanyService,
    private emailFormService: EmailFormService,
    private fb: FormBuilder,
    private modalRef: MDBModalRef,
    private modalService: MDBModalService,
    private rateExperienceService: RateExperienceService,
    private rateExperienceTransformService: RateExperienceTransformService,
    private toastrService: ToastrControllerService
  ) {}

  ngOnInit(): void {
    this.loadingForm = true;
    this.rateExperienceService
      .getRateExperienceForm()
      .subscribe((rateExperienceReceived) => {
        this.rateExperienceFormModal = this.rateExperienceTransformService.transformRateExperienceForm(
          rateExperienceReceived
        );

        for (let requestField of this.rateExperienceFormModal.requestFields) {
          this.rateExperienceForm.addControl(
            requestField.field,
            new FormControl(
              {
                value: requestField.type === 'rate' ? this.initialRating : '',
                disabled:
                  requestField.field === 'marca' ||
                  requestField.field === 'local',
              },
              requestField.required ? [Validators.required] : []
            )
          );
        }

        this.categoryGroupService
          .getListCategoryOfGroup('experiencias')
          .subscribe((category) => {
            this.assignListToField('categoria', category.data);
            this.loadingForm = false;
          });

        // Select category
        this.rateExperienceForm
          .get('categoria')
          .valueChanges.pipe(
            tap((_) => {
              this.rateExperienceForm.get('marca').reset('');
              this.rateExperienceForm.get('marca').disable();
            }),
            switchMap((categoria: string) => {
              if (!categoria) return of(null);
              return this.categoryService.getCategoryBySlug(categoria);
            })
          )
          .subscribe((category) => {
            if (category) {
              this.assignListToField('marca', category?.brands?.data);
              this.rateExperienceForm.get('marca').enable();
            }
          });

        // Select marca
        this.rateExperienceForm
          .get('marca')
          .valueChanges.pipe(
            tap((_) => {
              this.rateExperienceForm.get('local').reset('');
              this.rateExperienceForm.get('local').disable();
              this.assignListToField('local', null);
            }),
            switchMap((marca) => {
              if (!marca) return of(null);
              return this.companyService.getCompany(marca);
            })
          )
          .subscribe((marca) => {
            if (marca) {
              this.assignListToField('local', marca?.list_address);
              this.rateExperienceForm.get('local').enable();
            }
          });
      });
  }

  assignListToField(fieldInput: string, items: any[] | null) {
    this.rateExperienceFormModal.requestFields.find(
      ({ field }) => field === fieldInput
    ).list = items;
  }

  closeModal(): void {
    this.modalRef.hide();
  }

  // If the input has value keeps his type in date, else his type changes to text - To adapt to the mdbInput style
  onBlurDate(event: any) {
    const type = event.target.value.length ? 'date' : 'text';
    event.target.type = type;
  }

  selectRating(rating: number) {
    this.rateExperienceForm.value['rate'] = rating;
    this.initialRating = rating;
  }

  submitForm() {
    if (this.rateExperienceForm.valid) {
      this.loadingSendingEmail = true;
      const emailBody: IEmailBody = {
        data: this.rateExperienceForm.value,
        id_form_email: this.rateExperienceFormModal._id,
      };

      this.emailFormService.sendEmailForm(emailBody).subscribe(() => {
        // MENSAJE: Muchas gracias por su calificación.
        this.rateExperienceForm.reset({
          rate: 5,
        });
        this.dateInput.nativeElement.type = 'text';
        this.loadingSendingEmail = false;
        this.initialRating = 5;
        this.toastrService.successToastr(
          Messages.successCalification,
          Messages.successTitle
        );
      });
    }
  }

  returnModal(): void {
    this.closeModal();
    this.modalRef = this.modalService.show(this.menuAccountComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-full-height modal-right mh-100 my-0',
      containerClass: 'right modal-dialog-scrollable mh-100 my-0',
      animated: true,
    });
  }
}
