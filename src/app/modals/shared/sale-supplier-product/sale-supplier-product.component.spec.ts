import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleSupplierProductComponent } from './sale-supplier-product.component';

describe('SaleSupplierProductComponent', () => {
  let component: SaleSupplierProductComponent;
  let fixture: ComponentFixture<SaleSupplierProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleSupplierProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleSupplierProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
