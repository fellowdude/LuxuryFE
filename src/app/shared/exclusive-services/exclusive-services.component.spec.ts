import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExclusiveServicesComponent } from './exclusive-services.component';

describe('ExclusiveServicesComponent', () => {
  let component: ExclusiveServicesComponent;
  let fixture: ComponentFixture<ExclusiveServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExclusiveServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExclusiveServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
