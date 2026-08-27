import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { DisabledReason, FormValueControl, ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';
import { ISelectPlainOption } from './data-access/select-plain.interface';
import { uniqueId } from '../../../utils';

@Component({
  selector: 'rng-select-plain',
  imports: [],
  templateUrl: './select-plain.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectPlainComponent implements FormValueControl<ISelectPlainOption | undefined> {
  public value = model<ISelectPlainOption | undefined>();

  public touched = model<boolean>(false);
  public disabledReasons = input<readonly WithOptionalFieldTree<DisabledReason>[]>([]);
  public disabled = input<boolean>(false);
  public hidden = input<boolean>(false);
  public invalid = input<boolean>(false);
  public errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);
  public pending = input<boolean>(false);
  public dirty = input<boolean>(false);
  public required = input<boolean>(false);

  public name = input<string>('');
  public label = input<string | null>(null);
  public hint = input<string | null>(null);
  public data = input<ISelectPlainOption[]>([]);

  public error = input<boolean>(false);
  public errorMessage = input<string | null>(null);

  public id = input<string>(uniqueId());
  public hintMessage = computed<string | null>(() => {
    if (this.error() && this.errorMessage()) {
      return this.errorMessage();
    } else if (this.hint()) {
      return this.hint();
    }

    return null;
  });

  /**
   * Handles the change event of the select input.
   *
   * @param event Event
   * @returns void
   */
  public onChangeHandler(event: Event): void {
    const { value } = event.target as HTMLSelectElement;
    const newValue = this.data().find((option) => option.value === value || `${option.value}` === `${value}`);

    this.value.set(newValue);
  }
}
