import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlurMenuHeaderComponent } from './blur-menu-header.component';

describe('BlurMenuHeaderComponent', () => {
  let component: BlurMenuHeaderComponent;
  let fixture: ComponentFixture<BlurMenuHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlurMenuHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlurMenuHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
