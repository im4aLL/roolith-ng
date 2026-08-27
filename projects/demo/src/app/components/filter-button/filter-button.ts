import { Component, signal } from '@angular/core';
import { FilterButtonComponent, IFilterButtonItem, IFilterChangeEvent } from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-filter-button',
  imports: [CodeBlock, DocPager, FilterButtonComponent],
  templateUrl: './filter-button.html',
  styleUrl: './filter-button.scss',
})
export class FilterButton {
  /**
   * Snippet for importing `FilterButtonComponent`.
   */
  protected readonly importSnippet = `import { FilterButtonComponent } from '@im4all/roolith-ng';

@Component({
  imports: [FilterButtonComponent]
})`;

  /**
   * Basic `IFilterButtonItem` setup.
   */
  protected readonly basicItemsSnippet = `import { signal } from '@angular/core';
import { IFilterButtonItem, IFilterChangeEvent } from '@im4all/roolith-ng';

filterItems = signal<IFilterButtonItem[]>([
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Pending', value: 'pending' },
]);

onFilterChange(event: IFilterChangeEvent): void {
  console.log(event.type);    // 'change' | 'clear'
  console.log(event.payload); // IFilterButtonItem[]
}`;

  /**
   * Basic template markup.
   */
  protected readonly basicSnippet = `<rng-filter-button
  [items]="filterItems()"
  (changeEvent)="onFilterChange($event)">
  Status
</rng-filter-button>`;

  /**
   * Handler for `changeEvent`.
   */
  protected readonly handlerSnippet = `import { IFilterChangeEvent } from '@im4all/roolith-ng';

onFilterChange(event: IFilterChangeEvent): void {
  console.log(event.type);    // 'change' | 'clear'
  console.log(event.payload); // IFilterButtonItem[]
}`;

  /**
   * Pre-selected items - mark `selected: true`.
   */
  protected readonly preSelectedSnippet = `filterItems = signal<IFilterButtonItem[]>([
  { label: 'Active', value: 'active', selected: true },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Pending', value: 'pending', selected: true },
]);`;

  /**
   * Template for pre-selected (same as basic).
   */
  protected readonly preSelectedTemplateSnippet = `<rng-filter-button
  [items]="filterItems()"
  (changeEvent)="onFilterChange($event)">
  Status
</rng-filter-button>`;

  /**
   * Items with `counter` values.
   */
  protected readonly counterSnippet = `filterItems = signal<IFilterButtonItem[]>([
  { label: 'Active', value: 'active', counter: 12 },
  { label: 'Inactive', value: 'inactive', counter: 4 },
  { label: 'Pending', value: 'pending', counter: 7 },
]);`;

  /**
   * Template with counters and custom `maxSelectedItemsToShow`.
   */
  protected readonly counterTemplateSnippet = `<rng-filter-button
  [items]="filterItems()"
  [maxSelectedItemsToShow]="1"
  (changeEvent)="onFilterChange($event)">
  Status
</rng-filter-button>`;

  /**
   * Limiting inline badges via `maxSelectedItemsToShow`.
   */
  protected readonly maxSnippet = `<!-- Shows at most 1 label - otherwise "n selected" -->
<rng-filter-button
  [items]="filterItems()"
  [maxSelectedItemsToShow]="1"
  (changeEvent)="onFilterChange($event)">
  Status
</rng-filter-button>

<!-- Default is 2 - when 3+ selected shows "3 selected" -->
<rng-filter-button
  [items]="filterItems()"
  [maxSelectedItemsToShow]="2"
  (changeEvent)="onFilterChange($event)">
  Status
</rng-filter-button>`;

  /**
   * Empty `items` disables the trigger button.
   */
  protected readonly disabledSnippet = `<rng-filter-button
  [items]="[]"
  (changeEvent)="onFilterChange($event)">
  Status
</rng-filter-button>
<!-- Button renders with rng-button--disabled and isDisabled() === true -->`;

  /**
   * Full example combining counters, pre-selected and custom `maxSelectedItemsToShow`.
   */
  protected readonly fullSnippet = `import { signal } from '@angular/core';
import { FilterButtonComponent, IFilterButtonItem, IFilterChangeEvent } from '@im4all/roolith-ng';

@Component({
  imports: [FilterButtonComponent]
})
export class ExampleComponent {
  filterItems = signal<IFilterButtonItem[]>([
    { label: 'Active', value: 'active', counter: 8, selected: true },
    { label: 'Inactive', value: 'inactive', counter: 3 },
    { label: 'Pending', value: 'pending', counter: 5 },
    { label: 'Archived', value: 'archived', counter: 2 },
    { label: 'Draft', value: 'draft', counter: 4 },
  ]);

  onFilterChange(event: IFilterChangeEvent): void {
    console.log(event.type, event.payload);
  }
}`;

