import { TableCellEditDirective } from './directives/table-cell-edit.directive';
import { TableCellDirective } from './directives/table-cell.directive';
import { TableStickyDirective } from './directives/table-sticky.directive';
import { TableCheckboxComponent } from './table-checkbox/table-checkbox.component';
import { TableHeaderCheckboxComponent } from './table-header-checkbox/table-header-checkbox.component';
import { TableSortComponent } from './table-sort/table-sort.component';
import { TableComponent } from './table.component';

export * from './table.component';
export * from './table-header-checkbox/table-header-checkbox.component';
export * from './table-checkbox/table-checkbox.component';
export * from './data-access/table.interface';
export * from './table-sort/table-sort.component';
export * from './directives/table-sticky.directive';
export * from './directives/table-cell-edit.directive';
export * from './directives/table-cell.directive';
export * from './data-access/exporter/index';

export const IMPORT_TABLE = [
  TableComponent,
  TableHeaderCheckboxComponent,
  TableCheckboxComponent,
  TableSortComponent,
  TableStickyDirective,
  TableCellEditDirective,
  TableCellDirective,
] as const;
