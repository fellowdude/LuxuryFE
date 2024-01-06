import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeFilterListComponent } from './fake-filter-list.component';

describe('FakeFilterListComponent', () => {
  let component: FakeFilterListComponent;
  let fixture: ComponentFixture<FakeFilterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FakeFilterListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeFilterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
