import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToEnjoyComponent } from './how-to-enjoy.component';

describe('HowToEnjoyComponent', () => {
  let component: HowToEnjoyComponent;
  let fixture: ComponentFixture<HowToEnjoyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowToEnjoyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToEnjoyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
