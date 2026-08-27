import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ISelectInput } from './data-access/select-input.interface';
import { SelectInputComponent } from './select-input.component';

describe('SelectInputComponent', () => {
  let component: SelectInputComponent;
  let fixture: ComponentFixture<SelectInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectInputComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('default values', () => {
    it('should initialize form value state', () => {
      expect(component.value()).toBeUndefined();
      expect(component.touched()).toBe(false);
      expect(component.disabled()).toBe(false);
      expect(component.readonly()).toBe(false);
      expect(component.required()).toBe(false);
    });

    it('should initialize select state', () => {
      expect(component.data()).toEqual([]);
      expect(component.inputValue()).toBe('');
      expect(component.isFocused()).toBe(false);
      expect(component.isActive()).toBe(false);
      expect(component.currentFocusedOptionIndex()).toBe(-1);
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
  });

  describe('filteredData', () => {
    it('should return all data when input value is empty', async () => {
      const data = createMockOptions();
      fixture.componentRef.setInput('data', data);
      await fixture.whenStable();

      expect(component.filteredData()).toEqual(data);
    });

    it('should filter data by input value case-insensitively', async () => {
      fixture.componentRef.setInput('data', createMockOptions());
      component.inputValue.set('act');
      await fixture.whenStable();

      expect(component.filteredData()).toEqual([createMockOption('Active', 'active'), createMockOption('Inactive', 'inactive')]);
    });
  });

  describe('isShowClearButton', () => {
    it('should return false when show clear is false', () => {
      component.value.set(createMockOption('Active', 'active'));

      expect(component.isShowClearButton()).toBe(false);
    });

    it('should return true when show clear is true and value exists', async () => {
      fixture.componentRef.setInput('showClear', true);
      component.value.set(createMockOption('Active', 'active'));
      await fixture.whenStable();

      expect(component.isShowClearButton()).toBe(true);
    });
  });

  describe('removeFocus', () => {
    it('should remove focused state and return component', () => {
      component.isFocused.set(true);

      const result = component.removeFocus();

      expect(component.isFocused()).toBe(false);
      expect(result).toBe(component);
    });
  });

  describe('showFocus', () => {
    it('should set focused state, focus input, and return component', () => {
      const focus = vi.fn();
      vi.spyOn(component as any, 'inputElementRef').mockReturnValue({ nativeElement: { focus } });

      const result = component.showFocus();

      expect(component.isFocused()).toBe(true);
      expect(focus).toHaveBeenCalledOnce();
      expect(result).toBe(component);
    });
  });

  describe('showOptions', () => {
    it('should set active state, calculate list position, and return component', () => {
      vi.useFakeTimers();
      const calculateListPositionSpy = vi.spyOn(component as any, '_calculateListPosition');

      const result = component.showOptions();
      vi.runAllTimers();

      expect(component.isActive()).toBe(true);
      expect(calculateListPositionSpy).toHaveBeenCalledOnce();
      expect(result).toBe(component);
    });
  });

  describe('hideOptions', () => {
    it('should set active state to false and return component', () => {
      component.isActive.set(true);

      const result = component.hideOptions();

      expect(component.isActive()).toBe(false);
      expect(result).toBe(component);
    });
  });

  describe('onInputFocusHandler', () => {
    it('should show focus and options', () => {
      const showFocusSpy = vi.spyOn(component, 'showFocus').mockReturnValue(component);
      const showOptionsSpy = vi.spyOn(component, 'showOptions').mockReturnValue(component);

      component.onInputFocusHandler();

      expect(showFocusSpy).toHaveBeenCalledOnce();
      expect(showOptionsSpy).toHaveBeenCalledOnce();
    });
  });

  describe('onSelectHandler', () => {
    it('should set value, clear input value, and hide options', () => {
      const option = createMockOption('Active', 'active');
      const hideOptionsSpy = vi.spyOn(component, 'hideOptions');
      component.inputValue.set('act');

      component.onSelectHandler(option);

      expect(component.value()).toEqual(option);
      expect(component.inputValue()).toBe('');
      expect(hideOptionsSpy).toHaveBeenCalledOnce();
    });
  });

  describe('onInput', () => {
    it('should set input value', () => {
      component.onInput('active');

      expect(component.inputValue()).toBe('active');
    });
  });

  describe('onChange', () => {
    it('should clear value when input value is empty', () => {
      component.value.set(createMockOption('Active', 'active'));

      component.onChange('');

      expect(component.value()).toBeUndefined();
    });

    it('should clear value when input value is blank', () => {
      component.value.set(createMockOption('Active', 'active'));

      component.onChange('   ');

      expect(component.value()).toBeUndefined();
    });

    it('should set matching option and hide options', async () => {
      const data = createMockOptions();
      const hideOptionsSpy = vi.spyOn(component, 'hideOptions');
      fixture.componentRef.setInput('data', data);
      await fixture.whenStable();

      component.onChange('ACTIVE');

      expect(component.value()).toEqual(data[0]);
      expect(hideOptionsSpy).toHaveBeenCalledOnce();
    });

    it('should keep current value when no option matches', async () => {
      const currentValue = createMockOption('Pending', 'pending');
      component.value.set(currentValue);
      fixture.componentRef.setInput('data', createMockOptions());
      await fixture.whenStable();

      component.onChange('missing');

      expect(component.value()).toEqual(currentValue);
    });
  });

  describe('onClear', () => {
    it('should stop propagation, clear value, clear input, focus input, and show options', () => {
      const event = { stopPropagation: vi.fn() } as unknown as MouseEvent;
      const showFocusSpy = vi.spyOn(component, 'showFocus').mockReturnValue(component);
      const showOptionsSpy = vi.spyOn(component, 'showOptions').mockReturnValue(component);
      component.value.set(createMockOption('Active', 'active'));
      component.inputValue.set('active');

      component.onClear(event);

      expect(event.stopPropagation).toHaveBeenCalledOnce();
      expect(component.value()).toBeUndefined();
      expect(component.inputValue()).toBe('');
      expect(showFocusSpy).toHaveBeenCalledOnce();
      expect(showOptionsSpy).toHaveBeenCalledOnce();
    });
  });

  describe('onDocumentClick', () => {
    it('should do nothing when click is inside component', () => {
      const removeFocusSpy = vi.spyOn(component, 'removeFocus');
      component['_elementRef'].nativeElement = { contains: vi.fn().mockReturnValue(true) };

      component.onDocumentClick({ target: {} } as MouseEvent);

      expect(removeFocusSpy).not.toHaveBeenCalled();
    });

    it('should remove focus, hide options, and restore previous value when click is outside component', () => {
      const removeFocusSpy = vi.spyOn(component, 'removeFocus').mockReturnValue(component);
      const hideOptionsSpy = vi.spyOn(component, 'hideOptions').mockReturnValue(component);
      const restorePreviousValueSpy = vi.spyOn(component as any, '_restorePreviousValue');
      component['_elementRef'].nativeElement = { contains: vi.fn().mockReturnValue(false) };

      component.onDocumentClick({ target: {} } as MouseEvent);

      expect(removeFocusSpy).toHaveBeenCalledOnce();
      expect(hideOptionsSpy).toHaveBeenCalledOnce();
      expect(restorePreviousValueSpy).toHaveBeenCalledOnce();
    });
  });

  describe('onKeydown', () => {
    it('should focus previous option on ArrowUp', () => {
      const focusPreviousOptionSpy = vi.spyOn(component as any, '_focusPreviousOption').mockImplementation(() => undefined);

      component.onKeydown({ key: 'ArrowUp' } as KeyboardEvent);

      expect(focusPreviousOptionSpy).toHaveBeenCalledOnce();
    });

    it('should focus next option on ArrowDown', () => {
      const focusNextOptionSpy = vi.spyOn(component as any, '_focusNextOption').mockImplementation(() => undefined);

      component.onKeydown({ key: 'ArrowDown' } as KeyboardEvent);

      expect(focusNextOptionSpy).toHaveBeenCalledOnce();
    });

    it('should hide options on Escape', () => {
      const hideOptionsSpy = vi.spyOn(component, 'hideOptions');

      component.onKeydown({ key: 'Escape' } as KeyboardEvent);

      expect(hideOptionsSpy).toHaveBeenCalledOnce();
    });

    it('should watch for typeahead for other keys', () => {
      const watchForTypeaheadSpy = vi.spyOn(component as any, '_watchForTypeahead');
      const event = { key: 'a' } as KeyboardEvent;

      component.onKeydown(event);

      expect(watchForTypeaheadSpy).toHaveBeenCalledWith(event);
    });
  });

  describe('_restorePreviousValue', () => {
    it('should do nothing when value does not exist', () => {
      const inputElement = { value: 'Changed' };
      vi.spyOn(component as any, 'inputElementRef').mockReturnValue({ nativeElement: inputElement });

      component['_restorePreviousValue']();

      expect(inputElement.value).toBe('Changed');
    });

    it('should restore input element value from selected value', () => {
      const inputElement = { value: 'Changed' };
      component.value.set(createMockOption('Active', 'active'));
      component.inputValue.set('Changed');
      vi.spyOn(component as any, 'inputElementRef').mockReturnValue({ nativeElement: inputElement });

      component['_restorePreviousValue']();

      expect(inputElement.value).toBe('Active');
      expect(component.inputValue()).toBe('');
    });

    it('should not restore when input already matches selected value', () => {
      const inputElement = { value: 'Active' };
      component.value.set(createMockOption('Active', 'active'));
      component.inputValue.set('Active');
      vi.spyOn(component as any, 'inputElementRef').mockReturnValue({ nativeElement: inputElement });

      component['_restorePreviousValue']();

      expect(component.inputValue()).toBe('Active');
    });
  });

  describe('_focusNextOption', () => {
    it('should focus first option when no option is focused', async () => {
      const focusOptionAtCurrentIndexSpy = vi.spyOn(component as any, '_focusOptionAtCurrentIndex').mockImplementation(() => undefined);
      fixture.componentRef.setInput('data', createMockOptions());
      await fixture.whenStable();

      component['_focusNextOption']();

      expect(component.currentFocusedOptionIndex()).toBe(0);
      expect(focusOptionAtCurrentIndexSpy).toHaveBeenCalledOnce();
    });

    it('should wrap to first option after last option', async () => {
      fixture.componentRef.setInput('data', createMockOptions());
      component.currentFocusedOptionIndex.set(2);
      await fixture.whenStable();
      vi.spyOn(component as any, '_focusOptionAtCurrentIndex').mockImplementation(() => undefined);

      component['_focusNextOption']();

      expect(component.currentFocusedOptionIndex()).toBe(0);
    });
  });

  describe('_focusPreviousOption', () => {
    it('should focus last option when no option is focused', async () => {
      fixture.componentRef.setInput('data', createMockOptions());
      await fixture.whenStable();
      vi.spyOn(component as any, '_focusOptionAtCurrentIndex').mockImplementation(() => undefined);

      component['_focusPreviousOption']();

      expect(component.currentFocusedOptionIndex()).toBe(2);
    });

    it('should wrap to last option from first option', async () => {
      fixture.componentRef.setInput('data', createMockOptions());
      component.currentFocusedOptionIndex.set(0);
      await fixture.whenStable();
      vi.spyOn(component as any, '_focusOptionAtCurrentIndex').mockImplementation(() => undefined);

      component['_focusPreviousOption']();

      expect(component.currentFocusedOptionIndex()).toBe(2);
    });
  });

  describe('_focusOptionAtCurrentIndex', () => {
    it('should not throw when current index is invalid', () => {
      vi.spyOn(component as any, 'listElementRef').mockReturnValue({ nativeElement: createMockListElement() });
      component.currentFocusedOptionIndex.set(-1);

      expect(() => component['_focusOptionAtCurrentIndex']()).not.toThrow();
    });

    it('should focus and scroll option at current index', () => {
      vi.useFakeTimers();
      const optionElements = [createMockOptionElement(), createMockOptionElement()];
      vi.spyOn(component as any, 'listElementRef').mockReturnValue({ nativeElement: createMockListElement(optionElements) });
      component.currentFocusedOptionIndex.set(1);

      component['_focusOptionAtCurrentIndex']();
      vi.runAllTimers();

      expect(optionElements[1].focus).toHaveBeenCalledWith({ preventScroll: true });
      expect(optionElements[1].scrollIntoView).toHaveBeenCalledWith({ block: 'nearest', behavior: 'smooth' });
    });
  });

  describe('_calculateListPosition', () => {
    it('should show list on top when space below is less than dropdown height', () => {
      vi.spyOn(component as any, 'inputElementRef').mockReturnValue({
        nativeElement: { getBoundingClientRect: vi.fn().mockReturnValue({ bottom: window.innerHeight - 50 }) },
      });
      vi.spyOn(component as any, 'listElementRef').mockReturnValue({ nativeElement: { offsetHeight: 100 } });

      component['_calculateListPosition']();

      expect(component.isShowListOnTop()).toBe(true);
    });

    it('should not show list on top when enough space exists below input', () => {
      vi.spyOn(component as any, 'inputElementRef').mockReturnValue({
        nativeElement: { getBoundingClientRect: vi.fn().mockReturnValue({ bottom: 50 }) },
      });
      vi.spyOn(component as any, 'listElementRef').mockReturnValue({ nativeElement: { offsetHeight: 100 } });

      component['_calculateListPosition']();

      expect(component.isShowListOnTop()).toBe(false);
    });
  });

  describe('_watchForTypeahead', () => {
    it('should return early when searchable is true', async () => {
      const focusWithBufferedValueSpy = vi.spyOn(component as any, '_focusWithBufferedValue');
      fixture.componentRef.setInput('searchable', true);
      await fixture.whenStable();

      component['_watchForTypeahead']({ key: 'a' } as KeyboardEvent);

      expect(component.buffer).toBe('');
      expect(focusWithBufferedValueSpy).not.toHaveBeenCalled();
    });

    it('should prevent default for non-character keys', () => {
      const preventDefault = vi.fn();

      component['_watchForTypeahead']({ key: 'Shift', preventDefault } as unknown as KeyboardEvent);

      expect(preventDefault).toHaveBeenCalledOnce();
    });

    it('should focus with buffered value after debounce', () => {
      vi.useFakeTimers();
      const focusWithBufferedValueSpy = vi.spyOn(component as any, '_focusWithBufferedValue');

      component['_watchForTypeahead']({ key: 'a' } as KeyboardEvent);
      vi.advanceTimersByTime(300);

      expect(focusWithBufferedValueSpy).toHaveBeenCalledWith('a');
      expect(component.buffer).toBe('');
    });
  });

  describe('_focusWithBufferedValue', () => {
    it('should set focused index for first matching option', async () => {
      const focusOptionAtCurrentIndexSpy = vi.spyOn(component as any, '_focusOptionAtCurrentIndex').mockImplementation(() => undefined);
      fixture.componentRef.setInput('data', createMockOptions());
      await fixture.whenStable();

      component['_focusWithBufferedValue']('pend');

      expect(component.currentFocusedOptionIndex()).toBe(2);
      expect(focusOptionAtCurrentIndexSpy).toHaveBeenCalledOnce();
    });

    it('should keep current focused index when no option matches', async () => {
      fixture.componentRef.setInput('data', createMockOptions());
      component.currentFocusedOptionIndex.set(1);
      await fixture.whenStable();

      component['_focusWithBufferedValue']('missing');

      expect(component.currentFocusedOptionIndex()).toBe(1);
    });
  });
});

/**
 * Creates mock select options.
 *
 * @returns ISelectInput[]
 */
function createMockOptions(): ISelectInput[] {
  return [
    createMockOption('Active', 'active'),
    createMockOption('Inactive', 'inactive'),
    createMockOption('Pending', 'pending'),
  ];
}

/**
 * Creates a mock select option.
 *
 * @param label string
 * @param value string | number | null
 * @returns ISelectInput
 */
function createMockOption(label: string, value: string | number | null): ISelectInput {
  return { label, value };
}

/**
 * Creates a mock list element.
 *
 * @param optionElements HTMLElement[]
 * @returns HTMLElement
 */
function createMockListElement(optionElements: HTMLElement[] = []): HTMLElement {
  return {
    querySelectorAll: vi.fn().mockReturnValue(optionElements),
  } as unknown as HTMLElement;
}

/**
 * Creates a mock option element.
 *
 * @returns HTMLElement
 */
function createMockOptionElement(): HTMLElement {
  return {
    focus: vi.fn(),
    scrollIntoView: vi.fn(),
  } as unknown as HTMLElement;
}
