import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogProductRedirectComponent } from './catalog-product-redirect.component';

describe('CatalogProductRedirectComponent', () => {
  let component: CatalogProductRedirectComponent;
  let fixture: ComponentFixture<CatalogProductRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogProductRedirectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogProductRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
