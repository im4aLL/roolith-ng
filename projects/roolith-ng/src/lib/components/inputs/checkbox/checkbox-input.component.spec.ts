import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { CheckboxInputComponent } from './checkbox-input.component';

describe('CheckboxInputComponent', () => {
  let component: CheckboxInputComponent;
  let fixture: ComponentFixture<CheckboxInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxInputComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('default values', () => {
    it('should initialize checkbox control state', () => {
      expect(component.checked()).toBe(false);
      expect(component.touched()).toBe(false);
      expect(component.disabled()).toBe(false);
      expect(component.readonly()).toBe(false);
      expect(component.required()).toBe(false);
    });

    it('should initialize validation inputs', () => {
      expect(component.invalid()).toBe(false);
      expect(component.errors()).toEqual([]);
      expect(component.pending()).toBe(false);
      expect(component.dirty()).toBe(false);
    });

    it('should initialize checkbox input configuration', () => {
      expect(component.name()).toBe('');
      expect(component.error()).toBe(false);
      expect(component.standalone()).toBe(false);
      expect(component.indeterminate()).toBe(false);
    });
  });

  describe('inputs', () => {
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

    it('should use checkbox configuration input values', async () => {
      fixture.componentRef.setInput('name', 'acceptTerms');
      fixture.componentRef.setInput('error', true);
      fixture.componentRef.setInput('standalone', true);
      await fixture.whenStable();

      expect(component.name()).toBe('acceptTerms');
      expect(component.error()).toBe(true);
      expect(component.standalone()).toBe(true);
    });
  });

  describe('_checkedEffect', () => {
    it('should set indeterminate to false when checked is true', async () => {
      component.indeterminate.set(true);

      component.checked.set(true);
      await fixture.whenStable();

      expect(component.indeterminate()).toBe(false);
    });

    it('should keep indeterminate state when checked is false', async () => {
      component.indeterminate.set(true);

      component.checked.set(false);
      await fixture.whenStable();

      expect(component.indeterminate()).toBe(true);
    });
  });

  describe('onChange', () => {
    it('should set checked state to true', () => {
      component.onChange(createCheckboxChangeEvent(true));

      expect(component.checked()).toBe(true);
    });

    it('should set checked state to false', () => {
      component.checked.set(true);

      component.onChange(createCheckboxChangeEvent(false));

      expect(component.checked()).toBe(false);
    });

    it('should emit checked state', () => {
      component.onChange(createCheckboxChangeEvent(true));

      expect(component.checked()).toBe(true);
    });

    it('should emit unchecked state', () => {
      component.onChange(createCheckboxChangeEvent(false));

      expect(component.checked()).toBe(false);
    });
  });
});

/**
 * Creates a checkbox change event.
 *
 * @param isChecked boolean
 * @returns Event
 */
function createCheckboxChangeEvent(isChecked: boolean): Event {
  return { target: { checked: isChecked } } as unknown as Event;
}
