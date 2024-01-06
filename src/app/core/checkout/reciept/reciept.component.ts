import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IValidationItem } from 'src/app/models/checkout.model';
import { UbigeoService } from 'src/app/services/ubigeo.service';

@Component({
  selector: 'app-reciept',
  templateUrl: './reciept.component.html',
  styleUrls: ['./reciept.component.scss']
})
export class RecieptComponent implements OnInit {

  invoice: boolean = false;
  ballot: boolean = true;
  invoiceForm: FormGroup;
  loadingNext: boolean = false;

  departmentsList: Array<any>;
  provinceList: Array<any>;
  districtList: Array<any>;

  @Input() validationItem: IValidationItem;
  @Input() data: any = null;
  @Output() onClick = new EventEmitter<any>(true);

  constructor(
    private ubigeoService: UbigeoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.router.navigate( [],
      {
        relativeTo: this.route,
        queryParams: { step: 'reciept' },
        queryParamsHandling: 'merge',
        replaceUrl: true
      }
    );

    this.invoiceForm = new FormGroup({
      name: new FormControl(null, [ Validators.required, Validators.maxLength(50) ]),
      ruc: new FormControl(null, [ Validators.required, Validators.minLength(11), Validators.maxLength(11) ]),
      address: new FormControl(null, [ Validators.required, Validators.maxLength(50) ]),
      department: new FormControl(null, [ Validators.required ]),
      province: new FormControl(null, [ Validators.required ]),
      district: new FormControl(null, [ Validators.required ])
    })

    this.ubigeoService.getDepartments().subscribe((departments) => {
      this.departmentsList = departments;
      this.onChanges();
    })

    this.onClick.emit({isInvoice: false})

    this.invoiceForm.valueChanges.subscribe( (v)=> {
      if(this.invoiceForm.valid)
        this.onClick.emit({isInvoice: true, form: this.invoiceForm})
      else
        this.onClick.emit({isInvoice: true, form: null})
    })
  }

  isBallot(event){
    this.invoiceForm.reset();
    this.invoice = false;
    this.ballot = true;
    this.onClick.emit({ isInvoice: false })
  }

  isInvoice(event){
    this.invoice = true;
    this.ballot = false;
    this.onClick.emit({ isInvoice: true, form: null })
  }

  onChanges() {
    this.invoiceForm.controls['department'].valueChanges.subscribe((change) => {
      this.ubigeoService.getProvincesByDepartment(change).subscribe((provinces) => {
        this.provinceList = provinces;
        this.districtList = [];
        this.invoiceForm.controls['province'].patchValue(null);
        this.invoiceForm.controls['district'].patchValue(null);
      })
    });
    this.invoiceForm.controls['province'].valueChanges.subscribe((change) => {
      if(change) {
        this.ubigeoService.getDistrictsByProvince(change).subscribe((districts) => {
          this.districtList = districts;
          this.invoiceForm.controls['district'].patchValue(null);
        })
      }
    })
  }

}
