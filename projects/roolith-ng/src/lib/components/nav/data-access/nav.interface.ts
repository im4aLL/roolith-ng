import { IconNameType } from '../../icon/data-access/icon.interface';

export interface INav {
  id: string;
  name: string;
  link: string;
  isActive: boolean;
  count?: number | null;
  icon?: IconNameType | null;
  customIcon?: string | null;
  children?: INav[];
  isOpen?: boolean;
}

export type NavType = 'warning' | 'info' | 'default';
export type NavVariationType = 'primary' | 'default';

export interface INavGroup {
  id: string;
  name: string | null;
  type?: NavType;
  variation?: NavVariationType;
  items: INav[];
}

export interface INavClickEvent {
  item: INav;
  groupId: string;
}
