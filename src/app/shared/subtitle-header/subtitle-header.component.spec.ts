import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtitleHeaderComponent } from './subtitle-header.component';

describe('SubtitleHeaderComponent', () => {
  let component: SubtitleHeaderComponent;
  let fixture: ComponentFixture<SubtitleHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubtitleHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtitleHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
