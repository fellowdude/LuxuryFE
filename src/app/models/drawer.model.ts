import { DrawerItem } from "../core/checkout/drawer/drawer-item";

export interface IDrawer {
  opened: boolean;
  step?: number;
  value: DrawerItem;
}
