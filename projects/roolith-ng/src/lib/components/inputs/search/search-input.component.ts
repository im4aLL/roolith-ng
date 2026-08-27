import { ChangeDetectionStrategy, Component, ElementRef, input, model, signal, viewChild } from '@angular/core';
import { outputFromObservable, toObservable } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'rng-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent {
  public placeholder = signal<string>('Search');
  public value = model<string | null>(null);
  public debouncedTime = input<number>(250);
  public isShowClearButton = signal<boolean>(false);
  public disabled = input<boolean>(false);

  public inputElement = viewChild<ElementRef<HTMLInputElement>>('inputElement');
  public debouncedChange = outputFromObservable(
    toObservable(this.value).pipe(debounceTime(this.debouncedTime()), distinctUntilChanged()),
  );

  /**
   * Handle input event and update the value signal with the current input value.
   *
   * @param event Event
   * @returns void
   */
  public onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    this.value.set(inputElement.value);
    this.isShowClearButton.set(!!inputElement.value);
  }

  /**
   * Clear the input value and hide the clear button. This is called when the clear button is clicked.
   *
   * @returns void
   */
  public clearInput(): void {
    this.value.set('');
    this.isShowClearButton.set(false);
    this._resetInputValue();
  }

  /**
   * Reset the input value to an empty string. This is used when the clear button is clicked to clear the input field.
   *
   * @returns void
   */
  private _resetInputValue(): void {
    const inputElement = this.inputElement();
    if (!inputElement) {
      return;
    }

    inputElement.nativeElement.value = '';
  }

  /**
   * Focus the input element. This can be called from a parent component to programmatically focus the search input field.
   *
   * @returns void
   */
  public focus(): void {
    const inputElement = this.inputElement();

    if (!inputElement) {
      return;
    }

    inputElement.nativeElement.focus();
  }
}
