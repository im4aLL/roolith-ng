import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  HostListener,
  input,
  model,
  OnInit,
  signal,
} from '@angular/core';
import { ITimePickerHourFormat } from './data-access/time-picker-input.interface';
import { DisabledReason, FormValueControl, ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';
import { DateTime } from 'luxon';
import { ButtonGroupComponent } from '../../button/group/button-group.component';
import { SelectPlainComponent } from '../select-plain/select-plain.component';
import { uniqueId } from '../../../utils';
import { ISelectPlainOption } from '../select-plain/data-access/select-plain.interface';

@Component({
  selector: 'rng-time-picker-input',
  imports: [ButtonGroupComponent, SelectPlainComponent],
  templateUrl: './time-picker-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimePickerInputComponent implements FormValueControl<DateTime | null>, OnInit {
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

  public hours = signal<ISelectPlainOption[]>(this._getHoursOptions());
  public minutes = signal<ISelectPlainOption[]>(this._getMinutesOptions());
  public hourFormats = signal<ITimePickerHourFormat[]>(['AM', 'PM']);
  public selectedHourFormat = signal<ITimePickerHourFormat | null>('AM');
  public selectedHour = signal<ISelectPlainOption | undefined>(undefined);
  public selectedMinute = signal<ISelectPlainOption | undefined>(undefined);

  private _changeEffect = effect(() => {
    const hour = this.selectedHour();
    const minute = this.selectedMinute();
    const hourFormat = this.selectedHourFormat();

    if (hour && minute && hourFormat) {
      let hourValue = hour.value as number;

      if (hourFormat === 'PM' && hourValue !== 12) {
        hourValue += 12;
      } else if (hourFormat === 'AM' && hourValue === 12) {
        hourValue = 0;
      }

      this.value.set(DateTime.fromObject({ hour: hourValue, minute: minute.value as number }));
    } else {
      this.value.set(null);
    }
  });

  ngOnInit(): void {
    this._setValueFromInitialDateTime();
  }

  /**
   * Set initial value for hour, minute and hour format based on the initial DateTime value
   *
   * @returns void
   */
  private _setValueFromInitialDateTime(): void {
    const initialDateTime = this.value();

    if (!initialDateTime) {
      return;
    }

    const { hour, minute } = initialDateTime;
    const hourFormat: ITimePickerHourFormat = hour >= 12 ? 'PM' : 'AM';
    const hourIn12Format = hour % 12 === 0 ? 12 : hour % 12;

    this.selectedHourFormat.set(hourFormat);
    this.selectedHour.set({ label: hourIn12Format.toString().padStart(2, '0'), value: hourIn12Format });
    this.selectedMinute.set({ label: minute.toString().padStart(2, '0'), value: minute });
  }

  /**
   * Get hours options for 12 hour format
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
   * Get minutes options for time picker
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

  /**
   * Handle hour format change when user selects AM or PM
   *
   * @param format string
   * @returns void
   */
  public onChangeHourFormat(format: string): void {
    this.selectedHourFormat.set(format as ITimePickerHourFormat);
  }

  /**
   * Handle hour change when user selects an hour from the dropdown
   *
   * @param data ISelectPlainOption | undefined
   * @returns void
   */
  public onChangeHour(data: ISelectPlainOption | undefined): void {
    this.selectedHour.set(data);
  }

  /**
   * Handle minute change when user selects a minute from the dropdown
   *
   * @param data ISelectPlainOption | undefined
   * @returns void
   */
  public onChangeMinute(data: ISelectPlainOption | undefined): void {
    this.selectedMinute.set(data);
  }

  /**
   * Handle blur event to mark the control as touched
   *
   * @returns void
   */
  @HostListener('blur')
  public onBlur(): void {
    this.touched.set(true);
  }
}
