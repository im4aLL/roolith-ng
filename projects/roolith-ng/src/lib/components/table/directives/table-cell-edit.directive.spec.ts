import { Component, signal, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, vi } from 'vitest';
import { DEFAULT_MAX_CELL_EDIT_LENGTH, TableCellEditDirective } from './table-cell-edit.directive';

@Component({
  template: `
    <div
      rngTableCellEdit
      [restrictCellEditToAlphanumeric]="restrictCellEditToAlphanumeric()"
      [maxCellEditLength]="maxCellEditLength()"
      contenteditable="true"></div>
  `,
  imports: [TableCellEditDirective],
})
class TestHostComponent {
  public restrictCellEditToAlphanumeric = signal(false);
  public maxCellEditLength = signal(DEFAULT_MAX_CELL_EDIT_LENGTH);
  public cellEdit = viewChild(TableCellEditDirective);
}

describe('TableCellEditDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let directive: TableCellEditDirective;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    await fixture.whenStable();
    directive = host.cellEdit()!;
    el = fixture.nativeElement.querySelector('div') as HTMLElement;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should default maxCellEditLength to the shared default', () => {
    expect(directive.maxCellEditLength()).toBe(DEFAULT_MAX_CELL_EDIT_LENGTH);
  });

  describe('when restrictCellEditToAlphanumeric is false', () => {
    it('should allow special characters on keydown', () => {
      const event = new KeyboardEvent('keydown', { key: '!', bubbles: true });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

      el.dispatchEvent(event);

      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('should not strip special characters on input', () => {
      const moveCursorSpy = vi.spyOn(directive as any, '_moveCursorToEnd');
      el.innerText = 'REF-001/A#1';

      el.dispatchEvent(new Event('input', { bubbles: true }));

      expect(el.innerText).toBe('REF-001/A#1');
      expect(moveCursorSpy).not.toHaveBeenCalled();
    });
  });

  describe('when restrictCellEditToAlphanumeric is true', () => {
    beforeEach(async () => {
      host.restrictCellEditToAlphanumeric.set(true);
      await fixture.whenStable();
    });

    describe('onKeyDown', () => {
      it('should allow alphanumeric keys', () => {
        const event = new KeyboardEvent('keydown', { key: 'a', bubbles: true });
        const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

        el.dispatchEvent(event);

        expect(preventDefaultSpy).not.toHaveBeenCalled();
      });

      it('should allow space key', () => {
        const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
        const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

        el.dispatchEvent(event);

        expect(preventDefaultSpy).not.toHaveBeenCalled();
      });

      it('should prevent special characters', () => {
        const event = new KeyboardEvent('keydown', { key: '!', bubbles: true });
        const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

        el.dispatchEvent(event);

        expect(preventDefaultSpy).toHaveBeenCalledOnce();
      });

      it('should allow control keys such as Enter', () => {
        const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
        const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

        el.dispatchEvent(event);

        expect(preventDefaultSpy).not.toHaveBeenCalled();
      });
    });

    describe('onInput', () => {
      it('should remove non-alphanumeric characters from innerText', () => {
        const moveCursorSpy = vi.spyOn(directive as any, '_moveCursorToEnd');
        el.innerText = 'hello!@#';

        el.dispatchEvent(new Event('input', { bubbles: true }));

        expect(el.innerText).toBe('hello');
        expect(moveCursorSpy).toHaveBeenCalledOnce();
      });

      it('should not modify innerText when content is already clean', () => {
        el.innerText = 'hello 123';
        const moveCursorSpy = vi.spyOn(directive as any, '_moveCursorToEnd');

        el.dispatchEvent(new Event('input', { bubbles: true }));

        expect(el.innerText).toBe('hello 123');
        expect(moveCursorSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('empty contenteditable state', () => {
    it('should clear residual <br> left after deleting all text', () => {
      el.innerHTML = '<br>';
      Object.defineProperty(el, 'innerText', {
        configurable: true,
        get: (): string => (el.innerHTML.includes('<br>') ? '\n' : (el.textContent ?? '')),
        set: (value: string): void => {
          el.textContent = value;
        },
      });

      el.dispatchEvent(new Event('input', { bubbles: true }));

      expect(el.innerHTML).toBe('');
    });

    it('should clear residual empty block markup', () => {
      el.innerHTML = '<div><br></div>';
      Object.defineProperty(el, 'innerText', {
        configurable: true,
        get: (): string => (el.innerHTML.includes('<br>') ? '\n' : (el.textContent ?? '')),
        set: (value: string): void => {
          el.textContent = value;
        },
      });

      el.dispatchEvent(new Event('input', { bubbles: true }));

      expect(el.innerHTML).toBe('');
    });

    it('should keep intentional spaces', () => {
      el.innerText = ' ';

      el.dispatchEvent(new Event('input', { bubbles: true }));

      expect(el.innerText).toBe(' ');
    });
  });

  describe('onPaste', () => {
    /**
     * Build a paste event with plain-text clipboard data.
     *
     * @param text Clipboard plain text
     * @returns ClipboardEvent
     */
    function createPasteEvent(text: string): ClipboardEvent {
      const event = new Event('paste', { bubbles: true, cancelable: true }) as ClipboardEvent;

      Object.defineProperty(event, 'clipboardData', {
        value: {
          getData: (format: string): string => {
            if (format === 'text/plain') {
              return text;
            }

            if (format === 'text/html') {
              return `<b style="color:red">${text}</b>`;
            }

            return '';
          },
        },
      });

      return event;
    }

    it('should prevent default rich paste and insert plain text', () => {
      const event = createPasteEvent('hello');
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
      const insertSpy = vi.spyOn(directive as any, '_insertPlainText');

      el.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalledOnce();
      expect(insertSpy).toHaveBeenCalledWith('hello');
    });

    it('should strip non-alphanumeric characters from pasted text when restricted', async () => {
      host.restrictCellEditToAlphanumeric.set(true);
      await fixture.whenStable();
      const insertSpy = vi.spyOn(directive as any, '_insertPlainText');

      el.dispatchEvent(createPasteEvent('hello!@# world'));

      expect(insertSpy).toHaveBeenCalledWith('hello world');
    });

    it('should truncate pasted text to remaining max length', async () => {
      host.maxCellEditLength.set(5);
      await fixture.whenStable();
      el.innerText = 'ab';
      const insertSpy = vi.spyOn(directive as any, '_insertPlainText');

      el.dispatchEvent(createPasteEvent('cdefgh'));

      expect(insertSpy).toHaveBeenCalledWith('cde');
    });

    it('should not insert when paste has no available capacity', () => {
      el.innerText = 'a'.repeat(DEFAULT_MAX_CELL_EDIT_LENGTH);
      const insertSpy = vi.spyOn(directive as any, '_insertPlainText');

      el.dispatchEvent(createPasteEvent('extra'));

      expect(insertSpy).not.toHaveBeenCalled();
    });
  });

  describe('maxCellEditLength', () => {
    it('should prevent printable keys when at default max length', () => {
      el.innerText = 'a'.repeat(DEFAULT_MAX_CELL_EDIT_LENGTH);
      const event = new KeyboardEvent('keydown', { key: 'a', bubbles: true });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

      el.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalledOnce();
    });

    it('should allow Ctrl+A when at max length', () => {
      el.innerText = 'a'.repeat(DEFAULT_MAX_CELL_EDIT_LENGTH);
      const event = new KeyboardEvent('keydown', { key: 'a', ctrlKey: true, bubbles: true });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

      el.dispatchEvent(event);

      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('should allow Meta+A when at max length', () => {
      el.innerText = 'a'.repeat(DEFAULT_MAX_CELL_EDIT_LENGTH);
      const event = new KeyboardEvent('keydown', { key: 'a', metaKey: true, bubbles: true });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

      el.dispatchEvent(event);

      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('should truncate pasted content over default max length', () => {
      const moveCursorSpy = vi.spyOn(directive as any, '_moveCursorToEnd');
      el.innerText = 'a'.repeat(DEFAULT_MAX_CELL_EDIT_LENGTH + 20);

      el.dispatchEvent(new Event('input', { bubbles: true }));

      expect(el.innerText).toBe('a'.repeat(DEFAULT_MAX_CELL_EDIT_LENGTH));
      expect(moveCursorSpy).toHaveBeenCalledOnce();
    });

    it('should use a custom max length when provided', async () => {
      host.maxCellEditLength.set(5);
      await fixture.whenStable();
      el.innerText = '12345';
      const event = new KeyboardEvent('keydown', { key: 'a', bubbles: true });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

      el.dispatchEvent(event);

      expect(preventDefaultSpy).toHaveBeenCalledOnce();
    });

    it('should allow printable keys below custom max length', async () => {
      host.maxCellEditLength.set(5);
      await fixture.whenStable();
      el.innerText = '1234';
      const event = new KeyboardEvent('keydown', { key: 'a', bubbles: true });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

      el.dispatchEvent(event);

      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it('should truncate pasted content over custom max length', async () => {
      host.maxCellEditLength.set(5);
      await fixture.whenStable();
      const moveCursorSpy = vi.spyOn(directive as any, '_moveCursorToEnd');
      el.innerText = '123456789';

      el.dispatchEvent(new Event('input', { bubbles: true }));

      expect(el.innerText).toBe('12345');
      expect(moveCursorSpy).toHaveBeenCalledOnce();
    });
  });
});
