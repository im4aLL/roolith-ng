import type { Signal } from '@angular/core';
import { ButtonVariantType } from '../../button/data-access/button.interface';

export interface IDialogFooterButton {
  label: string;
  value: string;
  variant?: ButtonVariantType;
}

export interface IDialogConfig {
  id: string;
  header: string;
  content: string;
  subheader?: string;
  width?: number;
  actionButtons?: IDialogFooterButton[];
}

export interface IDialogEvent {
  id: string;
  value: string;
}

export interface IDialogRef {
  id: string;
  event: Signal<IDialogEvent | null>;
  destroy: () => void;
}
