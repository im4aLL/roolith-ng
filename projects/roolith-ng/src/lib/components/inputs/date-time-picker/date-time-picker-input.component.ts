import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  model,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { CalendarComponent } from '../date-picker/calendar/calendar.component';
import { ITimePickerHourFormat } from '../time-picker/data-access/time-picker-input.interface';
import { DisabledReason, FormValueControl, ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';
import { DateTime, DateTimeFormatOptions } from 'luxon';
import { SelectPlainComponent } from '../select-plain/select-plain.component';
import { ButtonGroupComponent } from '../../button/group/button-group.component';
import { uniqueId } from '../../../utils';
import { ISelectPlainOption } from '../select-plain/data-access/select-plain.interface';

@Component({
  selector: 'rng-date-time-picker-input',
  imports: [CalendarComponent, SelectPlainComponent, ButtonGroupComponent],
  templateUrl: './date-time-picker-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTimePickerInputComponent implements FormValueControl<DateTime | null>, OnInit {
  public value = model<DateTime | null>(null);

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
  public format = input<DateTimeFormatOptions>(DateTime.DATE_MED);

  // Template driven form support
  public error = input<boolean>(false);
  public errorMessage = input<string | null>(null);

  public id = signal<string>(uniqueId());
  public popoverEl = viewChild<ElementRef<HTMLElement>>('popoverEl');

  public calendarValue = signal<DateTime | null>(null);
  public hours = signal<ISelectPlainOption[]>(this._getHoursOptions());
  public minutes = signal<ISelectPlainOption[]>(this._getMinutesOptions());
  public hourFormats = signal<ITimePickerHourFormat[]>(['AM', 'PM']);
  public selectedHourFormat = signal<ITimePickerHourFormat | null>('AM');
  public selectedHour = signal<ISelectPlainOption | undefined>(undefined);
  public selectedMinute = signal<ISelectPlainOption | undefined>(undefined);

  public hintMessage = computed<string | null>(() => {
    if (this.error() && this.errorMessage()) {
      return this.errorMessage();
    } else if (this.hint()) {
      return this.hint();
    }

    return null;
  });

  public dateTimeFieldLabel = computed<string>(() => {
    const date = this.calendarValue();
    const hour = this.selectedHour();
    const minute = this.selectedMinute();

    if (!date) {
      return '';
    }

    const dateStr = date.toLocaleString(this.format());

    if (!hour || !minute || hour.value === -1 || minute.value === -1) {
      return dateStr;
    }

    const timeStr = `${hour.label}:${minute.label} ${this.selectedHourFormat() ?? ''}`;

    return `${dateStr} ${timeStr}`;
  });

  public isShowPlaceholder = computed(() => {
    return this.dateTimeFieldLabel().length === 0 && !!this.placeholder();
  });

  private _timeChangeEffect = effect(() => {
    const hour = this.selectedHour();
    const minute = this.selectedMinute();
    const hourFormat = this.selectedHourFormat();
    const date = this.calendarValue();

    if (!date) {
      return;
    }

    if (!hour || !minute || hour.value === -1 || minute.value === -1) {
      this.value.set(date.startOf('day'));
      return;
    }

    this.value.set(
      this._mergeDateTime(date, { hourValue: hour.value as number, minuteValue: minute.value as number, hourFormat }),
    );
  });

  public ngOnInit(): void {
    this._initFromValue();
  }

  /**
   * Handle calendar date selection — updates date part and merges with current time
   *
   * @param date DateTime | null
   * @returns void
   */
  public onCalendarValueChange(date: DateTime | null): void {
    if (!date) {
      return;
    }

    this.calendarValue.set(date);
    this.touched.set(true);
    // ------------------------------------------------------
    // Note: timeChangeEffect will handle merging date with time and updating the main value
    // No need to set value here directly, as calendarValue is a dependency of timeChangeEffect
    // ------------------------------------------------------

    this.popoverEl()?.nativeElement?.hidePopover();
  }

  /**
   * Handle hour selection change
   *
   * @param data ISelectPlainOption | undefined
   * @returns void
   */
  public onChangeHour(data: ISelectPlainOption | undefined): void {
    this.selectedHour.set(data);
  }

  /**
   * Handle minute selection change
   *
   * @param data ISelectPlainOption | undefined
   * @returns void
   */
  public onChangeMinute(data: ISelectPlainOption | undefined): void {
    this.selectedMinute.set(data);
  }

  /**
   * Handle AM/PM format change
   *
   * @param format string
   * @returns void
   */
  public onChangeHourFormat(format: string): void {
    this.selectedHourFormat.set(format as ITimePickerHourFormat);
  }

  /**
   * Merge date, hour, minute and AM/PM format into a single DateTime
   *
   * @param date DateTime
   * @param hourValue number
   * @param minuteValue number
   * @param hourFormat ITimePickerHourFormat | null
   * @returns DateTime
   */
  private _mergeDateTime(
    date: DateTime,
    options: { hourValue: number; minuteValue: number; hourFormat: ITimePickerHourFormat | null },
  ): DateTime {
    let hour = options.hourValue;

    if (options.hourFormat === 'PM' && hour !== 12) {
      hour += 12;
    } else if (options.hourFormat === 'AM' && hour === 12) {
      hour = 0;
    }

    return date.set({ hour, minute: options.minuteValue, second: 0, millisecond: 0 });
  }

  /**
   * Initialize calendar and time selectors from a pre-set value input
   *
   * @returns void
   */
  private _initFromValue(): void {
    const initial = this.value();

    if (!initial) {
      return;
    }

    const { hour, minute } = initial;
    const hourFormat: ITimePickerHourFormat = hour >= 12 ? 'PM' : 'AM';
    const hourIn12 = hour % 12 === 0 ? 12 : hour % 12;

    this.calendarValue.set(initial.startOf('day'));
    this.selectedHourFormat.set(hourFormat);
    this.selectedHour.set({ label: hourIn12.toString().padStart(2, '0'), value: hourIn12 });
    this.selectedMinute.set({ label: minute.toString().padStart(2, '0'), value: minute });
  }

  /**
   * Build 12-hour hours options list
   *
   * @returns ISelectPlainOption[]
   */
  private _getHoursOptions(): ISelectPlainOption[] {
    const result: ISelectPlainOption[] = Array.from({ length: 12 }, (_, i) => ({
      label: (i + 1).toString().padStart(2, '0'),
      value: i + 1,
    }));

    return [{ label: '', value: -1 }, ...result];
  }

  /**
   * Build minutes options list
   *
   * @returns ISelectPlainOption[]
   */
  private _getMinutesOptions(): ISelectPlainOption[] {
    const result: ISelectPlainOption[] = Array.from({ length: 60 }, (_, i) => ({
      label: i.toString().padStart(2, '0'),
      value: i,
    }));

    return [{ label: '', value: -1 }, ...result];
  }
}
