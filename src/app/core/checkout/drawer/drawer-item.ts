import { Type } from '@angular/core';
import { IDrawer } from 'src/app/models/drawer.model';

export class DrawerItem {
  constructor(public component: Type<any>, public data?: any) {}
}
