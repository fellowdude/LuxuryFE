import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSubtitleComponent } from './header-subtitle.component';

describe('HeaderSubtitleComponent', () => {
  let component: HeaderSubtitleComponent;
  let fixture: ComponentFixture<HeaderSubtitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderSubtitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderSubtitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
