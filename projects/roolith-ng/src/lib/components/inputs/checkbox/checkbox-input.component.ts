import { ChangeDetectionStrategy, Component, effect, input, model } from '@angular/core';
import { DisabledReason, FormCheckboxControl, ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';

@Component({
  selector: 'rng-checkbox-input',
  imports: [],
  templateUrl: './checkbox-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxInputComponent implements FormCheckboxControl {
  /**
   * FormCheckboxControl required state
   */
  checked = model<boolean>(false);

  /**
   * FormCheckboxControl specific inputs
   */
  touched = model<boolean>(false);
  disabled = input<boolean>(false);
  disabledReasons = input<readonly WithOptionalFieldTree<DisabledReason>[]>([]);
  readonly = input<boolean>(false);
  hidden = input<boolean>(false);
  invalid = input<boolean>(false);
  errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);
  pending = input<boolean>(false);
  dirty = input<boolean>(false);
  required = input<boolean>(false);

  /**
   * UI component specific inputs
   */
  public name = input<string>('');
  public error = input<boolean>(false);
  public standalone = input<boolean>(false);
  public indeterminate = model<boolean>(false);

  /**
   * Effect to update the indeterminate state of the checkbox input based on the checked state.
   *
   * If the checkbox is checked, the indeterminate state is set to false. If the checkbox is unchecked, the indeterminate state is set to true.
   * This ensures that the indeterminate state is only active when the checkbox is unchecked, providing a clear visual indication of the checkbox's state.
   */
  private _checkedEffect = effect(() => {
    const isChecked = this.checked();

    this.indeterminate.set(isChecked === true ? false : this.indeterminate());
  });

  /**
   * Handle the change event of the checkbox input and update the checked state accordingly.
   *
   * @param event Event
   * @returns void
   */
  public onChange(event: Event): void {
    const { checked: isChecked } = event.target as HTMLInputElement;

    this.checked.set(isChecked);
  }
}
