import { ChangeDetectionStrategy, Component, computed, input, model, output, signal } from '@angular/core';
import { DisabledReason, FormValueControl, ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';
import { uniqueId } from '../../../utils';

@Component({
  selector: 'rng-switch-input',
  imports: [],
  templateUrl: './switch-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchInputComponent implements FormValueControl<boolean> {
  public value = model<boolean>(false);

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
  public hint = input<string | null>(null);

  // Template driven form support
  public error = input<boolean>(false);
  public errorMessage = input<string | null>(null);

  public checkedChange = output<boolean>();

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
   * Handle native checkbox change event
   *
   * @param isChecked boolean
   * @returns void
   */
  public onChange(isChecked: boolean): void {
    this.value.set(isChecked);
    this.checkedChange.emit(isChecked);
  }
}
