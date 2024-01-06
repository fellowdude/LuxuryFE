import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtbCardComponent } from './htb-card.component';

describe('HtbCardComponent', () => {
  let component: HtbCardComponent;
  let fixture: ComponentFixture<HtbCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HtbCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HtbCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
