import { Injectable, signal } from '@angular/core';
import { IToast } from './toast.interface';
import { uniqueId } from '../../../utils';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public items = signal<IToast[]>([]);
  private readonly _timeoutDuration = 5000;
  private readonly _closingAnimationDuration = 300;
  private _timeoutIds: number[] = [];

  /**
   * If you wish to change the value, update styles accordingly
   */
  private readonly _maxItems = 3;

  /**
   * Automatically removes the toast after a certain duration
   *
   * @param toast IToast
   * @returns void
   */
  private _autoRemoveToast(toast: IToast): void {
    const toastId = toast._id;

    if (!toastId) {
      return;
    }

    const timeoutId = setTimeout(() => {
      this._markItemAsClosing(toastId);

      const secondaryTimeoutId = setTimeout(() => {
        this._removeItemById(toastId);
      }, this._closingAnimationDuration);

      this._timeoutIds.push(secondaryTimeoutId);
    }, this._timeoutDuration);

    this._timeoutIds.push(timeoutId);
  }

  /**
   * Marks a toast message as closing by its ID, which can trigger CSS animations for fading out
   *
   * @param id string
   * @return void
   */
  private _markItemAsClosing(id: string): void {
    this.items.update((items) => items.map((item) => (item._id === id ? { ...item, _isClosing: true } : item)));
  }

  /**
   * Removes a toast message by its ID
   *
   * @param id string
   * @return void
   */
  private _removeItemById(id: string): void {
    this.items.update((items) => items.filter((item) => item._id !== id));
  }

  /**
   * Clears all toast messages and cancels any pending timeouts for auto-removal
   *
   * @returns void
   */
  public clear(): void {
    this.items.set([]);

    this._timeoutIds.forEach((id) => clearTimeout(id));
    this._timeoutIds = [];
  }

  /**
   * Shows a toast message and automatically removes it after a certain duration
   *
   * @param toast IToast
   * @returns void
   */
  public show(toast: IToast): void {
    toast._id = uniqueId();
    this.items.update((items) => [toast, ...items].slice(0, this._maxItems));

    this._autoRemoveToast(toast);
  }

  /**
   * Show success toast message
   *
   * @param message string
   * @param title string
   * @returns void
   */
  public success(message: string, title = 'Success'): void {
    this.show({
      type: 'success',
      message,
      title,
    });
  }

  /**
   * Show error toast message
   *
   * @param message string
   * @param title string
   * @returns void
   */
  public error(message: string, title = 'Error'): void {
    this.show({
      type: 'error',
      message,
      title,
    });
  }

  /**
   * Show info toast message
   *
   * @param message string
   * @param title string
   * @returns void
   */
  public info(message: string, title = 'Info'): void {
    this.show({
      type: 'info',
      message,
      title,
    });
  }
}
