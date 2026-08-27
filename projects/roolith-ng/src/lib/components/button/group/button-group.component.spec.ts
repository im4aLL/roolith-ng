import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { ButtonSizeType } from '../data-access/button.interface';
import { ButtonGroupComponent } from './button-group.component';

describe('ButtonGroupComponent', () => {
  let component: ButtonGroupComponent;
  let fixture: ComponentFixture<ButtonGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonGroupComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('default values', () => {
    it('should initialize input values', () => {
      expect(component.labels()).toEqual([]);
      expect(component.activeLabel()).toBeNull();
      expect(component.size()).toBe('default');
    });
  });

  describe('inputs', () => {
    it('should use labels input value', async () => {
      fixture.componentRef.setInput('labels', ['AM', 'PM']);
      await fixture.whenStable();

      expect(component.labels()).toEqual(['AM', 'PM']);
    });

    it('should use active label input value', async () => {
      fixture.componentRef.setInput('activeLabel', 'PM');
      await fixture.whenStable();

      expect(component.activeLabel()).toBe('PM');
    });
  });

  describe('buttonSizeClass', () => {
    it.each([
      ['default', ''],
      ['small', 'rng-button--small'],
      ['xsmall', 'rng-button--xsmall'],
      ['large', 'rng-button--large'],
    ] as [ButtonSizeType, string][])('should return button class for %s size', async (size, expectedClass) => {
      fixture.componentRef.setInput('size', size);
      await fixture.whenStable();

      expect(component.buttonSizeClass()).toBe(expectedClass);
    });
  });

  describe('buttonGroupSizeClass', () => {
    it.each([
      ['default', ''],
      ['small', 'rng-button-group--small'],
      ['xsmall', 'rng-button-group--xsmall'],
      ['large', 'rng-button-group--large'],
    ] as [ButtonSizeType, string][])('should return button group class for %s size', async (size, expectedClass) => {
      fixture.componentRef.setInput('size', size);
      await fixture.whenStable();

      expect(component.buttonGroupSizeClass()).toBe(expectedClass);
    });
  });

  describe('labelClickHandler', () => {
    it('should prevent default event behavior', () => {
      const event = createMouseEvent();

      component.labelClickHandler(event, 'AM');

      expect(event.preventDefault).toHaveBeenCalledOnce();
    });

    it('should emit selected label', () => {
      const emitSpy = vi.spyOn(component.labelSelected, 'emit');

      component.labelClickHandler(createMouseEvent(), 'PM');

      expect(emitSpy).toHaveBeenCalledWith('PM');
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
