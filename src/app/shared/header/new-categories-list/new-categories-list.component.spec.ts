import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCategoriesListComponent } from './new-categories-list.component';

describe('NewCategoriesListComponent', () => {
  let component: NewCategoriesListComponent;
  let fixture: ComponentFixture<NewCategoriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCategoriesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
