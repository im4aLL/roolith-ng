import { ChangeDetectionStrategy, Component, computed, input, model, signal } from '@angular/core';
import { DisabledReason, FormValueControl, ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';
import { uniqueId } from '../../../utils';
import { TextInputType } from './data-access/text-input.interface';

@Component({
  selector: 'rng-text-input',
  imports: [],
  templateUrl: './text-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputComponent implements FormValueControl<string> {
  public value = model<string>('');

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
  minLength = input<number | undefined>(undefined);
  maxLength = input<number | undefined>(undefined);
  pattern = input<readonly RegExp[]>([]);

  public name = input<string>('');
  public label = input<string | null>(null);
  public placeholder = input<string | null>(null);
  public hint = input<string | null>(null);
  public type = input<TextInputType>('text');

  // Template driven form support
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
}
