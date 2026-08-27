import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  ElementRef,
  HostListener,
  inject,
  input,
  model,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { DisabledReason, FormValueControl, ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';
import { IMultiSelectInputOption } from './data-access/multi-select-input.interface';
import { uniqueId } from '../../../utils';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'rng-multi-select-input',
  imports: [NgTemplateOutlet, ButtonComponent],
  templateUrl: './multi-select-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiSelectInputComponent implements FormValueControl<IMultiSelectInputOption[]> {
  /**
   * Form value control implementation
   */
  public value = model<IMultiSelectInputOption[]>([]);

  public touched = model<boolean>(false);
  public disabledReasons = input<readonly WithOptionalFieldTree<DisabledReason>[]>([]);
  public disabled = input<boolean>(false);
  public readonly = input<boolean>(false);
  public hidden = input<boolean>(false);
  public invalid = input<boolean>(false);
  public errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);
  public pending = input<boolean>(false);
  public dirty = input<boolean>(false);
  public required = input<boolean>(false);

  /**
   * Inputs
   */
  public data = input<IMultiSelectInputOption[]>([]);
  public label = input<string | null>(null);
  public placeholder = input<string>('');
  public hint = input<string | null>(null);
  public isFocused = signal<boolean>(false);
  public error = input<boolean>(false);
  public errorMessage = input<string | null>(null);
  public name = input<string>('');
  public searchable = input<boolean>(false);
  public rightAligned = input<boolean>(false);
  public dropdownWidth = input<number | null>(null);
  public maxChipsShown = input<number>(5);
  public allowSelectAll = input<boolean>(false);

  /**
   * Injections
   */
  private _elementRef = inject(ElementRef);

  /**
   * Local state
   */
  public isActive = signal<boolean>(false);
  public inputElementRef = viewChild('inputElement', { read: ElementRef });
  public listElementRef = viewChild('listElement', { read: ElementRef });
  public inputValue = signal<string>('');
  public id = signal<string>(uniqueId());
  public currentFocusedOptionIndex = signal<number>(-1);
  public isShowListOnTop = signal<boolean>(false);

  public buffer = '';
  public bufferTimeout: number | null = null;

  /**
   * Template
   */
  public optionTemplate = contentChild<TemplateRef<string>>('rngMultiSelectInputOptionTemplate');

  /**
   * Computed
   */
  public hintMessage = computed<string | null>(() => {
    if (this.error() && this.errorMessage()) {
      return this.errorMessage();
    } else if (this.hint()) {
      return this.hint();
    }

    return null;
  });

  public filteredData = computed<IMultiSelectInputOption[]>(() => {
    const inputValue = this.inputValue() || '';

    return this.data().filter((item) => item.label.toLowerCase().includes(inputValue.toLowerCase()));
  });

  public visibleChips = computed<IMultiSelectInputOption[]>(() => this.value().slice(0, this.maxChipsShown()));
  public remainingCount = computed<number>(() => Math.max(0, this.value().length - this.maxChipsShown()));

  /**
   * Check if the given item is currently selected
   *
   * @param item IMultiSelectInputOption
   * @returns boolean
   */
  public isSelected(item: IMultiSelectInputOption): boolean {
    return this.value().some((selected) => selected.value === item.value);
  }

  /**
   * Remove focus from the input
   *
   * @returns this
   */
  public removeFocus(): this {
    this.isFocused.set(false);

    return this;
  }

  /**
   * Show focus on the input
   *
   * @returns this
   */
  public showFocus(): this {
    this.isFocused.set(true);
    this.inputElementRef()?.nativeElement.focus();

    return this;
  }

  /**
   * Show options list
   *
   * @returns this
   */
  public showOptions(): this {
    this.isActive.set(true);
    setTimeout(() => {
      this._calculateListPosition();
    });

    return this;
  }

  /**
   * Hide options list
   *
   * @returns this
   */
  public hideOptions(): this {
    this.isActive.set(false);

    return this;
  }

  /**
   * Handle input focus event
   *
   * @returns void
   */
  public onInputFocusHandler(): void {
    this.showFocus().showOptions();
  }

  /**
   * Handle option select/deselect event — toggles the item in the selected values array
   *
   * @param item IMultiSelectInputOption
   * @returns void
   */
  public onSelectHandler(item: IMultiSelectInputOption): void {
    const currentValue = this.value();
    const existingIndex = currentValue.findIndex((selected) => selected.value === item.value);

    if (existingIndex >= 0) {
      this.value.set(currentValue.filter((_, index) => index !== existingIndex));
    } else {
      this.value.set([...currentValue, item]);
    }

    this.inputValue.set('');
    this.inputElementRef()?.nativeElement.focus();
  }

  /**
   * Handle chip remove button click
   *
   * @param item IMultiSelectInputOption
   * @param event MouseEvent
   * @returns void
   */
  public onRemoveChip(item: IMultiSelectInputOption, event: MouseEvent): void {
    event.stopPropagation();
    this.value.set(this.value().filter((selected) => selected.value !== item.value));
  }

  /**
   * Handle input event
   *
   * @param value string
   * @returns void
   */
  public onInput(value: string): void {
    this.inputValue.set(value);
  }

  /**
   * Listen for clicks on the document to detect clicks outside the component
   *
   * @param event MouseEvent
   * @returns void
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = this._elementRef.nativeElement.contains(event.target);

    if (!clickedInside) {
      this.removeFocus().hideOptions();
    }
  }

  /**
   * Listen for keydown events to handle keyboard navigation
   *
   * @param event KeyboardEvent
   * @returns void
   */
  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
        this._focusPreviousOption();
        break;
      case 'ArrowDown':
        this._focusNextOption();
        break;
      case 'Escape':
        this.hideOptions();
        break;
      default:
        this._watchForTypeahead(event);
        break;
    }
  }

  /**
   * Focus the next option in the list. If the last option is focused, wrap to the first.
   *
   * @returns void
   */
  private _focusNextOption(): void {
    if (this.currentFocusedOptionIndex() === -1) {
      this.currentFocusedOptionIndex.set(0);
    } else {
      this.currentFocusedOptionIndex.update((index) => {
        const nextIndex = index + 1;

        return nextIndex >= this.filteredData().length ? 0 : nextIndex;
      });
    }

    this._focusOptionAtCurrentIndex();
  }

  /**
   * Focus the previous option in the list. If the first option is focused, wrap to the last.
   *
   * @returns void
   */
  private _focusPreviousOption(): void {
    if (this.currentFocusedOptionIndex() === -1) {
      this.currentFocusedOptionIndex.set(this.filteredData().length - 1);
    } else {
      this.currentFocusedOptionIndex.update((index) => {
        const previousIndex = index - 1;

        return previousIndex < 0 ? this.filteredData().length - 1 : previousIndex;
      });
    }

    this._focusOptionAtCurrentIndex();
  }

  /**
   * Focus the option element at the current focused option index
   *
   * @returns void
   */
  private _focusOptionAtCurrentIndex(): void {
    const listElement = this.listElementRef()?.nativeElement as HTMLElement;
    const optionElements = listElement.querySelectorAll<HTMLElement>('li:not(.rng-input-list__item--select-all)');
    const currentIndex = this.currentFocusedOptionIndex();

    if (currentIndex === -1 || currentIndex >= optionElements.length) {
      return;
    }

    const currentOptionElement = optionElements[currentIndex] as HTMLElement;

    setTimeout(() => {
      currentOptionElement.focus({ preventScroll: true });
      currentOptionElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    });
  }

  /**
   * Calculate whether there is enough space below the input to show the options list.
   *
   * @returns void
   */
  private _calculateListPosition(): void {
    const inputElementRect = this.inputElementRef()?.nativeElement.getBoundingClientRect() || { bottom: 0 };
    const dropdownHeight = this.listElementRef()?.nativeElement.offsetHeight || 0;
    const spaceBelow = window.innerHeight - inputElementRect.bottom;

    this.isShowListOnTop.set(spaceBelow < dropdownHeight);
  }

  /**
   * Buffer keystrokes and focus the first matching option (typeahead)
   *
   * @param event KeyboardEvent
   * @returns void
   */
  private _watchForTypeahead(event: KeyboardEvent): void {
    if (this.searchable()) {
      return;
    }

    if (event.key.length > 1) {
      return;
    }

    this.buffer += event.key;

    if (this.bufferTimeout) {
      clearTimeout(this.bufferTimeout);
    }

    this.bufferTimeout = setTimeout(() => {
      this._focusWithBufferedValue(this.buffer);
      this.buffer = '';
    }, 300);
  }

  /**
   * Focus the first option that matches the buffered value
   *
   * @param value string
   * @returns void
   */
  private _focusWithBufferedValue(value: string): void {
    const matchingOptionIndex = this.filteredData().findIndex((option) =>
      option.label.toLowerCase().includes(value.toLowerCase()),
    );

    if (matchingOptionIndex === -1) {
      return;
    }

    this.currentFocusedOptionIndex.set(matchingOptionIndex);
    this._focusOptionAtCurrentIndex();
  }

  /**
   * Handle "Select All" button click - select all options in the list
   *
   * @returns void
   */
  public onSelectAllHandler(): void {
    this.value.set(this.data());

    this.inputValue.set('');
    this.inputElementRef()?.nativeElement.focus();
  }

  /**
   * Handle "Deselect All" button click - clear all selected options
   *
   * @returns void
   */
  public onDeselectAllHandler(): void {
    this.value.set([]);

    this.inputValue.set('');
    this.inputElementRef()?.nativeElement.focus();
  }
}
