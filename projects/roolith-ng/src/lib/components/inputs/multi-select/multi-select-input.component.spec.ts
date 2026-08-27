import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { IMultiSelectInputOption } from './data-access/multi-select-input.interface';
import { MultiSelectInputComponent } from './multi-select-input.component';

describe('MultiSelectInputComponent', () => {
  let component: MultiSelectInputComponent;
  let fixture: ComponentFixture<MultiSelectInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiSelectInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiSelectInputComponent);
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
      expect(component.value()).toEqual([]);
      expect(component.touched()).toBe(false);
      expect(component.disabled()).toBe(false);
      expect(component.readonly()).toBe(false);
      expect(component.required()).toBe(false);
    });

    it('should initialize multi-select state', () => {
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

      expect(component.filteredData()).toEqual([
        createMockOption('Active', 'active'),
        createMockOption('Inactive', 'inactive'),
      ]);
    });
  });

  describe('visibleChips', () => {
    it('should return selected values up to max chips shown', async () => {
      const selected = createMockOptions();
      fixture.componentRef.setInput('maxChipsShown', 2);
      component.value.set(selected);
      await fixture.whenStable();

      expect(component.visibleChips()).toEqual(selected.slice(0, 2));
    });
  });

  describe('remainingCount', () => {
    it('should return remaining selected item count', async () => {
      fixture.componentRef.setInput('maxChipsShown', 2);
      component.value.set(createMockOptions());
      await fixture.whenStable();

      expect(component.remainingCount()).toBe(1);
    });

    it('should return zero when selected count is less than max chips shown', () => {
      component.value.set([createMockOption('Active', 'active')]);

      expect(component.remainingCount()).toBe(0);
    });
  });

  describe('isSelected', () => {
    it('should return true when item is selected', () => {
      const item = createMockOption('Active', 'active');
      component.value.set([item]);

      expect(component.isSelected(item)).toBe(true);
    });

    it('should return false when item is not selected', () => {
      component.value.set([createMockOption('Active', 'active')]);

      expect(component.isSelected(createMockOption('Pending', 'pending'))).toBe(false);
    });
  });

  describe('focus and options methods', () => {
    it('should remove focus and return component', () => {
      component.isFocused.set(true);

      const result = component.removeFocus();

      expect(component.isFocused()).toBe(false);
      expect(result).toBe(component);
    });

    it('should show focus, focus input, and return component', () => {
      const focus = vi.fn();
      vi.spyOn(component as any, 'inputElementRef').mockReturnValue({ nativeElement: { focus } });

      const result = component.showFocus();

      expect(component.isFocused()).toBe(true);
      expect(focus).toHaveBeenCalledOnce();
      expect(result).toBe(component);
    });

    it('should show options, calculate list position, and return component', () => {
      vi.useFakeTimers();
      const calculateListPositionSpy = vi.spyOn(component as any, '_calculateListPosition');

      const result = component.showOptions();
      vi.runAllTimers();

      expect(component.isActive()).toBe(true);
      expect(calculateListPositionSpy).toHaveBeenCalledOnce();
      expect(result).toBe(component);
    });

    it('should hide options and return component', () => {
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
    it('should add item when not already selected', () => {
      const focus = vi.fn();
      const item = createMockOption('Active', 'active');
      vi.spyOn(component as any, 'inputElementRef').mockReturnValue({ nativeElement: { focus } });
      component.inputValue.set('act');

      component.onSelectHandler(item);

      expect(component.value()).toEqual([item]);
      expect(component.inputValue()).toBe('');
      expect(focus).toHaveBeenCalledOnce();
    });

    it('should remove item when already selected', () => {
      const focus = vi.fn();
      const item = createMockOption('Active', 'active');
      vi.spyOn(component as any, 'inputElementRef').mockReturnValue({ nativeElement: { focus } });
      component.value.set([item]);

      component.onSelectHandler(item);

      expect(component.value()).toEqual([]);
      expect(focus).toHaveBeenCalledOnce();
    });
  });

  describe('onRemoveChip', () => {
    it('should stop propagation and remove matching chip', () => {
      const event = { stopPropagation: vi.fn() } as unknown as MouseEvent;
      const selected = createMockOptions();
      component.value.set(selected);

      component.onRemoveChip(selected[0], event);

      expect(event.stopPropagation).toHaveBeenCalledOnce();
      expect(component.value()).toEqual(selected.slice(1));
    });
  });

  describe('onInput', () => {
    it('should set input value', () => {
      component.onInput('active');

      expect(component.inputValue()).toBe('active');
    });
  });

  describe('onDocumentClick', () => {
    it('should do nothing when click is inside component', () => {
      const removeFocusSpy = vi.spyOn(component, 'removeFocus');
      component['_elementRef'].nativeElement = { contains: vi.fn().mockReturnValue(true) };

      component.onDocumentClick({ target: {} } as MouseEvent);

      expect(removeFocusSpy).not.toHaveBeenCalled();
    });

    it('should remove focus and hide options when click is outside component', () => {
      const removeFocusSpy = vi.spyOn(component, 'removeFocus').mockReturnValue(component);
      const hideOptionsSpy = vi.spyOn(component, 'hideOptions').mockReturnValue(component);
      component['_elementRef'].nativeElement = { contains: vi.fn().mockReturnValue(false) };

      component.onDocumentClick({ target: {} } as MouseEvent);

      expect(removeFocusSpy).toHaveBeenCalledOnce();
      expect(hideOptionsSpy).toHaveBeenCalledOnce();
    });
  });

  describe('onKeydown', () => {
    it('should focus previous option on ArrowUp', () => {
      const focusPreviousOptionSpy = vi
        .spyOn(component as any, '_focusPreviousOption')
        .mockImplementation(() => undefined);

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

  describe('_focusNextOption', () => {
    it('should focus first option when no option is focused', async () => {
      const focusOptionAtCurrentIndexSpy = vi
        .spyOn(component as any, '_focusOptionAtCurrentIndex')
        .mockImplementation(() => undefined);
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
      vi.spyOn(component as any, 'listElementRef').mockReturnValue({
        nativeElement: createMockListElement(optionElements),
      });
      component.currentFocusedOptionIndex.set(1);

      component['_focusOptionAtCurrentIndex']();
      vi.runAllTimers();

      expect(optionElements[1].focus).toHaveBeenCalledWith({ preventScroll: true });
      expect(optionElements[1].scrollIntoView).toHaveBeenCalledWith({ block: 'nearest', behavior: 'smooth' });
    });

    it('should exclude select / deselect all option when focusing', () => {
      const optionElements = [createMockOptionElement()];
      const mockListElement = {
        querySelectorAll: vi.fn().mockReturnValue(optionElements),
      } as unknown as HTMLElement;
      vi.spyOn(component as any, 'listElementRef').mockReturnValue({ nativeElement: mockListElement });
      component.currentFocusedOptionIndex.set(0);

      component['_focusOptionAtCurrentIndex']();

      expect(mockListElement.querySelectorAll).toHaveBeenCalledWith('li:not(.rng-input-list__item--select-all)');
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

    it('should ignore non-character keys', () => {
      component['_watchForTypeahead']({ key: 'Shift' } as KeyboardEvent);

      expect(component.buffer).toBe('');
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
      const focusOptionAtCurrentIndexSpy = vi
        .spyOn(component as any, '_focusOptionAtCurrentIndex')
        .mockImplementation(() => undefined);
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

  describe('onSelectAllHandler', () => {
    it('should select all data, clear input, and focus input', async () => {
      const focus = vi.fn();
      const data = createMockOptions();
      fixture.componentRef.setInput('data', data);
      component.inputValue.set('act');
      vi.spyOn(component as any, 'inputElementRef').mockReturnValue({ nativeElement: { focus } });
      await fixture.whenStable();

      component.onSelectAllHandler();

      expect(component.value()).toEqual(data);
      expect(component.inputValue()).toBe('');
      expect(focus).toHaveBeenCalledOnce();
    });
  });

  describe('onDeselectAllHandler', () => {
    it('should clear selected data, clear input, and focus input', () => {
      const focus = vi.fn();
      component.value.set(createMockOptions());
      component.inputValue.set('act');
      vi.spyOn(component as any, 'inputElementRef').mockReturnValue({ nativeElement: { focus } });

      component.onDeselectAllHandler();

      expect(component.value()).toEqual([]);
      expect(component.inputValue()).toBe('');
      expect(focus).toHaveBeenCalledOnce();
    });
  });
});

/**
 * Creates mock multi-select options.
 *
 * @returns IMultiSelectInputOption[]
 */
function createMockOptions(): IMultiSelectInputOption[] {
  return [
    createMockOption('Active', 'active'),
    createMockOption('Inactive', 'inactive'),
    createMockOption('Pending', 'pending'),
  ];
}

/**
 * Creates a mock multi-select option.
 *
 * @param label string
 * @param value string | number | null
 * @returns IMultiSelectInputOption
 */
function createMockOption(label: string, value: string | number | null): IMultiSelectInputOption {
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
