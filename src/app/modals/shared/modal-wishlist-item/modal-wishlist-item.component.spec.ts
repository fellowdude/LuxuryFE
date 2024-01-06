import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWishlistItemComponent } from './modal-wishlist-item.component';

describe('ModalWishlistItemComponent', () => {
  let component: ModalWishlistItemComponent;
  let fixture: ComponentFixture<ModalWishlistItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalWishlistItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWishlistItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
