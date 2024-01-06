import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagazinePrestigeListComponent } from './magazine-prestige-list.component';

describe('MagazinePrestigeListComponent', () => {
  let component: MagazinePrestigeListComponent;
  let fixture: ComponentFixture<MagazinePrestigeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagazinePrestigeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MagazinePrestigeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
