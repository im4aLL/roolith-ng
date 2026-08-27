import { IToggleGroupItem } from '../../toggle-group/data-access/toggle-group.interface';
import { TemplateRef } from '@angular/core';

export type ITabItem = IToggleGroupItem;

export interface ITabContent {
  key: string | number;
  header?: string;
  content: string;
}

export type ITabCustomTemplateData = Record<string | number, TemplateRef<{ $implicit: ITabContent }>>;
