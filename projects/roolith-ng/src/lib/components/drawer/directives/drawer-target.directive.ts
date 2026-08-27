import { Directive, ElementRef, inject, input, OnInit } from '@angular/core';

@Directive({
  selector: '[rngDrawerTarget]',
})
export class DrawerTargetDirective implements OnInit {
  public rngDrawerTarget = input<string>('');

  private _element = inject(ElementRef);

  public ngOnInit(): void {
    this._setAttribute();
  }

  /**
   * Get the first child element of the host element, which is expected to be the dropdown trigger element.
   *
   * @returns HTMLElement | null
   */
  private _getFirstClickableElement(): HTMLElement | null {
    const element = this._element.nativeElement as HTMLElement;

    if (element.tagName === 'BUTTON' || element.tagName === 'A') {
      return element;
    }

    if (element.firstElementChild?.tagName !== 'BUTTON') {
      return element.firstElementChild?.querySelector('button') as HTMLElement | null;
    }

    return element.firstElementChild as HTMLElement | null;
  }

  /**
   * Set necessary attributes and classes to the dropdown trigger element to associate it with the dropdown component.
   *
   * @returns void
   */
  private _setAttribute(): void {
    const targetElement = this._getFirstClickableElement();

    if (!targetElement || !(targetElement instanceof HTMLElement)) {
      return;
    }

    targetElement.setAttribute('popovertarget', this.rngDrawerTarget());
  }
}
