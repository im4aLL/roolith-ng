import { IRadioOption } from '../../inputs/radio/data-access/radio-input.interface';
import { ISelectInput } from '../../inputs/select/data-access/select-input.interface';

export const FILTER_GENERIC_TYPES: ISelectInput[] = [
  { label: 'Contains', value: 'contains' },
  { label: 'Does not contain', value: 'doesNotContain' },
  { label: 'Equals', value: 'equals' },
  { label: 'Not equal to', value: 'notEqualTo' },
  { label: 'Starts with', value: 'startsWith' },
  { label: 'Ends with', value: 'endsWith' },
  { label: 'Is empty', value: 'isEmpty' },
  { label: 'Is not empty', value: 'isNotEmpty' },
] as const;

export const FILTER_NUMBER_TYPES: ISelectInput[] = [
  { label: 'Equals', value: 'equals' },
  { label: 'Not equal to', value: 'notEqualTo' },
  { label: 'Greater than', value: 'greaterThan' },
  { label: 'Greater than or equal to', value: 'greaterThanOrEqualTo' },
  { label: 'Less than', value: 'lessThan' },
  { label: 'Less than or equal to', value: 'lessThanOrEqualTo' },
  { label: 'Is empty', value: 'isEmpty' },
  { label: 'Is not empty', value: 'isNotEmpty' },
] as const;

export const FILTER_DATE_TYPES: ISelectInput[] = [
  { label: 'Equals', value: 'equals' },
  { label: 'Not equal to', value: 'notEqualTo' },
  { label: 'Before', value: 'before' },
  { label: 'After', value: 'after' },
  { label: 'Before or equal to', value: 'beforeOrEqualTo' },
  { label: 'After or equal to', value: 'afterOrEqualTo' },
  { label: 'Is empty', value: 'isEmpty' },
  { label: 'Is not empty', value: 'isNotEmpty' },
] as const;

export const FILTER_OPERATORS: IRadioOption[] = [
  { label: 'And', value: 'and' },
  { label: 'Or', value: 'or' },
] as const;

export type IFilterType =
  // string field types
  | 'contains'
  | 'doesNotContain'
  | 'startsWith'
  | 'endsWith'
  // shared string/number
  | 'equals'
  | 'notEqualTo'
  | 'isEmpty'
  | 'isNotEmpty'
  // number field types
  | 'greaterThan'
  | 'greaterThanOrEqualTo'
  | 'lessThan'
  | 'lessThanOrEqualTo'
  // date field types
  | 'before'
  | 'after'
  | 'beforeOrEqualTo'
  | 'afterOrEqualTo'
  | (string & {});
