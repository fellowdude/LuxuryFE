import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperiencesListPageableComponent } from './experiences-list-pageable.component';

describe('ExperiencesListPageableComponent', () => {
  let component: ExperiencesListPageableComponent;
  let fixture: ComponentFixture<ExperiencesListPageableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExperiencesListPageableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperiencesListPageableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
