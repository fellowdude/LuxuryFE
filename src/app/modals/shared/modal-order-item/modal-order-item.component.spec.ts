import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOrderItemComponent } from './modal-order-item.component';

describe('ModalOrderItemComponent', () => {
  let component: ModalOrderItemComponent;
  let fixture: ComponentFixture<ModalOrderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalOrderItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
