import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeFilterComponent } from './fake-filter.component';

describe('FakeFilterComponent', () => {
  let component: FakeFilterComponent;
  let fixture: ComponentFixture<FakeFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FakeFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
