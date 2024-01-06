import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-catalog-brand-redirect',
  templateUrl: './catalog-brand-redirect.component.html',
  styles: [],
})
export class CatalogBrandRedirectComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    const categoryOrCamp = this.activatedRoute.snapshot.params[
      'category'
    ].startsWith('camp_');
    this.router.navigate([
      'tienda',
      this.activatedRoute.snapshot.params['group'],
      categoryOrCamp ? 'camp' : 'categoria',
      this.activatedRoute.snapshot.params['category'],
      'marca',
      this.activatedRoute.snapshot.params['brand'],
    ]);
  }

  ngOnInit(): void {}
}
