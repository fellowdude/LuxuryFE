import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalProductsItemComponent } from './additional-products-item.component';

describe('AdditionalProductsItemComponent', () => {
  let component: AdditionalProductsItemComponent;
  let fixture: ComponentFixture<AdditionalProductsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalProductsItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalProductsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
