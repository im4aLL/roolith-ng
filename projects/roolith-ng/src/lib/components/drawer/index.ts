import { DrawerTargetDirective } from './directives/drawer-target.directive';
import { DrawerComponent } from './drawer.component';

export * from './drawer.component';
export * from './directives/drawer-target.directive';

export const IMPORT_DRAWER = [DrawerComponent, DrawerTargetDirective] as const;
