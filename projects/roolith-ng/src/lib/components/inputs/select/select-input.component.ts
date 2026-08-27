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
import { ISelectInput } from './data-access/select-input.interface';
import { uniqueId } from '../../../utils';

@Component({
  selector: 'rng-select-input',
  imports: [NgTemplateOutlet],
  templateUrl: './select-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectInputComponent implements FormValueControl<ISelectInput | undefined> {
  /**
   * Form value control implementation
   */
  public value = model<ISelectInput | undefined>();

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
  public data = input<ISelectInput[]>([]);
  public label = input<string | null>(null);
  public placeholder = input<string>('');
  public hint = input<string | null>(null);
  public isFocused = signal<boolean>(false);
  public error = input<boolean>(false);
  public errorMessage = input<string | null>(null);
  public name = input<string>('');
  public searchable = input<boolean>(false);
  public showClear = input<boolean>(false);
  public rightAligned = input<boolean>(false);
  public dropdownWidth = input<number | null>(null);
  public dropdownMinWidth = input<number | null>(null);

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
  public optionTemplate = contentChild<TemplateRef<string>>('rngSelectInputOptionTemplate');

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

  public filteredData = computed<ISelectInput[]>(() => {
    const inputValue = this.inputValue() || '';

    return this.data().filter((item) => item.label.toLowerCase().includes(inputValue.toLowerCase()));
  });

  public isShowClearButton = computed(() => this.showClear() && !!this.value());

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
   * Handle options select event
   *
   * @param value ISelectInput
   * @return void
   */
  public onSelectHandler(value: ISelectInput): void {
    this.value.set(value);
    this.inputValue.set('');

    this.hideOptions();
  }

  /**
   * Handle input event
   *
   * @param value string
   * @return void
   */
  public onInput(value: string): void {
    this.inputValue.set(value);
  }

  /**
   * Handle input change event
   *
   * @param value string
   * @return void
   */
  public onChange(value: string): void {
    if (!value || (value && value.trim().length === 0)) {
      this.value.set(undefined);
      return;
    }

    const matchingOption = this.data().find((option) => option.label.toLowerCase() === value.toLowerCase());

    if (!matchingOption) {
      return;
    }

    this.value.set(matchingOption);
    this.hideOptions();
  }

  /**
   * Handle clear button click event
   *
   * @param event MouseEvent
   * @returns void
   */
  public onClear(event: MouseEvent): void {
    event.stopPropagation();
    this.value.set(undefined);
    this.inputValue.set('');
    this.showFocus().showOptions();
  }

  /**
   * Restore the previous value in the input if the user clicks outside the component without selecting an option
   * or if the input value does not match any option
   *
   * @returns void
   */
  private _restorePreviousValue(): void {
    if (!this.value()) {
      return;
    }

    const inputElement = this.inputElementRef()?.nativeElement as HTMLInputElement;

    if (inputElement.value === this.value()?.label) {
      return;
    }

    inputElement.value = this.value()?.label || '';
    this.inputValue.set('');
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

      this._restorePreviousValue();
    }
  }

  /**
   * Listen for keydown events to handle keyboard navigation
   *
   * @param event KeyboardEvent
   * @return void
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
   * Focus the next option in the list. If the last option is currently focused, focus the first option.
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
   * Focus the previous option in the list. If the first option is currently focused, focus the last option.
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
   * Focus the option at the current focused option index
   *
   * @returns void
   */
  private _focusOptionAtCurrentIndex(): void {
    const listElement = this.listElementRef()?.nativeElement as HTMLElement;
    const optionElements = listElement.querySelectorAll<HTMLElement>('li');
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
   * If there is not enough space, show the list above the input.
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
   * If user quickly types in the input, buffer the keystrokes and focus the first option that matches the buffered value
   *
   * @param event KeyboardEvent
   * @returns void
   */
  private _watchForTypeahead(event: KeyboardEvent): void {
    if (this.searchable()) {
      return;
    }

    if (event.key.length > 1) {
      event.preventDefault();
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
   * Focus the first option that matches the given value
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
}
