import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatedBrandsComponent } from './associated-brands.component';

describe('AssociatedBrandsComponent', () => {
  let component: AssociatedBrandsComponent;
  let fixture: ComponentFixture<AssociatedBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociatedBrandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociatedBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
