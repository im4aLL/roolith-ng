import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { TextareaInputComponent } from './textarea-input.component';

describe('TextareaInputComponent', () => {
  let component: TextareaInputComponent;
  let fixture: ComponentFixture<TextareaInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextareaInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextareaInputComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('hintMessage', () => {
    it('should return error message when error and error message are provided', async () => {
      fixture.componentRef.setInput('error', true);
      fixture.componentRef.setInput('errorMessage', 'Description is required');
      fixture.componentRef.setInput('hint', 'Enter description');
      await fixture.whenStable();

      expect(component.hintMessage()).toBe('Description is required');
    });

    it('should return hint when error message is not provided', async () => {
      fixture.componentRef.setInput('hint', 'Enter description');
      await fixture.whenStable();

      expect(component.hintMessage()).toBe('Enter description');
    });

    it('should return null when neither error message nor hint exists', () => {
      expect(component.hintMessage()).toBeNull();
    });
  });

  describe('charCount', () => {
    it('should return value length', () => {
      component.value.set('Description');

      expect(component.charCount()).toBe(11);
    });

    it('should return zero when value is empty', () => {
      component.value.set('');

      expect(component.charCount()).toBe(0);
    });
  });

  describe('isAtLimit', () => {
    it('should return false when max length is undefined', () => {
      component.value.set('Description');

      expect(component.isAtLimit()).toBe(false);
    });

    it('should return false when character count is below max length', async () => {
      fixture.componentRef.setInput('maxLength', 20);
      component.value.set('Description');
      await fixture.whenStable();

      expect(component.isAtLimit()).toBe(false);
    });

    it('should return true when character count equals max length', async () => {
      fixture.componentRef.setInput('maxLength', 11);
      component.value.set('Description');
      await fixture.whenStable();

      expect(component.isAtLimit()).toBe(true);
    });

    it('should return true when character count exceeds max length', async () => {
      fixture.componentRef.setInput('maxLength', 5);
      component.value.set('Description');
      await fixture.whenStable();

      expect(component.isAtLimit()).toBe(true);
    });
  });

  describe('onInput', () => {
    it('should update value from textarea value', () => {
      const textarea = createMockTextarea('Updated description');

      component.onInput(createTextareaInputEvent(textarea));

      expect(component.value()).toBe('Updated description');
    });

    it('should enforce max length when textarea value exceeds limit', async () => {
      const textarea = createMockTextarea('Updated description');
      fixture.componentRef.setInput('maxLength', 7);
      await fixture.whenStable();

      component.onInput(createTextareaInputEvent(textarea));

      expect(textarea.value).toBe('Updated');
      expect(component.value()).toBe('Updated');
    });

    it('should keep textarea value when max length is not exceeded', async () => {
      const textarea = createMockTextarea('Updated');
      fixture.componentRef.setInput('maxLength', 20);
      await fixture.whenStable();

      component.onInput(createTextareaInputEvent(textarea));

      expect(textarea.value).toBe('Updated');
      expect(component.value()).toBe('Updated');
    });

    it('should resize textarea when auto resize is enabled', async () => {
      const textarea = createMockTextarea('Updated description', 120);
      fixture.componentRef.setInput('autoResize', true);
      await fixture.whenStable();

      component.onInput(createTextareaInputEvent(textarea));

      expect(textarea.style.height).toBe('120px');
    });

    it('should not resize textarea when auto resize is disabled', () => {
      const textarea = createMockTextarea('Updated description', 120);

      component.onInput(createTextareaInputEvent(textarea));

      expect(textarea.style.height).toBe('');
    });
  });
});

/**
 * Creates a mock textarea element.
 *
 * @param value string
 * @param scrollHeight number
 * @returns HTMLTextAreaElement
 */
function createMockTextarea(value: string, scrollHeight = 0): HTMLTextAreaElement {
  return {
    value,
    scrollHeight,
    style: { height: '' },
  } as HTMLTextAreaElement;
}

/**
 * Creates a textarea input event.
 *
 * @param textarea HTMLTextAreaElement
 * @returns Event
 */
function createTextareaInputEvent(textarea: HTMLTextAreaElement): Event {
  return { target: textarea } as unknown as Event;
}
