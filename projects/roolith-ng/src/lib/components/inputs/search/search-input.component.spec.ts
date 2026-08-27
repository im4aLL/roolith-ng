import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SearchInputComponent } from './search-input.component';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initial state', () => {
    it('should have null value', () => {
      expect(component.value()).toBeNull();
    });

    it('should have false isShowClearButton', () => {
      expect(component.isShowClearButton()).toBe(false);
    });

    it('should have "Search" placeholder', () => {
      expect(component.placeholder()).toBe('Search');
    });

    it('should not be disabled', () => {
      expect(component.disabled()).toBe(false);
    });
  });

  describe('onInput', () => {
    /**
     * Builds a minimal synthetic input event with a given value.
     */
    function makeInputEvent(inputValue: string): Event {
      const event = new Event('input');
      Object.defineProperty(event, 'target', { value: { value: inputValue } });
      return event;
    }

    it('should update value signal with the input element value', () => {
      component.onInput(makeInputEvent('search term'));

      expect(component.value()).toBe('search term');
    });

    it('should set isShowClearButton to true when the input has a non-empty value', () => {
      component.onInput(makeInputEvent('hello'));

      expect(component.isShowClearButton()).toBe(true);
    });

    it('should set isShowClearButton to false when the input is empty', () => {
      component.isShowClearButton.set(true);

      component.onInput(makeInputEvent(''));

      expect(component.isShowClearButton()).toBe(false);
    });
  });

  describe('clearInput', () => {
    it('should set value to an empty string', () => {
      component.value.set('existing value');

      component.clearInput();

      expect(component.value()).toBe('');
    });

    it('should set isShowClearButton to false', () => {
      component.isShowClearButton.set(true);

      component.clearInput();

      expect(component.isShowClearButton()).toBe(false);
    });

    it('should reset the native input element value', () => {
      const inputElement = component.inputElement();
      if (inputElement) {
        inputElement.nativeElement.value = 'existing value';
      }

      component.clearInput();

      expect(component.inputElement()?.nativeElement.value).toBe('');
    });
  });

  describe('_resetInputValue', () => {
    it('should not throw when input element is not available', () => {
      (component as any).inputElement = signal(undefined);

      expect(() => component.clearInput()).not.toThrow();
    });
  });

  describe('focus', () => {
    it('should call focus on the native input element', () => {
      const inputElement = component.inputElement();
      const focusSpy = vi.spyOn(inputElement!.nativeElement, 'focus');

      component.focus();

      expect(focusSpy).toHaveBeenCalled();
    });

    it('should not throw when input element is not available', () => {
      (component as any).inputElement = signal(undefined);

      expect(() => component.focus()).not.toThrow();
    });
  });

  describe('debouncedChange', () => {
    it('should emit the value after the debounce period', async () => {
      vi.useFakeTimers();
      const emitted: (string | null)[] = [];
      component.debouncedChange.subscribe((value) => emitted.push(value));

      component.value.set('hello');
      await Promise.resolve();
      vi.advanceTimersByTime(250);
      await Promise.resolve();

      expect(emitted).toContain('hello');
    });

    it('should not emit before the debounce period elapses', async () => {
      vi.useFakeTimers();
      const emitted: (string | null)[] = [];
      component.debouncedChange.subscribe((value) => emitted.push(value));

      component.value.set('hello');
      await Promise.resolve();
      vi.advanceTimersByTime(100);

      expect(emitted).toHaveLength(0);
    });

    it('should not emit duplicate values consecutively', async () => {
      vi.useFakeTimers();
      const emitted: (string | null)[] = [];
      component.debouncedChange.subscribe((value) => emitted.push(value));

      component.value.set('hello');
      await Promise.resolve();
      vi.advanceTimersByTime(250);
      await Promise.resolve();

      component.value.set('hello');
      await Promise.resolve();
      vi.advanceTimersByTime(250);
      await Promise.resolve();

      expect(emitted).toHaveLength(1);
    });
  });

  describe('disabled input', () => {
    it('should reflect the disabled state', () => {
      fixture.componentRef.setInput('disabled', true);

      expect(component.disabled()).toBe(true);
    });
  });
});
