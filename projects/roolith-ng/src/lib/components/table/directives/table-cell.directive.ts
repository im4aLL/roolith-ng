import { Directive, inject, input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[rngTableCell]',
})
export class TableCellDirective {
  public rngTableCell = input<string>();
  public templateRef = inject(TemplateRef);
}
