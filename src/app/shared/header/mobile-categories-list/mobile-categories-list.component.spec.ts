import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileCategoriesListComponent } from './mobile-categories-list.component';

describe('MobileCategoriesListComponent', () => {
  let component: MobileCategoriesListComponent;
  let fixture: ComponentFixture<MobileCategoriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileCategoriesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileCategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
