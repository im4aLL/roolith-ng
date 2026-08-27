import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { ButtonSizeType, ButtonVariantType, IconPositionType } from './data-access/button.interface';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('default values', () => {
    it('should initialize input values', () => {
      expect(component.variant()).toBe('default');
      expect(component.size()).toBe('default');
      expect(component.icon()).toBeNull();
      expect(component.iconPosition()).toBe('left');
      expect(component.showLoading()).toBe(false);
      expect(component.block()).toBe(false);
      expect(component.disabled()).toBe(false);
      expect(component.key()).toBeNull();
    });
  });

  describe('inputs', () => {
    it('should use icon and icon position input values', async () => {
      fixture.componentRef.setInput('icon', 'settings');
      fixture.componentRef.setInput('iconPosition', 'right');
      await fixture.whenStable();

      expect(component.icon()).toBe('settings');
      expect(component.iconPosition()).toBe('right');
    });

    it('should use state input values', async () => {
      fixture.componentRef.setInput('showLoading', true);
      fixture.componentRef.setInput('block', true);
      fixture.componentRef.setInput('disabled', true);
      fixture.componentRef.setInput('key', 'submit-button');
      await fixture.whenStable();

      expect(component.showLoading()).toBe(true);
      expect(component.block()).toBe(true);
      expect(component.disabled()).toBe(true);
      expect(component.key()).toBe('submit-button');
    });
  });

  describe('variantClassName', () => {
    it.each([
      ['default', ''],
      ['primary', 'rng-button--primary'],
      ['secondary', 'rng-button--secondary'],
      ['success', 'rng-button--success'],
      ['danger', 'rng-button--danger'],
      ['warning', 'rng-button--warning'],
      ['info', 'rng-button--info'],
      ['dark', 'rng-button--dark'],
      ['gray', 'rng-button--gray'],
      ['ghost', 'rng-button--ghost'],
      ['link', 'rng-button--link'],
    ] as [ButtonVariantType, string][])('should return class name for %s variant', async (variant, expectedClass) => {
      fixture.componentRef.setInput('variant', variant);
      await fixture.whenStable();

      expect(component.variantClassName()).toBe(expectedClass);
    });
  });

  describe('sizeClassName', () => {
    it.each([
      ['default', ''],
      ['small', 'rng-button--small'],
      ['xsmall', 'rng-button--xsmall'],
      ['large', 'rng-button--large'],
    ] as [ButtonSizeType, string][])('should return class name for %s size', async (size, expectedClass) => {
      fixture.componentRef.setInput('size', size);
      await fixture.whenStable();

      expect(component.sizeClassName()).toBe(expectedClass);
    });
  });

  describe('classNames', () => {
    it('should combine variant and size classes', async () => {
      fixture.componentRef.setInput('variant', 'primary');
      fixture.componentRef.setInput('size', 'small');
      await fixture.whenStable();

      expect(component.classNames()).toBe('rng-button--primary rng-button--small');
    });

    it('should include loading class when show loading is true', async () => {
      fixture.componentRef.setInput('showLoading', true);
      await fixture.whenStable();

      expect(component.classNames()).toContain('rng-button--loading');
    });

    it('should include block class when block is true', async () => {
      fixture.componentRef.setInput('block', true);
      await fixture.whenStable();

      expect(component.classNames()).toContain('rng-button--block');
    });

    it('should include disabled class when disabled is true', async () => {
      fixture.componentRef.setInput('disabled', true);
      await fixture.whenStable();

      expect(component.classNames()).toContain('rng-button--disabled');
    });

    it('should omit empty classes', () => {
      expect(component.classNames()).toBe('');
    });
  });

  describe('hasIcon', () => {
    it('should return false when icon is not provided', () => {
      expect(component.hasIcon()).toBe(false);
    });

    it('should return true when icon is provided', async () => {
      fixture.componentRef.setInput('icon', 'settings');
      await fixture.whenStable();

      expect(component.hasIcon()).toBe(true);
    });
  });

  describe('onClickHandler', () => {
    it('should prevent default and not emit when loading is shown', async () => {
      const event = createClickEvent();
      const emitSpy = vi.spyOn(component.clickEvent, 'emit');
      fixture.componentRef.setInput('showLoading', true);
      await fixture.whenStable();

      component.onClickHandler(event);

      expect(event.preventDefault).toHaveBeenCalledOnce();
      expect(emitSpy).not.toHaveBeenCalled();
    });

    it('should emit click event when loading is not shown', () => {
      const event = createClickEvent();
      const emitSpy = vi.spyOn(component.clickEvent, 'emit');

      component.onClickHandler(event);

      expect(event.preventDefault).not.toHaveBeenCalled();
      expect(emitSpy).toHaveBeenCalledOnce();
    });
  });
});

/**
 * Creates a mock click event.
 *
 * @returns Event
 */
function createClickEvent(): Event {
  return { preventDefault: vi.fn() } as unknown as Event;
}
