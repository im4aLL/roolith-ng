import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DropdownAlignment, IDropdownItem } from './data-access/dropdown.interface';
import { DropdownComponent } from './dropdown.component';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('alignment computed values', () => {
    it.each([
      ['right', true, false, false],
      ['top', false, true, false],
      ['top-right', false, false, true],
    ] as [DropdownAlignment, boolean, boolean, boolean][])(
      'should resolve %s alignment',
      async (alignment, isRight, isTop, isTopRight) => {
        fixture.componentRef.setInput('alignment', alignment);
        await fixture.whenStable();

        expect(component.isAlignedRight()).toBe(isRight);
        expect(component.isAlignedTop()).toBe(isTop);
        expect(component.isAlignedTopRight()).toBe(isTopRight);
      },
    );

    it('should resolve alignment from calculated position class', () => {
      component['_positionClass'].set('rng-dropdown--top-right');

      expect(component.isAlignedTopRight()).toBe(true);
    });

    it('should return false for all alignments by default', () => {
      expect(component.isAlignedRight()).toBe(false);
      expect(component.isAlignedTop()).toBe(false);
      expect(component.isAlignedTopRight()).toBe(false);
    });
  });

  describe('onItemClick', () => {
    it('should emit clicked item', () => {
      const item = createMockDropdownItem();
      const emitSpy = vi.spyOn(component.itemClick, 'emit');
      vi.spyOn(component as any, '_dropdownEl').mockReturnValue({ nativeElement: { hidePopover: vi.fn() } });

      component.onItemClick(item);

      expect(emitSpy).toHaveBeenCalledWith(item);
    });

    it('should hide dropdown popover', () => {
      const hidePopover = vi.fn();
      vi.spyOn(component as any, '_dropdownEl').mockReturnValue({ nativeElement: { hidePopover } });

      component.onItemClick(createMockDropdownItem());

      expect(hidePopover).toHaveBeenCalledOnce();
    });

    it('should not emit or close popover when item is disabled', () => {
      const hidePopover = vi.fn();
      const emitSpy = vi.spyOn(component.itemClick, 'emit');
      vi.spyOn(component as any, '_dropdownEl').mockReturnValue({ nativeElement: { hidePopover } });

      component.onItemClick(createMockDropdownItem({ isDisabled: true }));

      expect(emitSpy).not.toHaveBeenCalled();
      expect(hidePopover).not.toHaveBeenCalled();
    });
  });

  describe('onToggle', () => {
    it('should clear position class when dropdown closes', () => {
      component['_positionClass'].set('rng-dropdown--right');

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
    it('should keep position class empty when dropdown element is missing', () => {
      vi.spyOn(component as any, '_dropdownEl').mockReturnValue(undefined);

      component['_calculatePosition']();

      expect(component['_positionClass']()).toBeNull();
    });

    it.each([
      [{ right: 2000, bottom: 2000 }, 'rng-dropdown--top-right'],
      [{ right: 100, bottom: 2000 }, 'rng-dropdown--top'],
      [{ right: 2000, bottom: 100 }, 'rng-dropdown--right'],
      [{ right: 100, bottom: 100 }, null],
    ] as [{ right: number; bottom: number }, string | null][])(
      'should set position class based on dropdown overflow',
      (rect, expectedClass) => {
        const mockDropdownElement = {
          getBoundingClientRect: vi.fn().mockReturnValue(rect),
        };
        vi.spyOn(component as any, '_dropdownEl').mockReturnValue({ nativeElement: mockDropdownElement });

        component['_calculatePosition']();

        expect(component['_positionClass']()).toBe(expectedClass);
      },
    );
  });
});

/**
 * Creates a mock dropdown item.
 *
 * @returns IDropdownItem
 */
function createMockDropdownItem(overrides: Partial<IDropdownItem> = {}): IDropdownItem {
  return {
    label: 'Edit',
    value: 'edit',
    ...overrides,
  };
}
