import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterRadialComponent } from './filter-radial.component';

describe('FilterRadialComponent', () => {
  let component: FilterRadialComponent;
  let fixture: ComponentFixture<FilterRadialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterRadialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterRadialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
