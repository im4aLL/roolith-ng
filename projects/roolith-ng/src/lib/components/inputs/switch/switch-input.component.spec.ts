import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { SwitchInputComponent } from './switch-input.component';

describe('SwitchInputComponent', () => {
  let component: SwitchInputComponent;
  let fixture: ComponentFixture<SwitchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchInputComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('default values', () => {
    it('should initialize form value state', () => {
      expect(component.value()).toBe(false);
      expect(component.touched()).toBe(false);
      expect(component.disabled()).toBe(false);
      expect(component.readonly()).toBe(false);
      expect(component.required()).toBe(false);
    });

    it('should initialize switch input configuration', () => {
      expect(component.name()).toBe('');
      expect(component.label()).toBeNull();
      expect(component.hint()).toBeNull();
      expect(component.error()).toBe(false);
      expect(component.errorMessage()).toBeNull();
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
      fixture.componentRef.setInput('name', 'isActive');
      fixture.componentRef.setInput('label', 'Active');
      fixture.componentRef.setInput('hint', 'Enable active state');
      await fixture.whenStable();

      expect(component.name()).toBe('isActive');
      expect(component.label()).toBe('Active');
      expect(component.hint()).toBe('Enable active state');
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
      fixture.componentRef.setInput('hint', 'Enable status');
      await fixture.whenStable();

      expect(component.hintMessage()).toBe('Status is required');
    });

    it('should return hint when error message is not provided', async () => {
      fixture.componentRef.setInput('hint', 'Enable status');
      await fixture.whenStable();

      expect(component.hintMessage()).toBe('Enable status');
    });

    it('should return null when neither error message nor hint exists', () => {
      expect(component.hintMessage()).toBeNull();
    });

    it('should return hint when error is true but error message is missing', async () => {
      fixture.componentRef.setInput('error', true);
      fixture.componentRef.setInput('hint', 'Enable status');
      await fixture.whenStable();

      expect(component.hintMessage()).toBe('Enable status');
    });
  });

  describe('onChange', () => {
    it('should set value to checked state', () => {
      component.onChange(true);

      expect(component.value()).toBe(true);
    });

    it('should set value to unchecked state', () => {
      component.value.set(true);

      component.onChange(false);

      expect(component.value()).toBe(false);
    });

    it('should emit checked state', () => {
      const emitSpy = vi.spyOn(component.checkedChange, 'emit');

      component.onChange(true);

      expect(emitSpy).toHaveBeenCalledWith(true);
    });

    it('should emit unchecked state', () => {
      const emitSpy = vi.spyOn(component.checkedChange, 'emit');

      component.onChange(false);

      expect(emitSpy).toHaveBeenCalledWith(false);
    });
  });
});
