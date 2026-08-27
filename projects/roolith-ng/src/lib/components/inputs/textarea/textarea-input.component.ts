import { ChangeDetectionStrategy, Component, computed, input, model, signal } from '@angular/core';
import { DisabledReason, FormValueControl, ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';
import { uniqueId } from '../../../utils';

@Component({
  selector: 'rng-textarea-input',
  imports: [],
  templateUrl: './textarea-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaInputComponent implements FormValueControl<string> {
  public value = model<string>('');

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
  public rows = input<number>(4);
  public autoResize = input<boolean>(false);
  public maxLength = input<number | undefined>(undefined);
  public showCharCount = input<boolean>(false);

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

  public charCount = computed<number>(() => this.value().length);

  public isAtLimit = computed<boolean>(() => {
    const max = this.maxLength();

    return max !== undefined && this.charCount() >= max;
  });

  /**
   * Handle input event — updates value, enforces maxLength, and resizes textarea if autoResize is enabled
   *
   * @param event Event
   * @returns void
   */
  public onInput(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    const max = this.maxLength();

    if (max !== undefined && textarea.value.length > max) {
      textarea.value = textarea.value.slice(0, max);
    }

    this.value.set(textarea.value);

    if (this.autoResize()) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }
}
