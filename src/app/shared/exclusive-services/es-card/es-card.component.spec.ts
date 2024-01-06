import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsCardComponent } from './es-card.component';

describe('EsCardComponent', () => {
  let component: EsCardComponent;
  let fixture: ComponentFixture<EsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
