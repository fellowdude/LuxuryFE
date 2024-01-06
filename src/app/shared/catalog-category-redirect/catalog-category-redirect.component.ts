import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-catalog-category-redirect',
  templateUrl: './catalog-category-redirect.component.html',
  styles: [],
})
export class CatalogCategoryRedirectComponent implements OnInit {
  constructor(private route: Router, private activatedRoute: ActivatedRoute) {
    const categoryOrCamp = this.activatedRoute.snapshot.params[
      'category'
    ].startsWith('camp_');
    this.route.navigate([
      'tienda',
      this.activatedRoute.snapshot.params['group'],
      categoryOrCamp ? 'camp' : 'categoria',
      this.activatedRoute.snapshot.params['category'],
    ]);
  }

  ngOnInit(): void {}
}
