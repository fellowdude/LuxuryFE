import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleSupplierComponent } from './sale-supplier.component';

describe('SaleSupplierComponent', () => {
  let component: SaleSupplierComponent;
  let fixture: ComponentFixture<SaleSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleSupplierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
