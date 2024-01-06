import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRecoveryFormComponent } from './user-recovery-form.component';

describe('UserRecoveryFormComponent', () => {
  let component: UserRecoveryFormComponent;
  let fixture: ComponentFixture<UserRecoveryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRecoveryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRecoveryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
