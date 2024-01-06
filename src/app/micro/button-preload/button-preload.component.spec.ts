import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonPreloadComponent } from './button-preload.component';

describe('ButtonPreloadComponent', () => {
  let component: ButtonPreloadComponent;
  let fixture: ComponentFixture<ButtonPreloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonPreloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonPreloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
