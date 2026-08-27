import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { NumberInputComponent } from './number-input.component';

describe('NumberInputComponent', () => {
  let component: NumberInputComponent;
  let fixture: ComponentFixture<NumberInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NumberInputComponent);
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

    it('should initialize number input configuration', () => {
      expect(component.name()).toBe('');
      expect(component.label()).toBeNull();
      expect(component.placeholder()).toBeNull();
      expect(component.hint()).toBeNull();
      expect(component.min()).toBeUndefined();
      expect(component.max()).toBeUndefined();
      expect(component.step()).toBe(1);
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
      fixture.componentRef.setInput('name', 'depth');
      fixture.componentRef.setInput('label', 'Depth');
      fixture.componentRef.setInput('placeholder', 'Enter depth');
      fixture.componentRef.setInput('hint', 'Depth in meters');
      await fixture.whenStable();

      expect(component.name()).toBe('depth');
      expect(component.label()).toBe('Depth');
      expect(component.placeholder()).toBe('Enter depth');
      expect(component.hint()).toBe('Depth in meters');
    });

    it('should use numeric constraint input values', async () => {
      fixture.componentRef.setInput('min', 1);
      fixture.componentRef.setInput('max', 100);
      fixture.componentRef.setInput('step', 5);
      await fixture.whenStable();

      expect(component.min()).toBe(1);
      expect(component.max()).toBe(100);
      expect(component.step()).toBe(5);
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
      fixture.componentRef.setInput('errorMessage', 'Depth is required');
      fixture.componentRef.setInput('hint', 'Depth in meters');
      await fixture.whenStable();

      expect(component.hintMessage()).toBe('Depth is required');
    });

    it('should return hint when error message is not provided', async () => {
      fixture.componentRef.setInput('hint', 'Depth in meters');
      await fixture.whenStable();

      expect(component.hintMessage()).toBe('Depth in meters');
    });

    it('should return null when neither error message nor hint exists', () => {
      expect(component.hintMessage()).toBeNull();
    });

    it('should return hint when error is true but error message is missing', async () => {
      fixture.componentRef.setInput('error', true);
      fixture.componentRef.setInput('hint', 'Depth in meters');
      await fixture.whenStable();

      expect(component.hintMessage()).toBe('Depth in meters');
    });
  });

  describe('onInput', () => {
    it('should set numeric value from raw string', () => {
      component.onInput('42');

      expect(component.value()).toBe(42);
    });

    it('should set decimal numeric value from raw string', () => {
      component.onInput('42.5');

      expect(component.value()).toBe(42.5);
    });

    it('should set value to null when raw string is empty', () => {
      component.value.set(42);

      component.onInput('');

      expect(component.value()).toBeNull();
    });

    it('should set value to null when raw string is not numeric', () => {
      component.value.set(42);

      component.onInput('abc');

      expect(component.value()).toBeNull();
    });
  });

  describe('clearInput', () => {
    it('should reset value to null', () => {
      component.value.set(42);
      vi.spyOn(component, 'inputElement').mockReturnValue(undefined);

      component.clearInput();

      expect(component.value()).toBeNull();
    });

    it('should clear native input value when input element exists', () => {
      const inputElement = { value: '42' };
      component.value.set(42);
      vi.spyOn(component, 'inputElement').mockReturnValue({ nativeElement: inputElement as HTMLInputElement });

      component.clearInput();

      expect(inputElement.value).toBe('');
      expect(component.value()).toBeNull();
    });
  });
});
