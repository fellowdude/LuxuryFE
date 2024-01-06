import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutSupplierComponent } from './checkout-supplier.component';

describe('CheckoutSupplierComponent', () => {
  let component: CheckoutSupplierComponent;
  let fixture: ComponentFixture<CheckoutSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutSupplierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
