import { ChangeDetectionStrategy, Component, computed, input, model, output, signal } from '@angular/core';
import { DisabledReason, FormValueControl, ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';
import { uniqueId } from '../../../utils';

@Component({
  selector: 'rng-file-input',
  imports: [],
  templateUrl: './file-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileInputComponent implements FormValueControl<File[]> {
  public value = model<File[]>([]);

  public touched = model<boolean>(false);
  public disabledReasons = input<readonly WithOptionalFieldTree<DisabledReason>[]>([]);
  public disabled = input<boolean>(false);
  public readonly = input<boolean>(false);
  public hidden = input<boolean>(false);
  public invalid = input<boolean>(false);
  public errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);
  public pending = input<boolean>(false);
  public dirty = input<boolean>(false);
  public required = input<boolean>(false);

  public label = input<string | null>(null);
  public hint = input<string | null>(null);
  public name = input<string>('');
  public accept = input<string>('');
  public multiple = input<boolean>(false);
  public error = input<boolean>(false);
  public errorMessage = input<string | null>(null);

  public fileChange = output<File[]>();

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
   * Handle the native file input change event, update value model and emit the selected files.
   *
   * @param event Event
   * @return void
   */
  public onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files ? Array.from(input.files) : [];

    this.value.set(files);
    this.touched.set(true);
    this.fileChange.emit(files);
  }
}
