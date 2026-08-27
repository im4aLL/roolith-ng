import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateTime } from 'luxon';
import { describe, expect, it, vi } from 'vitest';
import { ISelectPlainOption } from '../select-plain/data-access/select-plain.interface';
import { DateTimePickerInputComponent } from './date-time-picker-input.component';

describe('DateTimePickerInputComponent', () => {
  let component: DateTimePickerInputComponent;
  let fixture: ComponentFixture<DateTimePickerInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateTimePickerInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DateTimePickerInputComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('default values', () => {
    it('should initialize form value state', () => {
      expect(component.value()).toBeNull();
      expect(component.touched()).toBe(false);
      expect(component.disabled()).toBe(false);
      expect(component.readonly()).toBe(false);
      expect(component.required()).toBe(false);
    });

    it('should initialize date time picker state', () => {
      expect(component.calendarValue()).toBeNull();
      expect(component.selectedHour()).toBeUndefined();
      expect(component.selectedMinute()).toBeUndefined();
      expect(component.selectedHourFormat()).toBe('AM');
      expect(component.hourFormats()).toEqual(['AM', 'PM']);
    });
  });

  describe('hintMessage', () => {
    it('should return error message when error and error message are provided', async () => {
      fixture.componentRef.setInput('error', true);
      fixture.componentRef.setInput('errorMessage', 'Date time is required');
      fixture.componentRef.setInput('hint', 'Select date time');
      await fixture.whenStable();

      expect(component.hintMessage()).toBe('Date time is required');
    });

    it('should return hint when error message is not provided', async () => {
      fixture.componentRef.setInput('hint', 'Select date time');
      await fixture.whenStable();

      expect(component.hintMessage()).toBe('Select date time');
    });

    it('should return null when neither error message nor hint exists', () => {
      expect(component.hintMessage()).toBeNull();
    });
  });

  describe('dateTimeFieldLabel', () => {
    it('should return empty string when date is not selected', () => {
      expect(component.dateTimeFieldLabel()).toBe('');
    });

    it('should return formatted date when time is not selected', () => {
      const date = DateTime.fromObject({ year: 2024, month: 6, day: 15 });
      component.calendarValue.set(date);

      expect(component.dateTimeFieldLabel()).toBe(date.toLocaleString(DateTime.DATE_MED));
    });

    it('should return formatted date and time when date and time are selected', () => {
      const date = DateTime.fromObject({ year: 2024, month: 6, day: 15 });
      component.calendarValue.set(date);
      component.selectedHour.set(createMockOption('03', 3));
      component.selectedMinute.set(createMockOption('05', 5));
      component.selectedHourFormat.set('PM');

      expect(component.dateTimeFieldLabel()).toBe(`${date.toLocaleString(DateTime.DATE_MED)} 03:05 PM`);
    });

    it('should return formatted date when hour or minute is empty option', () => {
      const date = DateTime.fromObject({ year: 2024, month: 6, day: 15 });
      component.calendarValue.set(date);
      component.selectedHour.set(createMockOption('', -1));
      component.selectedMinute.set(createMockOption('05', 5));

      expect(component.dateTimeFieldLabel()).toBe(date.toLocaleString(DateTime.DATE_MED));
    });
  });

  describe('isShowPlaceholder', () => {
    it('should return true when label is empty and placeholder exists', async () => {
      fixture.componentRef.setInput('placeholder', 'Select date time');
      await fixture.whenStable();

      expect(component.isShowPlaceholder()).toBe(true);
    });

    it('should return false when date time label exists', async () => {
      fixture.componentRef.setInput('placeholder', 'Select date time');
      await fixture.whenStable();
      component.calendarValue.set(DateTime.fromObject({ year: 2024, month: 6, day: 15 }));

      expect(component.isShowPlaceholder()).toBe(false);
    });
  });

  describe('options', () => {
    it('should include empty option and twelve hour options', () => {
      expect(component.hours()).toHaveLength(13);
      expect(component.hours()[0]).toEqual({ label: '', value: -1 });
      expect(component.hours()[1]).toEqual({ label: '01', value: 1 });
      expect(component.hours()[12]).toEqual({ label: '12', value: 12 });
    });

    it('should include empty option and sixty minute options', () => {
      expect(component.minutes()).toHaveLength(61);
      expect(component.minutes()[0]).toEqual({ label: '', value: -1 });
      expect(component.minutes()[1]).toEqual({ label: '00', value: 0 });
      expect(component.minutes()[60]).toEqual({ label: '59', value: 59 });
    });
  });

  describe('ngOnInit', () => {
    it('should initialize from value', () => {
      const initFromValueSpy = vi.spyOn(component as any, '_initFromValue');

      component.ngOnInit();

      expect(initFromValueSpy).toHaveBeenCalledOnce();
    });
  });

  describe('onCalendarValueChange', () => {
    it('should return early when date is null', () => {
      component.onCalendarValueChange(null);

      expect(component.calendarValue()).toBeNull();
      expect(component.touched()).toBe(false);
    });

    it('should set calendar value, mark touched, and hide popover', () => {
      const hidePopover = vi.fn();
      const date = DateTime.fromObject({ year: 2024, month: 6, day: 15 });
      vi.spyOn(component, 'popoverEl').mockReturnValue({ nativeElement: { hidePopover } as unknown as HTMLElement });

      component.onCalendarValueChange(date);

      expect(component.calendarValue()).toEqual(date);
      expect(component.touched()).toBe(true);
      expect(hidePopover).toHaveBeenCalledOnce();
    });
  });

  describe('change handlers', () => {
    it('should set selected hour', () => {
      const hour = createMockOption('03', 3);

      component.onChangeHour(hour);

      expect(component.selectedHour()).toEqual(hour);
    });

    it('should set selected minute', () => {
      const minute = createMockOption('15', 15);

      component.onChangeMinute(minute);

      expect(component.selectedMinute()).toEqual(minute);
    });

    it('should set selected hour format', () => {
      component.onChangeHourFormat('PM');

      expect(component.selectedHourFormat()).toBe('PM');
    });
  });

  describe('_mergeDateTime', () => {
    it('should merge PM time into date', () => {
      const date = DateTime.fromObject({ year: 2024, month: 6, day: 15 });

      const result = component['_mergeDateTime'](date, { hourValue: 3, minuteValue: 5, hourFormat: 'PM' });

      expect(result.hour).toBe(15);
      expect(result.minute).toBe(5);
      expect(result.second).toBe(0);
      expect(result.millisecond).toBe(0);
    });

    it('should merge 12 AM as midnight', () => {
      const date = DateTime.fromObject({ year: 2024, month: 6, day: 15 });

      const result = component['_mergeDateTime'](date, { hourValue: 12, minuteValue: 30, hourFormat: 'AM' });

      expect(result.hour).toBe(0);
      expect(result.minute).toBe(30);
    });
  });

  describe('_initFromValue', () => {
    it('should not initialize fields when value is null', () => {
      component.value.set(null);

      component['_initFromValue']();

      expect(component.calendarValue()).toBeNull();
      expect(component.selectedHour()).toBeUndefined();
      expect(component.selectedMinute()).toBeUndefined();
    });

    it('should initialize fields from value', () => {
      const date = DateTime.fromObject({ year: 2024, month: 6, day: 15, hour: 15, minute: 5 });
      component.value.set(date);

      component['_initFromValue']();

      expect(component.calendarValue()).toEqual(date.startOf('day'));
      expect(component.selectedHourFormat()).toBe('PM');
      expect(component.selectedHour()).toEqual({ label: '03', value: 3 });
      expect(component.selectedMinute()).toEqual({ label: '05', value: 5 });
    });
  });

  describe('_timeChangeEffect', () => {
    it('should set value to start of selected date when time is incomplete', async () => {
      const date = DateTime.fromObject({ year: 2024, month: 6, day: 15, hour: 12, minute: 30 });
      vi.spyOn(component, 'popoverEl').mockReturnValue({
        nativeElement: { hidePopover: vi.fn() } as unknown as HTMLElement,
      });
      component.calendarValue.set(date);
      component.selectedHour.set(undefined);
      component.selectedMinute.set(undefined);
      await fixture.whenStable();

      expect(component.value()).toEqual(date.startOf('day'));
    });

    it('should merge date and selected time when complete', async () => {
      const date = DateTime.fromObject({ year: 2024, month: 6, day: 15 });
      vi.spyOn(component, 'popoverEl').mockReturnValue({
        nativeElement: { hidePopover: vi.fn() } as unknown as HTMLElement,
      });
      component.calendarValue.set(date);
      component.selectedHour.set(createMockOption('03', 3));
      component.selectedMinute.set(createMockOption('15', 15));
      component.selectedHourFormat.set('PM');
      await fixture.whenStable();

      expect(component.value()?.hour).toBe(15);
      expect(component.value()?.minute).toBe(15);
    });
  });
});

/**
 * Creates a mock select option.
 *
 * @param label string
 * @param value number
 * @returns ISelectPlainOption
 */
function createMockOption(label: string, value: number): ISelectPlainOption {
  return { label, value };
}
