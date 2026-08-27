import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateTime } from 'luxon';
import { describe, expect, it, vi } from 'vitest';
import { DatePickerInputComponent } from './date-picker-input.component';

describe('DatePickerInputComponent', () => {
  let component: DatePickerInputComponent;
  let fixture: ComponentFixture<DatePickerInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatePickerInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatePickerInputComponent);
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

    it('should initialize date picker configuration', () => {
      expect(component.name()).toBe('');
      expect(component.label()).toBeNull();
      expect(component.placeholder()).toBeNull();
      expect(component.hint()).toBeNull();
      expect(component.calendarValue()).toBeNull();
    });

    it('should initialize validation inputs', () => {
      expect(component.invalid()).toBe(false);
      expect(component.errors()).toEqual([]);
      expect(component.pending()).toBe(false);
      expect(component.dirty()).toBe(false);
    });
  });

  describe('inputs', () => {
    it('should use metadata input values', async () => {
      fixture.componentRef.setInput('name', 'startDate');
      fixture.componentRef.setInput('label', 'Start date');
      fixture.componentRef.setInput('placeholder', 'Select date');
      fixture.componentRef.setInput('hint', 'Choose a date');
      await fixture.whenStable();

      expect(component.name()).toBe('startDate');
      expect(component.label()).toBe('Start date');
      expect(component.placeholder()).toBe('Select date');
      expect(component.hint()).toBe('Choose a date');
    });

    it('should use state input values', async () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.componentRef.setInput('readonly', true);
      fixture.componentRef.setInput('required', true);
      fixture.componentRef.setInput('invalid', true);
      await fixture.whenStable();

      expect(component.disabled()).toBe(true);
      expect(component.readonly()).toBe(true);
      expect(component.required()).toBe(true);
      expect(component.invalid()).toBe(true);
    });
  });

  describe('dateFieldLabel', () => {
    it('should return empty string when date is not selected', () => {
      expect(component.dateFieldLabel()).toBe('');
    });

    it('should return formatted date when date is selected', () => {
      const date = DateTime.fromObject({ year: 2024, month: 6, day: 15 });
      component.calendarValue.set(date);

      expect(component.dateFieldLabel()).toBe(date.toLocaleString(DateTime.DATE_MED));
    });
  });

  describe('isShowPlaceholder', () => {
    it('should return true when label is empty and placeholder exists', async () => {
      fixture.componentRef.setInput('placeholder', 'Select date');
      await fixture.whenStable();

      expect(component.isShowPlaceholder()).toBe(true);
    });

    it('should return false when date label exists', async () => {
      fixture.componentRef.setInput('placeholder', 'Select date');
      await fixture.whenStable();
      component.calendarValue.set(DateTime.fromObject({ year: 2024, month: 6, day: 15 }));

      expect(component.isShowPlaceholder()).toBe(false);
    });

    it('should return false when placeholder is missing', () => {
      expect(component.isShowPlaceholder()).toBe(false);
    });
  });

  describe('hintMessage', () => {
    it('should return error message when error and error message are provided', async () => {
      fixture.componentRef.setInput('error', true);
      fixture.componentRef.setInput('errorMessage', 'Date is required');
      fixture.componentRef.setInput('hint', 'Choose a date');
      await fixture.whenStable();

      expect(component.hintMessage()).toBe('Date is required');
    });

    it('should return hint when error message is not provided', async () => {
      fixture.componentRef.setInput('hint', 'Choose a date');
      await fixture.whenStable();

      expect(component.hintMessage()).toBe('Choose a date');
    });

    it('should return null when neither error message nor hint exists', () => {
      expect(component.hintMessage()).toBeNull();
    });

    it('should return hint when error is true but error message is missing', async () => {
      fixture.componentRef.setInput('error', true);
      fixture.componentRef.setInput('hint', 'Choose a date');
      await fixture.whenStable();

      expect(component.hintMessage()).toBe('Choose a date');
    });
  });

  describe('onCalendarValueChange', () => {
    it('should return early when value is null', () => {
      component.onCalendarValueChange(null);

      expect(component.calendarValue()).toBeNull();
      expect(component.value()).toBeNull();
      expect(component.touched()).toBe(false);
    });

    it('should set selected date, value, touched state, and hide popover', () => {
      const date = DateTime.fromObject({ year: 2024, month: 6, day: 15 });
      const hidePopover = vi.fn();
      vi.spyOn(component, 'popoverEl').mockReturnValue({
        nativeElement: { hidePopover } as unknown as HTMLElement,
      });

      component.onCalendarValueChange(date);

      expect(component.calendarValue()).toEqual(date);
      expect(component.value()).toEqual(date);
      expect(component.touched()).toBe(true);
      expect(hidePopover).toHaveBeenCalledOnce();
    });
  });

  describe('clearInput', () => {
    it('should clear date, value, touch state, and hide popover', () => {
      const hidePopover = vi.fn();
      component.calendarValue.set(DateTime.fromObject({ year: 2024, month: 6, day: 15 }));
      component.value.set(DateTime.fromObject({ year: 2024, month: 6, day: 15 }));
      vi.spyOn(component, 'popoverEl').mockReturnValue({
        nativeElement: { hidePopover } as unknown as HTMLElement,
      });

      component.clearInput();

      expect(component.calendarValue()).toBeNull();
      expect(component.value()).toBeNull();
      expect(component.touched()).toBe(true);
      expect(hidePopover).toHaveBeenCalledOnce();
    });

    it('should not throw when popover element is missing', () => {
      vi.spyOn(component, 'popoverEl').mockReturnValue(undefined);

      expect(() => component.clearInput()).not.toThrow();
    });
  });
});
