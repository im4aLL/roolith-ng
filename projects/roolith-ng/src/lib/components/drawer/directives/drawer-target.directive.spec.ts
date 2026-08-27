import { Component, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { DrawerTargetDirective } from './drawer-target.directive';

@Component({
  template: `
    <div [rngDrawerTarget]="drawerId">
      <button>trigger</button>
    </div>
  `,
  imports: [DrawerTargetDirective],
})
class TestHostComponent {
  public drawerId = '';
  public drawerTarget = viewChild(DrawerTargetDirective);
}

describe('DrawerTargetDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let directive: DrawerTargetDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    await fixture.whenStable();
    directive = fixture.componentInstance.drawerTarget()!;
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
    it('should set popovertarget attribute on the first button child', () => {
      vi.spyOn(directive, 'rngDrawerTarget').mockReturnValue('my-drawer');

      (directive as any)._setAttribute();

      const button = fixture.nativeElement.querySelector('button') as HTMLElement;
      expect(button.getAttribute('popovertarget')).toBe('my-drawer');
    });

    it('should do nothing when no clickable child element is found', () => {
      vi.spyOn(directive as any, '_getFirstClickableElement').mockReturnValue(null);

      expect(() => (directive as any)._setAttribute()).not.toThrow();
    });
  });
});
