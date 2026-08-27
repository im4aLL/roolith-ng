import { ChangeDetectionStrategy, Component, computed, model, OnInit, signal } from '@angular/core';
import { DateTime } from 'luxon';
import { ICalendarDay, IMonth } from '../data-access/date-picker.interface';
import { ButtonComponent } from '../../../button/button.component';

@Component({
  selector: 'rng-calendar',
  imports: [ButtonComponent],
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {
  public value = model<DateTime | null>(null);

  public weekHeaders = signal<string[]>([]);
  public months = signal<IMonth[]>([]);
  public years = signal<number[]>([]);

  public selectedMonth = signal<number>(DateTime.local().month);
  public selectedYear = signal<number>(DateTime.local().year);
  public selectedDate = signal<DateTime | null>(null);

  public daysInMonth = computed<ICalendarDay[]>(() => this.getMonthGrid(this.selectedYear(), this.selectedMonth()));

  ngOnInit(): void {
    this.weekHeaders.set(this._getWeekdayHeaders());
    this.months.set(this._getMonths());
    this.years.set(this._getYears());

    this._setupInitialSelectedDate();
  }

  /**
   * On component initialization, check if there's an initial value for the date picker.
   *
   * @returns void
   */
  private _setupInitialSelectedDate(): void {
    const initialValue = this.value();

    if (!initialValue) {
      return;
    }

    this.selectedDate.set(initialValue);
    this.selectedMonth.set(initialValue.month);
    this.selectedYear.set(initialValue.year);
  }

  /**
   * Generate a grid of calendar days for a given month and year,
   * including leading and trailing days from adjacent months to fill out the calendar view.
   *
   * @param year number
   * @param month number
   * @returns ICalendarDay[]
   */
  public getMonthGrid(year: number, month: number): ICalendarDay[] {
    const firstOfMonth = DateTime.local(year, month, 1);
    const today = DateTime.local();

    const leadingDays = firstOfMonth.weekday % 7;
    const { daysInMonth } = firstOfMonth;

    const safeDaysInMonth = daysInMonth ?? 30;
    const cellCount = leadingDays + safeDaysInMonth <= 35 ? 35 : 42;
    const gridStart = firstOfMonth.minus({ days: leadingDays });

    const selectedDate = this.selectedDate();

    return Array.from({ length: cellCount }, (_, index) => {
      const date = gridStart.plus({ days: index });

      return {
        date,
        day: date.day,
        isCurrentMonth: date.month === month,
        isToday: date.hasSame(today, 'day'),
        weekdayShort: date.toFormat('ccc'),
        isPartOfPreviousMonth: date < firstOfMonth,
        isPartOfNextMonth: date > firstOfMonth.endOf('month'),
        isSelected: selectedDate ? date.hasSame(selectedDate, 'day') : false,
      };
    });
  }

  /**
   * Generate a list of weekday headers for the calendar view, starting from Sunday.
   *
   * @returns string[]
   */
  private _getWeekdayHeaders(): string[] {
    const base = DateTime.fromObject({ weekday: 7 });

    return Array.from({ length: 7 }, (_, i) => base.plus({ days: i }).toFormat('ccc').slice(0, 2));
  }

  /**
   * Generate a list of months for the month dropdown, with both name and value.
   *
   * @returns IMonth[]
   */
  private _getMonths(): IMonth[] {
    return Array.from({ length: 12 }, (_, i) => ({
      name: DateTime.fromObject({ month: i + 1 }).toFormat('LLL'),
      value: i + 1,
    }));
  }

  /**
   * Generate a list of years for the year dropdown, ranging from 100 years in the past to 20 years in the future.
   *
   * @returns number[]
   */
  private _getYears(): number[] {
    const currentYear = DateTime.local().year;
    const startYear = currentYear - 100;
    const endYear = currentYear + 20;

    return Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i);
  }

  /**
   * Render the previous month in the calendar view.
   * If the current month is January, it wraps around to December and decrements the year.
   *
   * @returns void
   */
  public renderPreviousMonth(): void {
    if (this.selectedMonth() === 1) {
      this.selectedMonth.set(12);
      this.selectedYear.update((year) => year - 1);
    } else {
      this.selectedMonth.update((month) => month - 1);
    }
  }

  /**
   * Render the next month in the calendar view.
   * If the current month is December, it wraps around to January and increments the year.
   *
   * @returns void
   */
  public renderNextMonth(): void {
    if (this.selectedMonth() === 12) {
      this.selectedMonth.set(1);
      this.selectedYear.update((year) => year + 1);
    } else {
      this.selectedMonth.update((month) => month + 1);
    }
  }

  /**
   * Handle month selection change
   *
   * @param event Event
   * @returns void
   */
  public onMonthChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const newMonth = parseInt(selectElement.value, 10);

    if (isNaN(newMonth) || newMonth < 1 || newMonth > 12) {
      return;
    }

    this.selectedMonth.set(newMonth);
  }

  /**
   * Handle year selection change
   *
   * @param event Event
   * @returns void
   */
  public onYearChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const newYear = parseInt(selectElement.value, 10);

    if (isNaN(newYear)) {
      return;
    }

    this.selectedYear.set(newYear);
  }

  /**
   * Handle day click event to select a date.
   * If the clicked day is part of the next or previous month, it also updates the calendar view accordingly.
   *
   * @param dayData ICalendarDay
   * @return void
   */
  public onDayClickHandler(dayData: ICalendarDay): void {
    this.selectedDate.set(dayData.date);

    if (dayData.isPartOfNextMonth) {
      this.renderNextMonth();
    }

    if (dayData.isPartOfPreviousMonth) {
      this.renderPreviousMonth();
    }

    this.value.set(dayData.date);
  }
}
