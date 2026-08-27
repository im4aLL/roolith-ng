import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { uniqueId } from '../../../utils';
import { IDialogConfig, IDialogEvent, IDialogRef } from './dialog.interface';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private _isDialogOpen = signal<boolean>(false);
  private _defaultConfig: IDialogConfig = {
    id: '',
    header: 'Confirmation',
    content: 'Are you sure you want to proceed with this action?',
    width: 400,
    actionButtons: [
      { label: 'Yes', value: 'yes', variant: 'primary' },
      { label: 'Cancel', value: 'cancel' },
    ],
  };
  private _config = signal<IDialogConfig>({ ...this._defaultConfig });
  private _event: Map<string, WritableSignal<IDialogEvent | null>> = new Map();

  /**
   * Opens the dialog with the provided configuration
   *
   * @param config Partial<IDialogConfig>
   * @returns IDialogRef
   */
  public open(config?: Partial<IDialogConfig>): IDialogRef {
    const configuration = { ...this._defaultConfig, ...config } as IDialogConfig;
    if (!configuration.id) {
      configuration.id = `dialog-${uniqueId()}`;
    }

    this._config.set(configuration);
    this._event.set(configuration.id, signal<IDialogEvent | null>(null));
    this._isDialogOpen.set(true);

    return {
      id: configuration.id,
      event: this._event.get(configuration.id)?.asReadonly() || signal<IDialogEvent | null>(null).asReadonly(),
      destroy: () => this._closeById(configuration.id),
    };
  }

  /**
   * Closes the dialog
   *
   * @returns void
   */
  public close(): void {
    const { id } = this._config();

    this.emitEvent('close');
    this._closeById(id);
  }

  /**
   * Closes the dialog by id
   *
   * @param id string
   * @return void
   */
  private _closeById(id: string): void {
    this._event.delete(id);
    this._isDialogOpen.set(false);
  }

  /**
   * Whether the dialog is open or not
   *
   * @returns Signal<boolean>
   */
  public get isOpen(): Signal<boolean> {
    return this._isDialogOpen.asReadonly();
  }

  /**
   * The configuration for the dialog
   *
   * @returns Signal<IDialogConfig>
   */
  public get config(): Signal<IDialogConfig> {
    return this._config.asReadonly();
  }

  /**
   * Emits an event when a button in the dialog is clicked
   *
   * @param value string
   * @returns void
   */
  public emitEvent(value: string): void {
    const { id } = this._config();
    const eventSignal = this._event.get(id);

    if (!eventSignal) {
      return;
    }

    eventSignal.set({ id, value });
  }
}
