import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _isLoading = signal<boolean>(false);
  private _isNonBlocking = signal<boolean>(false);
  private _message = signal<string | null>(null);
  private _activeRequests = 0;

  /**
   * Show the loader
   *
   * @returns void
   */
  public show(message = 'Processing...'): void {
    this._message.set(message);
    this._isNonBlocking.set(false);
    this._isLoading.set(true);
  }

  /**
   * Show the non-blocking loader
   *
   * @returns void
   */
  public showNonBlocking(message = 'Processing...'): void {
    this._message.set(message);
    this._isNonBlocking.set(true);
    this._isLoading.set(true);
  }

  /**
   * Increments the active request counter and shows the non-blocking loader.
   * Called by the global loading interceptor.
   *
   * @returns void
   */
  public startRequest(): void {
    this._activeRequests++;
    this.showNonBlocking();
  }

  /**
   * Decrements the active request counter and hides the loader if no requests remain.
   * Called by the global loading interceptor.
   *
   * @returns void
   */
  public endRequest(): void {
    this._activeRequests = Math.max(0, this._activeRequests - 1);

    if (this._activeRequests === 0) {
      this._hide();
    }
  }

  /**
   * Hide the loader. No-op if there are still active HTTP requests.
   *
   * @returns void
   */
  public hide(): void {
    if (this._activeRequests > 0) {
      return;
    }

    this._hide();
  }

  /**
   * Internal method to hide the loader immediately, regardless of active requests.
   *
   * @returns void
   */
  private _hide(): void {
    this._isLoading.set(false);
    this._isNonBlocking.set(false);
    this._message.set(null);
  }

  /**
   * Get the loading state
   *
   * @return Signal<boolean>
   */
  public get isLoading(): Signal<boolean> {
    return this._isLoading.asReadonly();
  }

  /**
   * Get the non-blocking state
   *
   * @return Signal<boolean>
   */
  public get isNonBlocking(): Signal<boolean> {
    return this._isNonBlocking.asReadonly();
  }

  /**
   * Get the message
   *
   * @return Signal<string | null>
   */
  public get message(): Signal<string | null> {
    return this._message.asReadonly();
  }
}
