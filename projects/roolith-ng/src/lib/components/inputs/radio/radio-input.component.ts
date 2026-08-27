import { ChangeDetectionStrategy, Component, computed, input, model, signal } from '@angular/core';
import { DisabledReason, FormValueControl, ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';
import { uniqueId } from '../../../utils';
import { IRadioOption } from './data-access/radio-input.interface';

@Component({
  selector: 'rng-radio-input',
  imports: [],
  templateUrl: './radio-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioInputComponent implements FormValueControl<string | number | null> {
  public value = model<string | number | null>(null);

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

  public options = input<IRadioOption[]>([]);
  public name = input<string>('');
  public label = input<string | null>(null);
  public hint = input<string | null>(null);
  public inline = input<boolean>(false);
  public error = input<boolean>(false);
  public errorMessage = input<string | null>(null);

  public id = signal<string>(uniqueId());
  public hintMessage = computed<string | null>(() => {
    if (this.error() && this.errorMessage()) {
      return this.errorMessage();
    } else if (this.hint()) {
      return this.hint();
    }

    return null;
  });

  /**
   * Handle the change event of the radio input and update the value accordingly.
   *
   * @param event Event
   * @returns void
   */
  public onChange(event: Event): void {
    const { value: rawValue } = event.target as HTMLInputElement;
    const matched = this.options().find((opt) => String(opt.value) === rawValue);

    this.value.set(matched?.value ?? null);
  }
}
