import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMemberCardFormComponent } from './new-member-card-form.component';

describe('NewMemberCardFormComponent', () => {
  let component: NewMemberCardFormComponent;
  let fixture: ComponentFixture<NewMemberCardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMemberCardFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMemberCardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
