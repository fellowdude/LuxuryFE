import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequentlyQuestionsComponent } from './frequently-questions.component';

describe('FrequentlyQuestionsComponent', () => {
  let component: FrequentlyQuestionsComponent;
  let fixture: ComponentFixture<FrequentlyQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrequentlyQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrequentlyQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
