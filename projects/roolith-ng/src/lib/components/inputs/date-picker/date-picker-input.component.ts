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
import { CalendarComponent } from './calendar/calendar.component';
import { DisabledReason, FormValueControl, ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';
import { DateTime, DateTimeFormatOptions } from 'luxon';
import { uniqueId } from '../../../utils';

@Component({
  selector: 'rng-date-picker-input',
  imports: [CalendarComponent],
  templateUrl: './date-picker-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerInputComponent implements FormValueControl<DateTime | null> {
  public value = model<DateTime | null>(null);

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

  public name = input<string>('');
  public label = input<string | null>(null);
  public placeholder = input<string | null>(null);
  public hint = input<string | null>(null);
  public format = input<DateTimeFormatOptions>(DateTime.DATE_MED);

  public popoverEl = viewChild<ElementRef<HTMLElement>>('popoverEl');
  public calendarValue = signal<DateTime | null>(null);
  public dateFieldLabel = computed<string>(() => {
    const date = this.calendarValue();

    if (date) {
      return date.toLocaleString(this.format());
    }

    return '';
  });
  public isShowPlaceholder = computed(() => {
    return this.dateFieldLabel().length === 0 && !!this.placeholder();
  });

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

  /**
   * Handle calendar value change event
   *
   * @param value DateTime | null
   * @returns void
   */
  public onCalendarValueChange(value: DateTime | null): void {
    if (!value) {
      return;
    }

    this.calendarValue.set(value);
    this.value.set(value);
    this.touched.set(true);

    this.popoverEl()?.nativeElement?.hidePopover();
  }

  /**
   * Clear the input value and reset the model to null
   *
   * @return void
   */
  public clearInput(): void {
    this.calendarValue.set(null);
    this.value.set(null);
    this.touched.set(true);

    this.popoverEl()?.nativeElement?.hidePopover();
  }
}
