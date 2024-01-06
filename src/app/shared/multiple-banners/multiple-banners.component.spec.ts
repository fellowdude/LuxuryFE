import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleBannersComponent } from './multiple-banners.component';

describe('MultipleBannersComponent', () => {
  let component: MultipleBannersComponent;
  let fixture: ComponentFixture<MultipleBannersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleBannersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleBannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
