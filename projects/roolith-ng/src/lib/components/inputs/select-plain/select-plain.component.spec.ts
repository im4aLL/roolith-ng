import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { ISelectPlainOption } from './data-access/select-plain.interface';
import { SelectPlainComponent } from './select-plain.component';

describe('SelectPlainComponent', () => {
  let component: SelectPlainComponent;
  let fixture: ComponentFixture<SelectPlainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectPlainComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectPlainComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('default values', () => {
    it('should initialize form value state', () => {
      expect(component.value()).toBeUndefined();
      expect(component.touched()).toBe(false);
      expect(component.disabled()).toBe(false);
      expect(component.required()).toBe(false);
      expect(component.invalid()).toBe(false);
    });

    it('should initialize select configuration', () => {
      expect(component.name()).toBe('');
      expect(component.label()).toBeNull();
      expect(component.hint()).toBeNull();
      expect(component.data()).toEqual([]);
    });

    it('should initialize validation inputs', () => {
      expect(component.errors()).toEqual([]);
      expect(component.pending()).toBe(false);
      expect(component.dirty()).toBe(false);
    });
  });

  describe('inputs', () => {
    it('should use metadata input values', async () => {
      fixture.componentRef.setInput('name', 'status');
      fixture.componentRef.setInput('label', 'Status');
      fixture.componentRef.setInput('hint', 'Select status');
      await fixture.whenStable();

      expect(component.name()).toBe('status');
      expect(component.label()).toBe('Status');
      expect(component.hint()).toBe('Select status');
    });

    it('should use data input value', async () => {
      const options = [createMockOption('active', 'Active')];

      fixture.componentRef.setInput('data', options);
      await fixture.whenStable();

      expect(component.data()).toEqual(options);
    });

    it('should use id input value', async () => {
      fixture.componentRef.setInput('id', 'status-select');
      await fixture.whenStable();

      expect(component.id()).toBe('status-select');
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

  describe('onChangeHandler', () => {
    it('should set selected option when value matches string option value', async () => {
      const options = [createMockOption('active', 'Active'), createMockOption('inactive', 'Inactive')];
      fixture.componentRef.setInput('data', options);
      await fixture.whenStable();

      component.onChangeHandler(createSelectChangeEvent('inactive'));

      expect(component.value()).toEqual(options[1]);
    });

    it('should set selected option when value matches number option value', async () => {
      const options = [createMockOption(1, 'One'), createMockOption(2, 'Two')];
      fixture.componentRef.setInput('data', options);
      await fixture.whenStable();

      component.onChangeHandler(createSelectChangeEvent('2'));

      expect(component.value()).toEqual(options[1]);
    });

    it('should set value to undefined when no option matches selected value', async () => {
      const options = [createMockOption('active', 'Active')];
      fixture.componentRef.setInput('data', options);
      component.value.set(options[0]);
      await fixture.whenStable();

      component.onChangeHandler(createSelectChangeEvent('missing'));

      expect(component.value()).toBeUndefined();
    });
  });
});

/**
 * Creates a mock select option.
 *
 * @param value string | number
 * @param label string
 * @returns ISelectPlainOption
 */
function createMockOption(value: string | number, label: string): ISelectPlainOption {
  return { value, label };
}

/**
 * Creates a select change event.
 *
 * @param value string
 * @returns Event
 */
function createSelectChangeEvent(value: string): Event {
  return { target: { value } } as unknown as Event;
}
