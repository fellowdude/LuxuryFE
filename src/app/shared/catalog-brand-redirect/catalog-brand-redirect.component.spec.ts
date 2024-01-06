import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogBrandRedirectComponent } from './catalog-brand-redirect.component';

describe('CatalogBrandRedirectComponent', () => {
  let component: CatalogBrandRedirectComponent;
  let fixture: ComponentFixture<CatalogBrandRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogBrandRedirectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogBrandRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
