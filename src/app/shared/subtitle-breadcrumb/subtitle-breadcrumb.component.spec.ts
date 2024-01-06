import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtitleBreadcrumbComponent } from './subtitle-breadcrumb.component';

describe('SubtitleBreadcrumbComponent', () => {
  let component: SubtitleBreadcrumbComponent;
  let fixture: ComponentFixture<SubtitleBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubtitleBreadcrumbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtitleBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
