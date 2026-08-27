import { DropdownTargetDirective } from './directives/dropdown-target.directive';
import { DropdownComponent } from './dropdown.component';

export * from './dropdown.component';
export * from './directives/dropdown-target.directive';
export * from './data-access/dropdown.interface';

export const IMPORT_DROPDOWN = [DropdownComponent, DropdownTargetDirective] as const;
