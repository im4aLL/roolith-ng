import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateTime } from 'luxon';
import { describe, expect, it, vi } from 'vitest';
import { ICalendarDay } from '../data-access/date-picker.interface';
import { CalendarComponent } from './calendar.component';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize calendar metadata', () => {
      component.ngOnInit();

      expect(component.weekHeaders()).toEqual(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']);
      expect(component.months()).toHaveLength(12);
      expect(component.months()[0]).toEqual({ name: 'Jan', value: 1 });
      expect(component.years()).toHaveLength(121);
    });

    it('should setup initial selected date', () => {
      const setupInitialSelectedDateSpy = vi.spyOn(component as any, '_setupInitialSelectedDate');

      component.ngOnInit();

      expect(setupInitialSelectedDateSpy).toHaveBeenCalledOnce();
    });
  });

  describe('daysInMonth', () => {
    it('should return month grid for selected year and month', () => {
      const getMonthGridSpy = vi.spyOn(component, 'getMonthGrid');
      component.selectedYear.set(2024);
      component.selectedMonth.set(6);

      component.daysInMonth();

      expect(getMonthGridSpy).toHaveBeenCalledWith(2024, 6);
    });
  });

  describe('getMonthGrid', () => {
    it('should return 35 cells for a month fitting five calendar rows', () => {
      const grid = component.getMonthGrid(2024, 2);

      expect(grid).toHaveLength(35);
    });

    it('should return 42 cells for a month requiring six calendar rows', () => {
      const grid = component.getMonthGrid(2024, 3);

      expect(grid).toHaveLength(42);
    });

    it('should include leading days from previous month', () => {
      const grid = component.getMonthGrid(2024, 6);

      expect(grid[0].date.month).toBe(5);
      expect(grid[0].isPartOfPreviousMonth).toBe(true);
      expect(grid[0].isCurrentMonth).toBe(false);
    });

    it('should include trailing days from next month', () => {
      const grid = component.getMonthGrid(2024, 6);
      const trailingDay = grid[grid.length - 1];

      expect(trailingDay.date.month).toBe(7);
      expect(trailingDay.isPartOfNextMonth).toBe(true);
      expect(trailingDay.isCurrentMonth).toBe(false);
    });

    it('should mark selected day', () => {
      component.selectedDate.set(DateTime.local(2024, 6, 15));

      const selectedDay = component.getMonthGrid(2024, 6).find((day) => day.date.hasSame(DateTime.local(2024, 6, 15), 'day'));

      expect(selectedDay?.isSelected).toBe(true);
    });
  });

  describe('_setupInitialSelectedDate', () => {
    it('should return when initial value is null', () => {
      component.value.set(null);

      component['_setupInitialSelectedDate']();

      expect(component.selectedDate()).toBeNull();
    });

    it('should set selected date, month, and year from value', () => {
      const initialValue = DateTime.local(2024, 6, 15);
      component.value.set(initialValue);

      component['_setupInitialSelectedDate']();

      expect(component.selectedDate()).toEqual(initialValue);
      expect(component.selectedMonth()).toBe(6);
      expect(component.selectedYear()).toBe(2024);
    });
  });

  describe('_getWeekdayHeaders', () => {
    it('should return weekday headers starting on Sunday', () => {
      expect(component['_getWeekdayHeaders']()).toEqual(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']);
    });
  });

  describe('_getMonths', () => {
    it('should return month names and values', () => {
      const months = component['_getMonths']();

      expect(months).toHaveLength(12);
      expect(months[0]).toEqual({ name: 'Jan', value: 1 });
      expect(months[11]).toEqual({ name: 'Dec', value: 12 });
    });
  });

  describe('_getYears', () => {
    it('should return years from 100 years ago to 20 years ahead', () => {
      const currentYear = DateTime.local().year;
      const years = component['_getYears']();

      expect(years[0]).toBe(currentYear - 100);
      expect(years[years.length - 1]).toBe(currentYear + 20);
      expect(years).toHaveLength(121);
    });
  });

  describe('renderPreviousMonth', () => {
    it('should decrement selected month', () => {
      component.selectedMonth.set(6);
      component.selectedYear.set(2024);

      component.renderPreviousMonth();

      expect(component.selectedMonth()).toBe(5);
      expect(component.selectedYear()).toBe(2024);
    });

    it('should wrap to December and decrement year from January', () => {
      component.selectedMonth.set(1);
      component.selectedYear.set(2024);

      component.renderPreviousMonth();

      expect(component.selectedMonth()).toBe(12);
      expect(component.selectedYear()).toBe(2023);
    });
  });

  describe('renderNextMonth', () => {
    it('should increment selected month', () => {
      component.selectedMonth.set(6);
      component.selectedYear.set(2024);

      component.renderNextMonth();

      expect(component.selectedMonth()).toBe(7);
      expect(component.selectedYear()).toBe(2024);
    });

    it('should wrap to January and increment year from December', () => {
      component.selectedMonth.set(12);
      component.selectedYear.set(2024);

      component.renderNextMonth();

      expect(component.selectedMonth()).toBe(1);
      expect(component.selectedYear()).toBe(2025);
    });
  });

  describe('onMonthChange', () => {
    it('should set selected month from event value', () => {
      component.onMonthChange(createSelectChangeEvent('6'));

      expect(component.selectedMonth()).toBe(6);
    });

    it('should ignore invalid month values', () => {
      component.selectedMonth.set(6);

      component.onMonthChange(createSelectChangeEvent('13'));

      expect(component.selectedMonth()).toBe(6);
    });
  });

  describe('onYearChange', () => {
    it('should set selected year from event value', () => {
      component.onYearChange(createSelectChangeEvent('2024'));

      expect(component.selectedYear()).toBe(2024);
    });

    it('should ignore invalid year values', () => {
      component.selectedYear.set(2024);

      component.onYearChange(createSelectChangeEvent('invalid'));

      expect(component.selectedYear()).toBe(2024);
    });
  });

  describe('onDayClickHandler', () => {
    it('should set selected date and value', () => {
      const dayData = createMockCalendarDay(DateTime.local(2024, 6, 15));

      component.onDayClickHandler(dayData);

      expect(component.selectedDate()).toEqual(dayData.date);
      expect(component.value()).toEqual(dayData.date);
    });

    it('should render next month when day is part of next month', () => {
      const renderNextMonthSpy = vi.spyOn(component, 'renderNextMonth');
      const dayData = createMockCalendarDay(DateTime.local(2024, 7, 1), { isPartOfNextMonth: true });

      component.onDayClickHandler(dayData);

      expect(renderNextMonthSpy).toHaveBeenCalledOnce();
    });

    it('should render previous month when day is part of previous month', () => {
      const renderPreviousMonthSpy = vi.spyOn(component, 'renderPreviousMonth');
      const dayData = createMockCalendarDay(DateTime.local(2024, 5, 31), { isPartOfPreviousMonth: true });

      component.onDayClickHandler(dayData);

      expect(renderPreviousMonthSpy).toHaveBeenCalledOnce();
    });
  });
});

/**
 * Creates a select change event.
 *
 * @param value string
 * @returns Event
 */
function createSelectChangeEvent(value: string): Event {
  return { target: { value } } as unknown as Event;
}

/**
 * Creates a mock calendar day.
 *
 * @param date DateTime
 * @param overrides Partial<ICalendarDay>
 * @returns ICalendarDay
 */
function createMockCalendarDay(date: DateTime, overrides: Partial<ICalendarDay> = {}): ICalendarDay {
  return {
    date,
    day: date.day,
    isCurrentMonth: true,
    isToday: false,
    weekdayShort: date.toFormat('ccc'),
    isPartOfPreviousMonth: false,
    isPartOfNextMonth: false,
    isSelected: false,
    ...overrides,
  };
}
