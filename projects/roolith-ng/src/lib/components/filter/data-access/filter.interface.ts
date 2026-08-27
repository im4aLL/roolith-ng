import { TemplateRef } from '@angular/core';
import { ISelectInput } from '../../inputs/select/data-access/select-input.interface';
import type { DateTime } from 'luxon';
import type { FilterFieldTemplateDirective } from '../directives/filter-field-template.directive';
import { IFilterType } from './filter.const';

export type IFilterFieldType = 'string' | 'number' | 'date';

export interface IFilterableField extends ISelectInput {
  type: IFilterFieldType;
  hasTemplate?: boolean;
}

export interface IFilterItem {
  filterType: IFilterType;
  value: string | number | DateTime | null;
  operator?: IFilterOperator;
}

export type IFilterOperator = 'and' | 'or';

export interface IFilterData {
  field: string;
  items: IFilterItem[];
}

export interface IFilter {
  field: string;
  filterType: IFilterType;
  value: string | number | DateTime | null;
  operator: IFilterOperator | undefined;
  _forHuman?: string;
}

export type IFilterCustomTemplateData = Record<string, TemplateRef<FilterFieldTemplateDirective>>;
