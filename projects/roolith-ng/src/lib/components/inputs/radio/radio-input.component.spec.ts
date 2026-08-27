import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { IRadioOption } from './data-access/radio-input.interface';
import { RadioInputComponent } from './radio-input.component';

describe('RadioInputComponent', () => {
  let component: RadioInputComponent;
  let fixture: ComponentFixture<RadioInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioInputComponent);
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

    it('should initialize radio input configuration', () => {
      expect(component.options()).toEqual([]);
      expect(component.name()).toBe('');
      expect(component.label()).toBeNull();
      expect(component.hint()).toBeNull();
      expect(component.inline()).toBe(false);
    });

    it('should initialize validation inputs', () => {
      expect(component.invalid()).toBe(false);
      expect(component.errors()).toEqual([]);
      expect(component.pending()).toBe(false);
      expect(component.dirty()).toBe(false);
    });
  });

  describe('inputs', () => {
    it('should use options input value', async () => {
      const options = createMockOptions();

      fixture.componentRef.setInput('options', options);
      await fixture.whenStable();

      expect(component.options()).toEqual(options);
    });

    it('should use metadata input values', async () => {
      fixture.componentRef.setInput('name', 'status');
      fixture.componentRef.setInput('label', 'Status');
      fixture.componentRef.setInput('hint', 'Select status');
      fixture.componentRef.setInput('inline', true);
      await fixture.whenStable();

      expect(component.name()).toBe('status');
      expect(component.label()).toBe('Status');
      expect(component.hint()).toBe('Select status');
      expect(component.inline()).toBe(true);
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

  describe('hintMessage', () => {
    it('should return error message when error and error message are provided', async () => {
      fixture.componentRef.setInput('error', true);
      fixture.componentRef.setInput('errorMessage', 'Status is required');
      fixture.componentRef.setInput('hint', 'Select status');
      await fixture.whenStable();

      expect(component.hintMessage()).toBe('Status is required');
    });

    it('should return hint when error message is not provided', async () => {
      fixture.componentRef.setInput('hint', 'Select status');
      await fixture.whenStable();

      expect(component.hintMessage()).toBe('Select status');
    });

    it('should return null when neither error message nor hint exists', () => {
      expect(component.hintMessage()).toBeNull();
    });

    it('should return hint when error is true but error message is missing', async () => {
      fixture.componentRef.setInput('error', true);
      fixture.componentRef.setInput('hint', 'Select status');
      await fixture.whenStable();

      expect(component.hintMessage()).toBe('Select status');
    });
  });

  describe('onChange', () => {
    it('should set matched string option value', async () => {
      const options = createMockOptions();
      fixture.componentRef.setInput('options', options);
      await fixture.whenStable();

      component.onChange(createRadioChangeEvent('inactive'));

      expect(component.value()).toBe('inactive');
    });

    it('should set matched number option value', async () => {
      const options = [createMockOption('One', 1), createMockOption('Two', 2)];
      fixture.componentRef.setInput('options', options);
      await fixture.whenStable();

      component.onChange(createRadioChangeEvent('2'));

      expect(component.value()).toBe(2);
    });

    it('should set value to null when option does not match', async () => {
      component.value.set('active');
      fixture.componentRef.setInput('options', createMockOptions());
      await fixture.whenStable();

      component.onChange(createRadioChangeEvent('missing'));

      expect(component.value()).toBeNull();
    });
  });
});

/**
 * Creates mock radio options.
 *
 * @returns IRadioOption[]
 */
function createMockOptions(): IRadioOption[] {
  return [createMockOption('Active', 'active'), createMockOption('Inactive', 'inactive')];
}

/**
 * Creates a mock radio option.
 *
 * @param label string
 * @param value string | number
 * @returns IRadioOption
 */
function createMockOption(label: string, value: string | number): IRadioOption {
  return { label, value };
}

/**
 * Creates a radio change event.
 *
 * @param value string
 * @returns Event
 */
function createRadioChangeEvent(value: string): Event {
  return { target: { value } } as unknown as Event;
}
