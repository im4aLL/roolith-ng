import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it, vi } from 'vitest';
import { ButtonSizeType } from '../button/data-access/button.interface';
import { ButtonSplitComponent } from './button-split.component';

describe('ButtonSplitComponent', () => {
  let component: ButtonSplitComponent;
  let fixture: ComponentFixture<ButtonSplitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonSplitComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonSplitComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('default values', () => {
    it('should initialize input values', () => {
      expect(component.actionIcon()).toBe('chevron-down');
      expect(component.size()).toBe('default');
    });
  });

  describe('inputs', () => {
    it('should use action icon input value', async () => {
      fixture.componentRef.setInput('actionIcon', 'delete');
      await fixture.whenStable();

      expect(component.actionIcon()).toBe('delete');
    });

    it('should use size input value', async () => {
      fixture.componentRef.setInput('size', 'small');
      await fixture.whenStable();

      expect(component.size()).toBe('small');
    });
  });

  describe('classNames', () => {
    it.each([
      ['default', ''],
      ['small', 'rng-button-split--small'],
      ['xsmall', 'rng-button-split--xsmall'],
      ['large', 'rng-button-split--large'],
    ] as [ButtonSizeType, string][])('should return class names for %s size', async (size, expectedClass) => {
      fixture.componentRef.setInput('size', size);
      await fixture.whenStable();

      expect(component.classNames()).toBe(expectedClass);
    });
  });

  describe('onClickHandler', () => {
    it('should emit click event', () => {
      const emitSpy = vi.spyOn(component.clickEvent, 'emit');

      component.onClickHandler();

      expect(emitSpy).toHaveBeenCalledOnce();
    });
  });
});
