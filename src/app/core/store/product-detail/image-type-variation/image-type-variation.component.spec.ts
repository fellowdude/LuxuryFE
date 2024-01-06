import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTypeVariationComponent } from './image-type-variation.component';

describe('ImageTypeVariationComponent', () => {
  let component: ImageTypeVariationComponent;
  let fixture: ComponentFixture<ImageTypeVariationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageTypeVariationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageTypeVariationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
