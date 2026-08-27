import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';

/** Default max character length for editable table cells. */
export const DEFAULT_MAX_CELL_EDIT_LENGTH = 50;

/**
 * Optional constraints for table editable cells.
 * Defaults to unrestricted character types with a max length of 50.
 * Opt into alphanumeric filtering and/or override max length as needed.
 */
@Directive({
  selector: '[rngTableCellEdit]',
})
export class TableCellEditDirective {
  /**
   * When true, restrict cell input to alphanumeric characters and spaces only.
   */
  public restrictCellEditToAlphanumeric = input(false);

  /**
   * Max cell input length. Defaults to 50 when not provided.
   */
  public maxCellEditLength = input(DEFAULT_MAX_CELL_EDIT_LENGTH);

  private _element = inject(ElementRef);

  /**
   * Apply optional key restrictions for alphanumeric filtering and max length.
   *
   * @param event The keyboard event triggered on keydown
   * @returns void
   */
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.ctrlKey || event.metaKey || event.altKey || event.key.length !== 1) {
      return;
    }

    if (this._shouldBlockAlphanumericKey(event.key)) {
      event.preventDefault();
      return;
    }

    if (this._shouldBlockMaxLengthKey()) {
      event.preventDefault();
    }
  }

  /**
   * Paste clipboard content as plain text, respecting cell constraints.
   *
   * @param event The clipboard paste event
   * @returns void
   */
  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();

    const pastedText = event.clipboardData?.getData('text/plain') ?? '';
    const textToInsert = this._preparePasteText(pastedText);

    if (!textToInsert) {
      return;
    }

    this._insertPlainText(textToInsert);
  }

  /**
   * Sanitize cell content for optional alphanumeric filtering and max length.
   *
   * @returns void
   */
  @HostListener('input')
  onInput(): void {
    const element = this._element.nativeElement as HTMLElement;
    const original = this._getCellText();
    const sanitized = this._sanitizeCellText(original);

    if (sanitized === '') {
      this._clearEmptyCell(element);
      return;
    }

    if (original === sanitized) {
      return;
    }

    element.innerText = sanitized;
    this._moveCursorToEnd(element);
  }

  /**
   * Whether the typed character should be blocked by the alphanumeric filter.
   *
   * @param key The key pressed
   * @returns boolean
   */
  private _shouldBlockAlphanumericKey(key: string): boolean {
    if (!this.restrictCellEditToAlphanumeric()) {
      return false;
    }

    return !/^[a-zA-Z0-9 ]$/.test(key);
  }

  /**
   * Whether a printable key should be blocked because the cell is at max length.
   *
   * @returns boolean
   */
  private _shouldBlockMaxLengthKey(): boolean {
    if (this._hasTextSelection()) {
      return false;
    }

    const currentLength = this._getCellText().length;

    return currentLength >= this.maxCellEditLength();
  }

  /**
   * Prepare pasted text for insertion under current cell constraints.
   *
   * @param pastedText Raw plain text from the clipboard
   * @returns string
   */
  private _preparePasteText(pastedText: string): string {
    let text = pastedText ?? '';

    if (this.restrictCellEditToAlphanumeric()) {
      text = text.replace(/[^a-zA-Z0-9 ]/g, '');
    }

    const availableLength = this._getAvailablePasteLength();

    if (availableLength <= 0) {
      return '';
    }

    return text.slice(0, availableLength);
  }

  /**
   * Remaining character capacity for a paste, accounting for selected text.
   *
   * @returns number
   */
  private _getAvailablePasteLength(): number {
    const selectedLength = this._getSelectedTextLength();
    const currentLength = this._getCellText().length;

    return this.maxCellEditLength() - (currentLength - selectedLength);
  }

  /**
   * Length of the current text selection inside this cell.
   *
   * @returns number
   */
  private _getSelectedTextLength(): number {
    if (!this._hasTextSelection()) {
      return 0;
    }

    return window.getSelection()?.toString().length ?? 0;
  }

  /**
   * Insert plain text at the current selection.
   *
   * @param text The plain text to insert
   * @returns void
   */
  private _insertPlainText(text: string): void {
    const canUseExecCommand = typeof document.execCommand === 'function';

    if (canUseExecCommand && document.execCommand('insertText', false, text)) {
      return;
    }

    this._insertPlainTextFallback(text);
  }

  /**
   * Fallback plain-text insert when execCommand is unavailable.
   *
   * @param text The plain text to insert
   * @returns void
   */
  private _insertPlainTextFallback(text: string): void {
    const selection = window.getSelection();
    const element = this._element.nativeElement as HTMLElement;

    if (!selection || selection.rangeCount === 0) {
      element.innerText = this._sanitizeCellText(`${this._getCellText()}${text}`);
      this._moveCursorToEnd(element);
      return;
    }

    const range = selection.getRangeAt(0);
    range.deleteContents();
    const textNode = document.createTextNode(text);
    range.insertNode(textNode);
    range.setStartAfter(textNode);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }

  /**
   * Apply configured sanitization rules to the cell text.
   *
   * @param value The current cell text
   * @returns string
   */
  private _sanitizeCellText(value: string): string {
    let result = value ?? '';

    if (this.restrictCellEditToAlphanumeric()) {
      result = result.replace(/[^a-zA-Z0-9 ]/g, '');
    }

    const maxLength = this.maxCellEditLength();

    if (result.length > maxLength) {
      result = result.slice(0, maxLength);
    }

    return result;
  }

  /**
   * Read the current cell text safely across environments.
   * Contenteditable empty state often leaves a lone newline from a residual <br>.
   *
   * @returns string
   */
  private _getCellText(): string {
    const element = this._element.nativeElement as HTMLElement;
    const text = element.innerText ?? element.textContent ?? '';

    if (this._isBlankEditableText(text)) {
      return '';
    }

    return text;
  }

  /**
   * Whether text is only contenteditable empty-state artifacts.
   *
   * @param text The text to inspect
   * @returns boolean
   */
  private _isBlankEditableText(text: string): boolean {
    return text.replace(/[\r\n\u00a0\u200b]/g, '') === '';
  }

  /**
   * Remove residual empty markup left by contenteditable after clearing text.
   *
   * @param element The editable cell element
   * @returns void
   */
  private _clearEmptyCell(element: HTMLElement): void {
    if (element.innerHTML === '') {
      return;
    }

    element.innerHTML = '';
  }

  /**
   * Whether the current selection covers one or more characters in this cell.
   *
   * @returns boolean
   */
  private _hasTextSelection(): boolean {
    const selection = window.getSelection();

    if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
      return false;
    }

    const element = this._element.nativeElement as HTMLElement;

    return element.contains(selection.anchorNode) && element.contains(selection.focusNode);
  }

  /**
   * Move the cursor to the end of the contenteditable element
   *
   * @param el The HTMLElement to move the cursor in
   * @returns void
   */
  private _moveCursorToEnd(el: HTMLElement): void {
    const range = document.createRange();
    const selection = window.getSelection();

    range.selectNodeContents(el);
    range.collapse(false);

    selection?.removeAllRanges();
    selection?.addRange(range);
  }
}
