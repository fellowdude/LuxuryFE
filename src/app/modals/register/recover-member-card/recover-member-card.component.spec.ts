import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverMemberCardComponent } from './recover-member-card.component';

describe('RecoverMemberCardComponent', () => {
  let component: RecoverMemberCardComponent;
  let fixture: ComponentFixture<RecoverMemberCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoverMemberCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverMemberCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
