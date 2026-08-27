import { PopoverTargetDirective } from './directives/popover-target.directive';
import { PopoverComponent } from './popover.component';

export * from './popover.component';
export * from './directives/popover-target.directive';
export * from './data-access/popover.interface';

export const IMPORT_POPOVER = [PopoverComponent, PopoverTargetDirective] as const;
