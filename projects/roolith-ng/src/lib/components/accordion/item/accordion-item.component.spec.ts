import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { AccordionItemComponent } from './accordion-item.component';

describe('AccordionItemComponent', () => {
  let component: AccordionItemComponent;
  let fixture: ComponentFixture<AccordionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionItemComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('default values', () => {
    it('should initialize input and model values', () => {
      expect(component.expanded()).toBe(false);
      expect(component.disabled()).toBe(false);
      expect(component.header()).toBe('');
      expect(component.lastChild()).toBe(false);
    });
  });

  describe('inputs', () => {
    it('should use input values', async () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.componentRef.setInput('header', 'Details');
      await fixture.whenStable();

      expect(component.disabled()).toBe(true);
      expect(component.header()).toBe('Details');
    });

    it('should update model values', () => {
      component.expanded.set(true);
      component.lastChild.set(true);

      expect(component.expanded()).toBe(true);
      expect(component.lastChild()).toBe(true);
    });
  });

  describe('onClickHandler', () => {
    it('should prevent default event behavior', () => {
      const event = createMouseEvent();

      component.onClickHandler(event);

      expect(event.preventDefault).toHaveBeenCalledOnce();
    });

    it('should return without toggling when disabled', async () => {
      const emitSpy = vi.spyOn(component.changeEvent, 'emit');
      fixture.componentRef.setInput('disabled', true);
      await fixture.whenStable();

      component.onClickHandler(createMouseEvent());

      expect(component.expanded()).toBe(false);
      expect(emitSpy).not.toHaveBeenCalled();
    });

    it('should expand item when collapsed', () => {
      const emitSpy = vi.spyOn(component.changeEvent, 'emit');

      component.onClickHandler(createMouseEvent());

      expect(component.expanded()).toBe(true);
      expect(emitSpy).toHaveBeenCalledWith(true);
    });

    it('should collapse item when expanded', () => {
      const emitSpy = vi.spyOn(component.changeEvent, 'emit');
      component.expanded.set(true);

      component.onClickHandler(createMouseEvent());

      expect(component.expanded()).toBe(false);
      expect(emitSpy).toHaveBeenCalledWith(false);
    });
  });
});

/**
 * Creates a mock mouse event.
 *
 * @returns MouseEvent
 */
function createMouseEvent(): MouseEvent {
  return { preventDefault: vi.fn() } as unknown as MouseEvent;
}
