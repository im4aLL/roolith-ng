import { IconNameType } from '../../icon/data-access/icon.interface';

export interface IDropdownItem {
  label: string;
  value: string | number;
  secondaryLabel?: string;
  secondaryIcon?: IconNameType;
  icon?: IconNameType;
  isDanger?: boolean;
  isDisabled?: boolean;
}

export interface IDropdownGroup {
  headline?: string;
  items: IDropdownItem[];
}

export type DropdownAlignment = 'right' | 'top' | 'top-right';
export type DropdownPositionClass = 'rng-dropdown--right' | 'rng-dropdown--top' | 'rng-dropdown--top-right' | null;
