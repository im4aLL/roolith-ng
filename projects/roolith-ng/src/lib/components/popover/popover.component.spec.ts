import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { PopoverAlignment } from './data-access/popover.interface';
import { PopoverComponent } from './popover.component';

describe('PopoverComponent', () => {
  let component: PopoverComponent;
  let fixture: ComponentFixture<PopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopoverComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('classNames', () => {
    it('should return default class names', () => {
      expect(component.classNames()).toBe('rng-popover rng-animation rng-reveal');
    });

    it('should include style class when provided', async () => {
      fixture.componentRef.setInput('styleClass', 'custom-popover');
      await fixture.whenStable();

      expect(component.classNames()).toBe('rng-popover rng-animation rng-reveal custom-popover');
    });
  });

  describe('alignment computed values', () => {
    it.each([
      ['right', true, false, false],
      ['top', false, true, false],
      ['top-right', false, false, true],
    ] as [PopoverAlignment, boolean, boolean, boolean][])('should resolve %s alignment', async (alignment, isRight, isTop, isTopRight) => {
      fixture.componentRef.setInput('alignment', alignment);
      await fixture.whenStable();

      expect(component.isAlignedRight()).toBe(isRight);
      expect(component.isAlignedTop()).toBe(isTop);
      expect(component.isAlignedTopRight()).toBe(isTopRight);
    });

    it('should resolve alignment from calculated position class', () => {
      component['_positionClass'].set('rng-popover--right');

      expect(component.isAlignedRight()).toBe(true);
    });
  });

  describe('ngAfterViewInit', () => {
    it('should emit open change event on native toggle open', () => {
      const emitSpy = vi.spyOn(component.changeEvent, 'emit');
      const mockPopoverElement = createMockPopoverElement('open');
      vi.spyOn(component as any, '_popoverEl').mockReturnValue({ nativeElement: mockPopoverElement });

      component.ngAfterViewInit();

      expect(emitSpy).toHaveBeenCalledWith({ type: 'open' });
    });

    it('should emit close change event on native toggle close', () => {
      const emitSpy = vi.spyOn(component.changeEvent, 'emit');
      const mockPopoverElement = createMockPopoverElement('closed');
      vi.spyOn(component as any, '_popoverEl').mockReturnValue({ nativeElement: mockPopoverElement });

      component.ngAfterViewInit();

      expect(emitSpy).toHaveBeenCalledWith({ type: 'close' });
    });
  });

  describe('ngOnDestroy', () => {
    it('should abort event controller', () => {
      const abortSpy = vi.spyOn(component['_controller'], 'abort');

      component.ngOnDestroy();

      expect(abortSpy).toHaveBeenCalledOnce();
    });
  });

  describe('onToggle', () => {
    it('should clear position class when popover closes', () => {
      component['_positionClass'].set('rng-popover--right');

      component.onToggle({ newState: 'closed' } as ToggleEvent);

      expect(component['_positionClass']()).toBeNull();
    });

    it('should not calculate position when alignment input is provided', async () => {
      const calculatePositionSpy = vi.spyOn(component as any, '_calculatePosition');
      fixture.componentRef.setInput('alignment', 'right');
      await fixture.whenStable();
      vi.useFakeTimers();

      component.onToggle({ newState: 'open' } as ToggleEvent);
      vi.runAllTimers();

      expect(calculatePositionSpy).not.toHaveBeenCalled();
    });

    it('should calculate position when opened without alignment input', () => {
      vi.useFakeTimers();
      const calculatePositionSpy = vi.spyOn(component as any, '_calculatePosition');

      component.onToggle({ newState: 'open' } as ToggleEvent);
      vi.runAllTimers();

      expect(calculatePositionSpy).toHaveBeenCalledOnce();
    });
  });

  describe('_calculatePosition', () => {
    it('should keep position class empty when popover element is missing', () => {
      vi.spyOn(component as any, '_popoverEl').mockReturnValue(undefined);

      component['_calculatePosition']();

      expect(component['_positionClass']()).toBeNull();
    });

    it.each([
      [{ right: 2000, bottom: 2000 }, 'rng-popover--top-right'],
      [{ right: 100, bottom: 2000 }, 'rng-popover--top'],
      [{ right: 2000, bottom: 100 }, 'rng-popover--right'],
      [{ right: 100, bottom: 100 }, null],
    ] as [{ right: number; bottom: number }, string | null][])('should set position class based on popover overflow', (rect, expectedClass) => {
      const mockPopoverElement = {
        getBoundingClientRect: vi.fn().mockReturnValue(rect),
      };
      vi.spyOn(component as any, '_popoverEl').mockReturnValue({ nativeElement: mockPopoverElement });

      component['_calculatePosition']();

      expect(component['_positionClass']()).toBe(expectedClass);
    });
  });

  describe('closePopover', () => {
    it('should call native hidePopover when popover element exists', () => {
      const hidePopover = vi.fn();
      vi.spyOn(component as any, '_popoverEl').mockReturnValue({ nativeElement: { hidePopover } });

      component.closePopover();

      expect(hidePopover).toHaveBeenCalledOnce();
    });

    it('should not throw when popover element is missing', () => {
      vi.spyOn(component as any, '_popoverEl').mockReturnValue(undefined);

      expect(() => component.closePopover()).not.toThrow();
    });
  });
});

/**
 * Creates a mock popover element that invokes the toggle listener immediately.
 *
 * @param newState string
 * @returns HTMLElement
 */
function createMockPopoverElement(newState: string): HTMLElement {
  return {
    addEventListener: vi.fn((eventName: string, listener: EventListener) => {
      if (eventName === 'toggle') {
        listener({ newState } as ToggleEvent);
      }
    }),
  } as unknown as HTMLElement;
}
