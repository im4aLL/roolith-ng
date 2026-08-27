import { Component, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { DropdownTargetDirective } from './dropdown-target.directive';

@Component({
  template: `
    <div [rngDropdownTarget]="dropdownId">
      <button>trigger</button>
    </div>
  `,
  imports: [DropdownTargetDirective],
})
class TestHostComponent {
  public dropdownId = '';
  public dropdownTarget = viewChild(DropdownTargetDirective);
}

describe('DropdownTargetDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let directive: DropdownTargetDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    await fixture.whenStable();
    directive = fixture.componentInstance.dropdownTarget()!;
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call _setAttribute on init', () => {
      const setAttributeSpy = vi.spyOn(directive as any, '_setAttribute');

      directive.ngOnInit();

      expect(setAttributeSpy).toHaveBeenCalledOnce();
    });
  });

  describe('_setAttribute', () => {
    it('should set popovertarget, add trigger class and set anchor-name on button child', () => {
      vi.spyOn(directive, 'rngDropdownTarget').mockReturnValue('menu');

      (directive as any)._setAttribute();

      const button = fixture.nativeElement.querySelector('button') as HTMLElement;
      expect(button.getAttribute('popovertarget')).toBe('rng-dropdown-menu');
      expect(button.classList.contains('rng-dropdown__trigger')).toBe(true);
      expect(button.style.getPropertyValue('anchor-name')).toBe('--rng-menu');
    });

    it('should set attributes directly on host when host is a button', () => {
      const buttonEl = document.createElement('button');
      vi.spyOn(directive['_element'], 'nativeElement', 'get').mockReturnValue(buttonEl);
      vi.spyOn(directive, 'rngDropdownTarget').mockReturnValue('btn');

      (directive as any)._setAttribute();

      expect(buttonEl.getAttribute('popovertarget')).toBe('rng-dropdown-btn');
      expect(buttonEl.classList.contains('rng-dropdown__trigger')).toBe(true);
    });

    it('should do nothing when no clickable element is found', () => {
      vi.spyOn(directive as any, '_getFirstClickableElement').mockReturnValue(null);

      expect(() => (directive as any)._setAttribute()).not.toThrow();
    });
  });
});
