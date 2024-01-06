import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazinePrestigeCardComponent } from './magazine-prestige-card.component';

describe('MagazinePrestigeCardComponent', () => {
  let component: MagazinePrestigeCardComponent;
  let fixture: ComponentFixture<MagazinePrestigeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MagazinePrestigeCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MagazinePrestigeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