  /**
   * Full template for the combined example.
   */
  protected readonly fullTemplateSnippet = `<rng-filter-button
  [items]="filterItems()"
  [maxSelectedItemsToShow]="2"
  (changeEvent)="onFilterChange($event)">
  Status
</rng-filter-button>`;

  protected readonly basicItems = signal<IFilterButtonItem[]>([
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Pending', value: 'pending' },
  ]);

  protected readonly preSelectedItems = signal<IFilterButtonItem[]>([
    { label: 'Active', value: 'active', selected: true },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Pending', value: 'pending', selected: true },
  ]);

  protected readonly counterItems = signal<IFilterButtonItem[]>([
    { label: 'Active', value: 'active', counter: 12 },
    { label: 'Inactive', value: 'inactive', counter: 4 },
    { label: 'Pending', value: 'pending', counter: 7 },
  ]);

  protected readonly maxShowItems = signal<IFilterButtonItem[]>([
    { label: 'Draft', value: 'draft', selected: true },
    { label: 'Active', value: 'active', selected: true },
    { label: 'Pending', value: 'pending', selected: true },
    { label: 'Archived', value: 'archived' },
  ]);

  protected readonly fullItems = signal<IFilterButtonItem[]>([
    { label: 'Active', value: 'active', counter: 8, selected: true },
    { label: 'Inactive', value: 'inactive', counter: 3 },
    { label: 'Pending', value: 'pending', counter: 5 },
    { label: 'Archived', value: 'archived', counter: 2 },
    { label: 'Draft', value: 'draft', counter: 4 },
  ]);

  protected readonly emptyItems = signal<IFilterButtonItem[]>([]);

  protected basicLastEvent = signal<IFilterChangeEvent | null>(null);
  protected preSelectedLastEvent = signal<IFilterChangeEvent | null>(null);
  protected counterLastEvent = signal<IFilterChangeEvent | null>(null);
  protected maxShowLastEvent = signal<IFilterChangeEvent | null>(null);
  protected fullLastEvent = signal<IFilterChangeEvent | null>(null);

  /**
   * Handles `changeEvent` from the basic demo.
   *
   * @param event The filter change event with `type` and `payload`.
   *
   * @returns void
   */
  protected onBasicChange(event: IFilterChangeEvent): void {
    this.basicLastEvent.set(event);
  }

  /**
   * Handles `changeEvent` from the pre-selected demo.
   *
   * @param event The filter change event.
   *
   * @returns void
   */
  protected onPreSelectedChange(event: IFilterChangeEvent): void {
    this.preSelectedLastEvent.set(event);
  }

  /**
   * Handles `changeEvent` from the counter demo.
   *
   * @param event The filter change event.
   *
   * @returns void
   */
  protected onCounterChange(event: IFilterChangeEvent): void {
    this.counterLastEvent.set(event);
  }

  /**
   * Handles `changeEvent` from the `maxSelectedItemsToShow` demo.
   *
   * @param event The filter change event.
   *
   * @returns void
   */
  protected onMaxShowChange(event: IFilterChangeEvent): void {
    this.maxShowLastEvent.set(event);
  }

  /**
   * Handles `changeEvent` from the full example.
   *
   * @param event The filter change event.
   *
   * @returns void
   */
  protected onFullChange(event: IFilterChangeEvent): void {
    this.fullLastEvent.set(event);
  }

  /**
   * Formats `IFilterChangeEvent` as pretty JSON for display.
   *
   * @param event The event to format.
   *
   * @returns A JSON string or a placeholder when `null`.
   */
  protected formatEvent(event: IFilterChangeEvent | null): string {
    if (!event) {
      return 'null';
    }

    return JSON.stringify(event, null, 2);
  }

  /**
   * Formats just the `payload` array as pretty JSON.
   *
   * @param event The event whose payload to format.
   *
   * @returns A JSON string of the selected items.
   */
  protected formatPayload(event: IFilterChangeEvent | null): string {
    if (!event) {
      return '[]';
    }

    return JSON.stringify(event.payload, null, 2);
  }
}
