import { TemplateRef } from '@angular/core';
import { TooltipPositionType } from '../../tooltip/data-access/tooltip.interface';

type ITableColumnAlignType = 'left' | 'center' | 'right';

export interface ITableColumn {
  field: string;
  label: string;
  func?: (row: ITableData) => string | number | null;
  align?: ITableColumnAlignType;
  editable?: boolean;
  /**
   * When true, restrict editable cell input to alphanumeric characters and spaces.
   * Defaults to unrestricted when omitted or false.
   */
  restrictCellEditToAlphanumeric?: boolean;
  /**
   * Max editable cell input length. Defaults to 100 when omitted.
   */
  maxCellEditLength?: number;
  editValidatorFn?: (value: string | number | null) => boolean;
  width?: number;
  clickable?: boolean;
  skipClickableFn?: (row: ITableData) => boolean;
  truncate?: ITableColumnTruncateConfig;
}
interface ITableColumnTruncateConfig {
  maxContentLength: number;
  tooltipWidth: string;
  tooltipPosition: TooltipPositionType;
}

export interface ITableColumnData extends ITableColumn {
  sortable: boolean;
  sortDirection: SortDirectionType;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ITableData extends Record<string, any> {
  _trackKey?: string;
  _isEdited?: boolean;
}

export type SortDirectionType = 'asc' | 'desc' | 'default';
export interface ITableSortChangeEvent {
  name: string;
  direction: SortDirectionType;
}

export interface ITableSortColumn {
  field: string;
  direction: SortDirectionType;
}

export interface ITableStickyConfig {
  numberOfColumns: number;
  width: number[];
}

export interface ITableStickyDirectiveData {
  index: number;
  width: number;
  left: number;
}

export interface ITableCellClickEvent {
  row: ITableData;
  field: string;
}

export interface ITableCellEditEvent {
  newValue: string | number | null;
  oldValue: string | number | null;
  field: string;
  row: ITableData;
}

interface ITableCellContext {
  $implicit: unknown;
  row: ITableData;
  field: string;
  column: ITableColumn;
}

export type ITabelCellTemplateData = Record<string, TemplateRef<ITableCellContext>>;
