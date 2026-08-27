import { Component, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';import { vi } from 'vitest';
import { ITableStickyDirectiveData } from '../data-access/table.interface';
import { TableStickyDirective } from './table-sticky.directive';

@Component({
  template: `<div [rngTableSticky]="stickyData"></div>`,
  imports: [TableStickyDirective],
})
class TestHostComponent {
  public stickyData: ITableStickyDirectiveData | null = null;
  public sticky = viewChild(TableStickyDirective);
}

describe('TableStickyDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let directive: TableStickyDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    await fixture.whenStable();
    directive = fixture.componentInstance.sticky()!;
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should not call _init when rngTableSticky is null', () => {
      const initSpy = vi.spyOn(directive, '_init');

      directive.ngOnInit();

      expect(initSpy).not.toHaveBeenCalled();
    });

    it('should call _init when rngTableSticky has data', () => {
      vi.spyOn(directive, 'rngTableSticky').mockReturnValue({ index: 0, width: 100, left: 0 });
      const initSpy = vi.spyOn(directive, '_init');

      directive.ngOnInit();

      expect(initSpy).toHaveBeenCalledOnce();
    });
  });

  describe('_init', () => {
    it('should add sticky class and set styles on the element', () => {
      vi.spyOn(directive, 'rngTableSticky').mockReturnValue({ index: 2, width: 150, left: 50 });

      directive._init();

      const el = fixture.debugElement.query(By.directive(TableStickyDirective)).nativeElement as HTMLElement;
      expect(el.classList.contains('rng-table__sticky')).toBe(true);
      expect(el.style.left).toBe('50px');
      expect(el.style.minWidth).toBe('150px');
      expect(el.style.zIndex).toBe('3');
    });

    it('should not throw when element is null', () => {
      vi.spyOn(directive['_element'], 'nativeElement', 'get').mockReturnValue(null);

      expect(() => directive._init()).not.toThrow();
    });
  });
});
