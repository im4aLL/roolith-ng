import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { BadgeIconColor, BadgeSizeType, BadgeType, BadgeVariant } from './data-access/badge.interface';
import { BadgeComponent } from './badge.component';

describe('BadgeComponent', () => {
  let component: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('default values', () => {
    it('should initialize input values', () => {
      expect(component.type()).toBe('default');
      expect(component.size()).toBe('default');
      expect(component.variant()).toBe('default');
      expect(component.icon()).toBeNull();
      expect(component.iconColor()).toBe('default');
    });
  });

  describe('inputs', () => {
    it('should use icon input value', async () => {
      fixture.componentRef.setInput('icon', 'check');
      await fixture.whenStable();

      expect(component.icon()).toBe('check');
    });
  });

  describe('typeClassName', () => {
    it.each([
      ['default', ''],
      ['primary', 'rng-badge--primary'],
      ['success', 'rng-badge--success'],
      ['danger', 'rng-badge--danger'],
      ['warning', 'rng-badge--warning'],
      ['info', 'rng-badge--info'],
      ['large', 'rng-badge--large'],
      ['subtle', 'rng-badge--subtle'],
      ['intense', 'rng-badge--intense'],
    ] as [BadgeType, string][])('should return class name for %s type', async (type, expectedClass) => {
      fixture.componentRef.setInput('type', type);
      await fixture.whenStable();

      expect(component.typeClassName()).toBe(expectedClass);
    });
  });

  describe('sizeClassName', () => {
    it.each([
      ['default', ''],
      ['large', 'rng-badge--large'],
    ] as [BadgeSizeType, string][])('should return class name for %s size', async (size, expectedClass) => {
      fixture.componentRef.setInput('size', size);
      await fixture.whenStable();

      expect(component.sizeClassName()).toBe(expectedClass);
    });
  });

  describe('variantClassName', () => {
    it.each([
      ['default', ''],
      ['status', 'rng-badge--status'],
    ] as [BadgeVariant, string][])('should return class name for %s variant', async (variant, expectedClass) => {
      fixture.componentRef.setInput('variant', variant);
      await fixture.whenStable();

      expect(component.variantClassName()).toBe(expectedClass);
    });
  });

  describe('iconColorClassName', () => {
    it.each([
      ['default', ''],
      ['primary', 'rng-color-primary'],
      ['secondary', 'rng-color-secondary'],
      ['success', 'rng-color-success'],
      ['danger', 'rng-color-danger'],
      ['warning', 'rng-color-warning'],
      ['info', 'rng-color-info'],
    ] as [BadgeIconColor, string][])('should return class name for %s icon color', async (iconColor, expectedClass) => {
      fixture.componentRef.setInput('iconColor', iconColor);
      await fixture.whenStable();

      expect(component.iconColorClassName()).toBe(expectedClass);
    });
  });

  describe('classNames', () => {
    it('should combine type, size, and variant classes', async () => {
      fixture.componentRef.setInput('type', 'primary');
      fixture.componentRef.setInput('size', 'large');
      fixture.componentRef.setInput('variant', 'status');
      await fixture.whenStable();

      expect(component.classNames()).toBe('rng-badge--primary rng-badge--large rng-badge--status');
    });

    it('should omit empty classes', () => {
      expect(component.classNames()).toBe('');
    });
  });
});
