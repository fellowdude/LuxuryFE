import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { IFilterItem } from 'src/app/models/filter.model';

const customRangeValidator: ValidatorFn = (fg: FormGroup) => {
  const start = fg.get('min').value;
  const end = fg.get('max').value;
  return start !== null && end !== null && start < end ? null : { 'app-filter-range': true };
};

@Component({
  selector: 'app-filter-range',
  templateUrl: './filter-range.component.html',
  styleUrls: ['./filter-range.component.scss']
})
export class FilterRangeComponent implements OnInit {

  rangeForm: FormGroup;
  sended: boolean = false;
  @Input() filter: IFilterItem;
  @Input() contrastFilter: Array<number>;
  @Input() mobile: boolean;
  @Output() onClick = new EventEmitter(true);

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    if(this.contrastFilter) this.sended = true;

    this.rangeForm = this.fb.group({
      min: new FormControl( this.contrastFilter? this.contrastFilter?.[0] : null , [Validators.required, Validators.min(this.filter?.options?.floor), Validators.max(this.filter?.options?.ceil)]),
      max: new FormControl( this.contrastFilter?.[1] || null, [Validators.required, Validators.min(this.filter?.options?.floor), Validators.max(this.filter?.options?.ceil)]),
    }, { validators: customRangeValidator })

    this.rangeForm.valueChanges.subscribe((e)=>{
      if( e.min === null && e.max === null && this.sended){
        this.onClick.emit({name: this.filter?.filter?.name, unit: this.filter?.filter?.unit, value: {min: this.filter?.options?.floor, max: this.filter?.options?.ceil}});
      }
    })
  }

  rangeSelected(): void{
    this.sended = true;
    this.onClick.emit({name: this.filter?.filter?.name, unit: this.filter?.filter?.unit , value: this.rangeForm.value});
  }

}
