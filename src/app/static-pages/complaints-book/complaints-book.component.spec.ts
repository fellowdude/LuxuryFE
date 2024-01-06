import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintsBookComponent } from './complaints-book.component';

describe('ComplaintsBookComponent', () => {
  let component: ComplaintsBookComponent;
  let fixture: ComponentFixture<ComplaintsBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplaintsBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintsBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
