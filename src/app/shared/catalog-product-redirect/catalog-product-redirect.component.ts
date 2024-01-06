import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-catalog-product-redirect',
  templateUrl: './catalog-product-redirect.component.html',
  styles: [],
})
export class CatalogProductRedirectComponent implements OnInit {
  constructor(private route: Router, private activatedRoute: ActivatedRoute) {
    const categoryOrCamp = this.activatedRoute.snapshot.params[
      'category'
    ].startsWith('camp_');
    this.route.navigate([
      'tienda',
      this.activatedRoute.snapshot.params['group'],
      categoryOrCamp ? 'camp' : 'categoria',
      this.activatedRoute.snapshot.params['category'],
      'marca',
      this.activatedRoute.snapshot.params['brand'],
      'producto',
      this.activatedRoute.snapshot.params['product'],
    ]);
  }

  ngOnInit(): void {}
}
