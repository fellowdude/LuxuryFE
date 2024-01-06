import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ComponentFactoryResolver, Output, EventEmitter } from '@angular/core';
import { IValidationItem } from 'src/app/models/checkout.model';
import { IDrawer } from 'src/app/models/drawer.model';
import { DrawerItem } from './drawer-item';
import { DrawerDirective } from './drawer.directive';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent implements OnInit {

  isOpened: boolean;

  @Input() title: string;
  @Input() drawerItem: DrawerItem;
  validationItem: IValidationItem;
  @Input('validationItem') set valItem(value: IValidationItem){
    this.validationItem = value;
    if(this.isOpened && value && this.title == 'Carrito de compras')
      this.loadComponent();
  }
  @Output() onClick  = new EventEmitter<any>(true);

  @ViewChild(DrawerDirective, {static: true}) adHost: DrawerDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    if(this.isOpened)
      this.loadComponent();
  }

  get opened(): boolean {
    return this.isOpened;
  }
  @Input() set opened(value: boolean) {
    this.isOpened = value;
    if(this.isOpened)
      this.loadComponent();
  }

  toggleDrawer(): void {
    this.isOpened = !this.isOpened;
    if(this.isOpened)
      this.loadComponent();
  }

  loadComponent(): void {
    const adItem = this.drawerItem;

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);

    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<any>(componentFactory);
    componentRef.instance.onClick.subscribe(v => { this.onClick.emit(v); });
    componentRef.instance.validationItem = this.validationItem;

    this.cdRef.detectChanges();
  }

}
