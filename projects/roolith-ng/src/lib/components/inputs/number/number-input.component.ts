import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { DisabledReason, FormValueControl, ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';
import { uniqueId } from '../../../utils';

@Component({
  selector: 'rng-number-input',
  imports: [],
  templateUrl: './number-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberInputComponent implements FormValueControl<number | null> {
  public value = model<number | null>(null);

  public touched = model<boolean>(false);
  public disabled = input<boolean>(false);
  public disabledReasons = input<readonly WithOptionalFieldTree<DisabledReason>[]>([]);
  public readonly = input<boolean>(false);
  public hidden = input<boolean>(false);
  public invalid = input<boolean>(false);
  public errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);
  public pending = input<boolean>(false);
  public dirty = input<boolean>(false);
  public required = input<boolean>(false);

  public name = input<string>('');
  public label = input<string | null>(null);
  public placeholder = input<string | null>(null);
  public hint = input<string | null>(null);
  public min = input<number | undefined>(undefined);
  public max = input<number | undefined>(undefined);
  public step = input<number>(1);

  // Template driven form support
  public error = input<boolean>(false);
  public errorMessage = input<string | null>(null);

  public id = signal<string>(uniqueId());
  public inputElement = viewChild<ElementRef<HTMLInputElement>>('inputElement');

  public hintMessage = computed<string | null>(() => {
    if (this.error() && this.errorMessage()) {
      return this.errorMessage();
    } else if (this.hint()) {
      return this.hint();
    }

    return null;
  });

  /**
   * Handle native input event and convert the raw string to a number or null
   *
   * @param rawValue string
   * @returns void
   */
  public onInput(rawValue: string): void {
    const parsed = rawValue === '' ? null : Number(rawValue);

    this.value.set(parsed === null || isNaN(parsed) ? null : parsed);
  }

  /**
   * Clear the input value and reset the model to null
   *
   * @returns void
   */
  public clearInput(): void {
    this.value.set(null);

    const inputEl = this.inputElement();
    if (!inputEl) {
      return;
    }

    inputEl.nativeElement.value = '';
  }
}
