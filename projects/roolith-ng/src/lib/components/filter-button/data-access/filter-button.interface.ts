export interface IFilterButtonItem {
  label: string;
  value: string;
  selected?: boolean;
  counter?: number;
}

export interface IFilterChangeEvent {
  type: 'change' | 'clear';
  payload: IFilterButtonItem[];
}
