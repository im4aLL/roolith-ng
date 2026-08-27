import { Component } from '@angular/core';
import { IAccordionEvent, IMPORT_ACCORDION } from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-accordion',
  imports: [CodeBlock, DocPager, ...IMPORT_ACCORDION],
  templateUrl: './accordion.html',
  styleUrl: './accordion.scss',
})
export class Accordion {
  /**
   * Snippet for importing `IMPORT_ACCORDION`.
   */
  protected readonly importSnippet = `import { IMPORT_ACCORDION } from '@im4all/roolith-ng';

@Component({
  imports: [...IMPORT_ACCORDION]
})`;

  /**
   * Basic usage markup.
   */
  protected readonly basicSnippet = `<rng-accordion>
  <rng-accordion-item header="Item 1">Content of item 1.</rng-accordion-item>
  <rng-accordion-item header="Item 2">Content of item 2.</rng-accordion-item>
  <rng-accordion-item header="Item 3">Content of item 3.</rng-accordion-item>
</rng-accordion>`;

  /**
   * Bordered variant markup.
   */
  protected readonly borderedSnippet = `<rng-accordion [bordered]="true">
  <rng-accordion-item header="Item 1">Content of item 1.</rng-accordion-item>
  <rng-accordion-item header="Item 2">Content of item 2.</rng-accordion-item>
</rng-accordion>`;

  /**
   * Allow multiple items to be open.
   */
  protected readonly allowMultipleSnippet = `<rng-accordion [allowMultiple]="true">
  <rng-accordion-item header="Item 1">Content of item 1.</rng-accordion-item>
  <rng-accordion-item header="Item 2">Content of item 2.</rng-accordion-item>
</rng-accordion>`;

  /**
   * Disabled item markup.
   */
  protected readonly disabledSnippet = `<rng-accordion>
  <rng-accordion-item header="Item 1">Content of item 1.</rng-accordion-item>
  <rng-accordion-item
    header="Disabled Item"
    [disabled]="true">
    This item cannot be toggled.
  </rng-accordion-item>
</rng-accordion>`;

  /**
   * Pre-expanded item markup.
   */
  protected readonly expandedSnippet = `<rng-accordion>
  <rng-accordion-item header="Item 1">Content of item 1.</rng-accordion-item>
  <rng-accordion-item
    header="Item 2"
    [expanded]="true">
    This item starts expanded.
  </rng-accordion-item>
</rng-accordion>`;

  /**
   * Listening to `changeEvent` markup.
   */
  protected readonly changeEventSnippet = `<rng-accordion (changeEvent)="onAccordionChange($event)">
  <rng-accordion-item header="Item 1">Content of item 1.</rng-accordion-item>
  <rng-accordion-item header="Item 2">Content of item 2.</rng-accordion-item>
</rng-accordion>`;

  /**
   * Handler for the `changeEvent` output.
   */
  protected readonly changeEventTsSnippet = `onAccordionChange(event: IAccordionEvent): void {
  console.log(event.expanded);   // true | false
  console.log(event.itemIndex);  // 0-based index
  console.log(event.itemHeader); // header string of the toggled item
}`;

  /**
   * Full example combining inputs and output.
   */
  protected readonly fullSnippet = `<rng-accordion
  [bordered]="true"
  [allowMultiple]="true"
  (changeEvent)="onAccordionChange($event)">
  <rng-accordion-item header="Accordion Item 1">This is the content of Accordion Item 1.</rng-accordion-item>
  <rng-accordion-item header="Accordion Item 2">This is the content of Accordion Item 2.</rng-accordion-item>
  <rng-accordion-item
    header="Disabled Accordion Item"
    [disabled]="true">
    This content should not be visible because the accordion item is disabled.
  </rng-accordion-item>
</rng-accordion>`;

  protected lastEvent: IAccordionEvent | null = null;

  /**
   * Handles `changeEvent` from `rng-accordion` and stores the last event for the demo.
   *
   * @param event The accordion change event payload.
   *
   * @returns void
   */
  protected onAccordionChange(event: IAccordionEvent): void {
    this.lastEvent = event;
  }

  /**
   * Handles `changeEvent` from the bordered allow-multiple demo.
   *
   * @param event The accordion change event payload.
   *
   * @returns void
   */
  protected onFullChange(event: IAccordionEvent): void {
    this.lastEvent = event;
  }
}
