import { Directive, inject, input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[rngFilterFieldTemplate]',
})
export class FilterFieldTemplateDirective {
  public rngFilterFieldTemplate = input<string>();
  public templateRef = inject(TemplateRef);
}
