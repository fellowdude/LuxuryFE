import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperiencesCardListComponent } from './experiences-card-list.component';

describe('ExperiencesCardListComponent', () => {
  let component: ExperiencesCardListComponent;
  let fixture: ComponentFixture<ExperiencesCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperiencesCardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperiencesCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
