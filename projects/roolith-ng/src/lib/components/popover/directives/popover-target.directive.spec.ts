import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PopoverTargetDirective } from './popover-target.directive';

@Component({
  template: `
    <div rngPopoverTarget="my-popover"><button>Open</button></div>
  `,
  imports: [PopoverTargetDirective],
})
class TestHostButtonInDivComponent {}

@Component({
  template: `
    <button rngPopoverTarget="my-popover">Open</button>
  `,
  imports: [PopoverTargetDirective],
})
class TestHostButtonComponent {}

@Component({
  template: `
    <div rngPopoverTarget="my-popover">
      <a href="#"><span>Link</span></a>
    </div>
  `,
  imports: [PopoverTargetDirective],
})
class TestHostNoButtonComponent {}

describe('PopoverTargetDirective', () => {
  describe('when host element contains a button child', () => {
    let fixture: ComponentFixture<TestHostButtonInDivComponent>;
    let button: HTMLButtonElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestHostButtonInDivComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestHostButtonInDivComponent);
      await fixture.whenStable();
      button = fixture.nativeElement.querySelector('button');
    });

    it('should create', () => {
      const directiveEl = fixture.debugElement.query(By.directive(PopoverTargetDirective));
      expect(directiveEl).toBeTruthy();
    });

    it('should set popovertarget attribute on the button', () => {
      expect(button.getAttribute('popovertarget')).toBe('rng-popover-my-popover');
    });

    it('should add rng-popover__trigger class to the button', () => {
      expect(button.classList.contains('rng-popover__trigger')).toBe(true);
    });

    it('should set anchor-name style on the button', () => {
      expect(button.style.getPropertyValue('anchor-name')).toBe('--rng-my-popover');
    });
  });

  describe('when host element is itself a button', () => {
    let fixture: ComponentFixture<TestHostButtonComponent>;
    let button: HTMLButtonElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestHostButtonComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestHostButtonComponent);
      await fixture.whenStable();
      button = fixture.nativeElement.querySelector('button');
    });

    it('should set popovertarget attribute on the host button itself', () => {
      expect(button.getAttribute('popovertarget')).toBe('rng-popover-my-popover');
    });

    it('should add rng-popover__trigger class to the host button', () => {
      expect(button.classList.contains('rng-popover__trigger')).toBe(true);
    });
  });

  describe('when host element has no button', () => {
    let fixture: ComponentFixture<TestHostNoButtonComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestHostNoButtonComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(TestHostNoButtonComponent);
      await fixture.whenStable();
    });

    it('should not throw', () => {
      expect(() => fixture.detectChanges()).not.toThrow();
    });

    it('should not set popovertarget on non-button child', () => {
      const anchor = fixture.nativeElement.querySelector('a');
      expect(anchor.getAttribute('popovertarget')).toBeNull();
    });
  });
});
