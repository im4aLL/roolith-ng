import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateTime } from 'luxon';
import { describe, expect, it, vi } from 'vitest';
import { ISelectPlainOption } from '../select-plain/data-access/select-plain.interface';
import { TimePickerInputComponent } from './time-picker-input.component';

describe('TimePickerInputComponent', () => {
  let component: TimePickerInputComponent;
  let fixture: ComponentFixture<TimePickerInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimePickerInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TimePickerInputComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('hintMessage', () => {
    it('should return error message when error and error message are provided', async () => {
      fixture.componentRef.setInput('error', true);
      fixture.componentRef.setInput('errorMessage', 'Time is required');
      fixture.componentRef.setInput('hint', 'Select time');
      await fixture.whenStable();

      expect(component.hintMessage()).toBe('Time is required');
    });

    it('should return hint when error message is not provided', async () => {
      fixture.componentRef.setInput('hint', 'Select time');
      await fixture.whenStable();

      expect(component.hintMessage()).toBe('Select time');
    });

    it('should return null when neither error message nor hint exists', () => {
      expect(component.hintMessage()).toBeNull();
    });
  });

  describe('hours', () => {
    it('should include empty option and twelve hour options', () => {
      expect(component.hours()).toHaveLength(13);
      expect(component.hours()[0]).toEqual({ label: '', value: -1 });
      expect(component.hours()[1]).toEqual({ label: '01', value: 1 });
      expect(component.hours()[12]).toEqual({ label: '12', value: 12 });
    });
  });

  describe('minutes', () => {
    it('should include empty option and sixty minute options', () => {
      expect(component.minutes()).toHaveLength(61);
      expect(component.minutes()[0]).toEqual({ label: '', value: -1 });
      expect(component.minutes()[1]).toEqual({ label: '00', value: 0 });
      expect(component.minutes()[60]).toEqual({ label: '59', value: 59 });
    });
  });

  describe('hourFormats', () => {
    it('should include AM and PM options', () => {
      expect(component.hourFormats()).toEqual(['AM', 'PM']);
    });
  });

  describe('ngOnInit', () => {
    it('should set value from initial date time', () => {
      const setValueFromInitialDateTimeSpy = vi.spyOn(component as any, '_setValueFromInitialDateTime');

      component.ngOnInit();

      expect(setValueFromInitialDateTimeSpy).toHaveBeenCalledOnce();
    });
  });

  describe('onChangeHourFormat', () => {
    it('should set selected hour format', () => {
      component.onChangeHourFormat('PM');

      expect(component.selectedHourFormat()).toBe('PM');
    });
  });

  describe('onChangeHour', () => {
    it('should set selected hour', () => {
      const hour = createMockOption('03', 3);

      component.onChangeHour(hour);

      expect(component.selectedHour()).toEqual(hour);
    });

    it('should clear selected hour', () => {
      component.selectedHour.set(createMockOption('03', 3));

      component.onChangeHour(undefined);

      expect(component.selectedHour()).toBeUndefined();
    });
  });

  describe('onChangeMinute', () => {
    it('should set selected minute', () => {
      const minute = createMockOption('15', 15);

      component.onChangeMinute(minute);

      expect(component.selectedMinute()).toEqual(minute);
    });

    it('should clear selected minute', () => {
      component.selectedMinute.set(createMockOption('15', 15));

      component.onChangeMinute(undefined);

      expect(component.selectedMinute()).toBeUndefined();
    });
  });

  describe('onBlur', () => {
    it('should mark input as touched', () => {
      component.onBlur();

      expect(component.touched()).toBe(true);
    });
  });

  describe('_setValueFromInitialDateTime', () => {
    it('should not set selected values when initial date time is null', () => {
      component.value.set(null);

      component['_setValueFromInitialDateTime']();

      expect(component.selectedHour()).toBeUndefined();
      expect(component.selectedMinute()).toBeUndefined();
    });

    it('should set selected values from PM date time', () => {
      component.value.set(DateTime.fromObject({ hour: 15, minute: 5 }));

      component['_setValueFromInitialDateTime']();

      expect(component.selectedHourFormat()).toBe('PM');
      expect(component.selectedHour()).toEqual({ label: '03', value: 3 });
      expect(component.selectedMinute()).toEqual({ label: '05', value: 5 });
    });

    it('should set selected values from midnight date time', () => {
      component.value.set(DateTime.fromObject({ hour: 0, minute: 7 }));

      component['_setValueFromInitialDateTime']();

      expect(component.selectedHourFormat()).toBe('AM');
      expect(component.selectedHour()).toEqual({ label: '12', value: 12 });
      expect(component.selectedMinute()).toEqual({ label: '07', value: 7 });
    });
  });

  describe('_changeEffect', () => {
    it('should set value when hour, minute, and format are selected', async () => {
      component.selectedHour.set(createMockOption('03', 3));
      component.selectedMinute.set(createMockOption('15', 15));
      component.selectedHourFormat.set('PM');
      await fixture.whenStable();

      expect(component.value()?.hour).toBe(15);
      expect(component.value()?.minute).toBe(15);
    });

    it('should set midnight value for 12 AM', async () => {
      component.selectedHour.set(createMockOption('12', 12));
      component.selectedMinute.set(createMockOption('30', 30));
      component.selectedHourFormat.set('AM');
      await fixture.whenStable();

      expect(component.value()?.hour).toBe(0);
      expect(component.value()?.minute).toBe(30);
    });

    it('should set value to null when a time part is missing', async () => {
      component.selectedHour.set(createMockOption('03', 3));
      component.selectedMinute.set(undefined);
      component.selectedHourFormat.set('PM');
      await fixture.whenStable();

      expect(component.value()).toBeNull();
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
