import { Directive, ElementRef, inject, input, OnInit } from '@angular/core';
import { ITableStickyDirectiveData } from '../data-access/table.interface';

@Directive({
  selector: '[rngTableSticky]',
})
export class TableStickyDirective implements OnInit {
  public rngTableSticky = input<ITableStickyDirectiveData | null>(null);
  private _element = inject(ElementRef);

  ngOnInit(): void {
    if (!this.rngTableSticky()) {
      return;
    }

    this._init();
  }

  public _init(): void {
    const element = this._element.nativeElement as HTMLElement;

    if (!element) {
      return;
    }

    this._addStickyClass(element);
    this._setStickyStyles(element);
  }

  /**
   * Adds sticky class to the element
   *
   * @param element HTMLElement
   * @returns void
   */
  private _addStickyClass(element: HTMLElement): void {
    element.classList.add('rng-table__sticky');
  }

  /**
   * Sets the sticky styles to the element
   *
   * @param element HTMLElement
   * @returns void
   */
  private _setStickyStyles(element: HTMLElement): void {
    const data = this.rngTableSticky();

    if (!data) {
      return;
    }

    const { index, width, left } = data;

    element.style.left = `${left}px`;
    element.style.minWidth = `${width}px`;
    element.style.zIndex = `${index + 1}`;
  }
}
