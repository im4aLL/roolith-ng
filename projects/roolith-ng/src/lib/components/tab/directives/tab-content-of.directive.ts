import { Directive, inject, input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[rngTabContentOf]',
})
export class TabContentOfDirective {
  public rngTabContentOf = input<string | number>();
  public templateRef = inject(TemplateRef);
}
