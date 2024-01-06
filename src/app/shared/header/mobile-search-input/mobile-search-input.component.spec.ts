import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSearchInputComponent } from './mobile-search-input.component';

describe('MobileSearchInputComponent', () => {
  let component: MobileSearchInputComponent;
  let fixture: ComponentFixture<MobileSearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileSearchInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
