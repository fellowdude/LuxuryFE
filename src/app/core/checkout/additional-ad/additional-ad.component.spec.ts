import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalAdComponent } from './additional-ad.component';

describe('AdditionalAdComponent', () => {
  let component: AdditionalAdComponent;
  let fixture: ComponentFixture<AdditionalAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalAdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
