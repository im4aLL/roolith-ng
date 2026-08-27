import { Component, computed, signal, viewChild } from '@angular/core';
import {
  ButtonComponent,
  DatePickerInputComponent,
  FilterComponent,
  FilterEngine,
  FilterFieldTemplateDirective,
  IFilterableField,
  IFilterData,
} from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';
import type { DateTime } from 'luxon';

@Component({
  selector: 'rng-doc-filter',
  imports: [
    CodeBlock,
    DocPager,
    FilterComponent,
    FilterFieldTemplateDirective,
    ButtonComponent,
    DatePickerInputComponent,
  ],
  templateUrl: './filter.html',
  styleUrl: './filter.scss',
})
export class Filter {
  /**
   * Snippet for importing `FilterComponent`.
   */
  protected readonly importSnippet = `import { FilterComponent, IFilterableField, IFilterData } from '@im4all/roolith-ng';

@Component({
  imports: [FilterComponent]
})`;

  /**
   * Snippet for importing `FilterComponent` with the custom field directive.
   */
  protected readonly importWithDirectiveSnippet = `import { FilterComponent, FilterFieldTemplateDirective, IFilterData } from '@im4all/roolith-ng';

@Component({
  imports: [FilterComponent, FilterFieldTemplateDirective]
})`;

  /**
   * Basic `IFilterableField` setup.
   */
  protected readonly basicFieldsSnippet = `import { signal } from '@angular/core';
import { IFilterableField, IFilterData } from '@im4all/roolith-ng';

filterableFields = signal<IFilterableField[]>([
  { label: 'Name',   value: 'name',   type: 'string' },
  { label: 'Amount', value: 'amount', type: 'number' },
  { label: 'Date',   value: 'date',   type: 'date' },
]);

onFilterChange(filters: IFilterData[]): void {
  console.log(filters);
}`;

  /**
   * Basic template markup.
   */
  protected readonly basicSnippet = `<rng-filter
  [filterableFields]="filterableFields()"
  (changeEvent)="onFilterChange($event)" />`;

  /**
   * Pre-populated `value` - TS.
   */
  protected readonly prePopulatedTsSnippet = `import { signal } from '@angular/core';
import { IFilterData, IFilterableField } from '@im4all/roolith-ng';

filterableFields = signal<IFilterableField[]>([
  { label: 'Name', value: 'name', type: 'string' },
  { label: 'Amount', value: 'amount', type: 'number' },
]);

filters = signal<IFilterData[]>([
  { field: 'name', items: [{ filterType: 'contains', value: 'Acme' }] },
]);`;

  /**
   * Pre-populated template markup.
   */
  protected readonly prePopulatedSnippet = `<rng-filter
  [filterableFields]="filterableFields()"
  [value]="filters()"
  (changeEvent)="onFilterChange($event)" />`;

  /**
   * Global / any-field search - TS.
   */
  protected readonly globalSearchTsSnippet = `import { signal } from '@angular/core';
import { IFilterData } from '@im4all/roolith-ng';

filters = signal<IFilterData[]>([
  { field: '*', items: [{ filterType: 'contains', value: 'example' }] },
]);

onGlobalFilterRemove(): void {
  // clear the linked global search input here
}`;

  /**
   * Global template markup.
   */
  protected readonly globalSearchSnippet = `<rng-filter
  [filterableFields]="filterableFields()"
  [value]="filters()"
  (changeEvent)="onFilterChange($event)"
  (globalSearchRemoveEvent)="onGlobalFilterRemove()" />`;

  /**
   * Multiple conditions on the same field - handler payload.
   */
  protected readonly multipleConditionsSnippet = `// Received in changeEvent handler
[
  {
    field: 'amount',
    items: [
      { filterType: 'greaterThan', value: 100, operator: 'and' },
      { filterType: 'lessThanOrEqualTo', value: 500, operator: 'and' },
    ],
  },
];`;

  /**
   * Multiple conditions - explaining the `operator` field.
   */
  protected readonly operatorSnippet = `// Each item can carry an operator to combine with other items on the same field
{ filterType: 'greaterThan', value: 100, operator: 'and' }
{ filterType: 'lessThan', value: 500, operator: 'or' }`;

  /**
   * Custom field - mark the field with `hasTemplate`.
   */
  protected readonly customMarkSnippet = `import { signal } from '@angular/core';
import { IFilterableField } from '@im4all/roolith-ng';

filterableFields = signal<IFilterableField[]>([
  { label: 'Start Date', value: 'startDate', type: 'date', hasTemplate: true },
  { label: 'Name', value: 'name', type: 'string' },
]);`;

  /**
   * Custom field - directive import and `viewChild` wiring.
   */
  protected readonly customDirectiveSnippet = `import { viewChild } from '@angular/core';
import { FilterComponent, FilterFieldTemplateDirective, IFilterData } from '@im4all/roolith-ng';

private _filterRef = viewChild<FilterComponent>('filterEl');

addFilter(): void {
  const data: IFilterData = {
    field: 'startDate',
    items: [{ filterType: 'beforeOrEqualTo', value: '2024-06-06' }],
  };
  this._filterRef()?.addFilter(data);
}

cancelFilter(): void {
  this._filterRef()?.closeAddFilterPopover();
}`;

  /**
   * Custom field - component imports.
   */
  protected readonly customImportSnippet = `import { FilterComponent, FilterFieldTemplateDirective } from '@im4all/roolith-ng';

@Component({
  imports: [FilterComponent, FilterFieldTemplateDirective],
})`;

  /**
   * Custom field - template markup.
   */
  protected readonly customTemplateSnippet = `<rng-filter
  #filterEl
  [filterableFields]="filterableFields()"
  (changeEvent)="onFilterChange($event)">
  <ng-template rngFilterFieldTemplate="startDate">
    <rng-date-picker-input
      placeholder="From Date"
      (valueChange)="onFromDateChange($event)" />
    <rng-date-picker-input
      placeholder="To Date"
      (valueChange)="onToDateChange($event)" />

    <div class="rng-filter__action">
      <rng-button
        variant="dark"
        (clickEvent)="addFilter()">
        Add Filter
      </rng-button>
      <rng-button (clickEvent)="cancelFilter()">Cancel</rng-button>
    </div>
  </ng-template>
</rng-filter>`;

  /**
   * Full example - TS.
   */
  protected readonly fullSnippet = `import { signal, viewChild } from '@angular/core';
import { FilterComponent, FilterFieldTemplateDirective, IFilterableField, IFilterData } from '@im4all/roolith-ng';

export class ExampleComponent {
  filterableFields = signal<IFilterableField[]>([
    { label: 'Name', value: 'name', type: 'string' },
    { label: 'Amount', value: 'amount', type: 'number' },
    { label: 'Date', value: 'date', type: 'date' },
    { label: 'Start Date', value: 'startDate', type: 'date', hasTemplate: true },
  ]);

  filters = signal<IFilterData[]>([
    { field: 'name', items: [{ filterType: 'contains', value: 'Acme' }] },
  ]);

  private _filterRef = viewChild<FilterComponent>('filterEl');

  onFilterChange(filters: IFilterData[]): void {
    console.log(filters);
  }

  onGlobalRemove(): void {
    console.log('Global search removed');
  }

  addCustomFilter(from: string | null, to: string | null): void {
    const data: IFilterData = {
      field: 'startDate',
      items: [
        ...(from ? [{ filterType: 'afterOrEqualTo', value: from }] : []),
        ...(to ? [{ filterType: 'beforeOrEqualTo', value: to }] : []),
      ],
    };
    if (data.items.length) {
      this._filterRef()?.addFilter(data);
    }
  }

  cancelFilter(): void {
    this._filterRef()?.closeAddFilterPopover();
  }
}`;

  /**
   * Full example - template.
   */
  protected readonly fullTemplateSnippet = `<rng-filter
  #filterEl
  [filterableFields]="filterableFields()"
  [value]="filters()"
  (changeEvent)="onFilterChange($event)"
  (globalSearchRemoveEvent)="onGlobalRemove()">
  <ng-template rngFilterFieldTemplate="startDate">
    <rng-date-picker-input
      placeholder="From Date"
      (valueChange)="onFromDateChange($event)" />
    <rng-date-picker-input
      placeholder="To Date"
      (valueChange)="onToDateChange($event)" />
    <div class="rng-filter__action">
      <rng-button variant="dark" (clickEvent)="addCustomFilter()">Add Filter</rng-button>
      <rng-button (clickEvent)="cancelFilter()">Cancel</rng-button>
    </div>
  </ng-template>
</rng-filter>`;

  /**
   * FilterEngine - import.
   */
  protected readonly filterEngineImportSnippet = `import { FilterEngine, IFilterData } from '@im4all/roolith-ng';

// Generic over your row type
type Row = Record<string, unknown>;`;

  /**
   * FilterEngine - basic `contains` + `equals` (AND between groups).
   */
  protected readonly filterEngineBasicSnippet = `import { FilterEngine, IFilterData } from '@im4all/roolith-ng';

const items: Row[] = [
  { name: 'Alpha', status: 'active' },
  { name: 'Beta',  status: 'active' },
  { name: 'Alpha', status: 'inactive' },
];

const filters: IFilterData[] = [
  { field: 'name',   items: [{ filterType: 'contains', value: 'alp' }] },
  { field: 'status', items: [{ filterType: 'equals',   value: 'active' }] },
];

// Keeps only rows matching ALL groups
const filtered = new FilterEngine<Row>(filters).apply(items);
// -> [{ name: 'Alpha', status: 'active' }]`;

  /**
   * FilterEngine - wildcard `'*'` (global search) and same-field `or`/`and`.
   */
  protected readonly filterEngineWildcardSnippet = `// Global search - matches any field value
const globalFilters: IFilterData[] = [
  { field: '*', items: [{ filterType: 'contains', value: 'alp' }] },
];
new FilterEngine<Row>(globalFilters).apply(items);
// Matches Alpha rows regardless of field

// Same field with operator
const sameField: IFilterData[] = [
  {
    field: 'name',
    items: [
      { filterType: 'contains', value: 'alp' },
      { filterType: 'contains', value: 'beta', operator: 'or' },
    ],
  },
];
// -> rows where name contains 'alp' OR 'beta'`;

  /**
   * FilterEngine - full integration with `rng-filter`.
   */
  protected readonly filterEngineIntegrationSnippet = `import { Component, computed, signal } from '@angular/core';
import { FilterComponent, FilterEngine, IFilterData, IFilterableField } from '@im4all/roolith-ng';

@Component({
  imports: [FilterComponent]
})
export class ExampleComponent {
  filterableFields = signal<IFilterableField[]>([
    { label: 'Name', value: 'name', type: 'string' },
    { label: 'Status', value: 'status', type: 'string' },
  ]);

  items = signal<Row[]>([
    { name: 'Alpha', status: 'active' },
    { name: 'Beta',  status: 'inactive' },
    { name: 'Gamma', status: 'active' },
  ]);

  filters = signal<IFilterData[]>([]);

  filtered = computed(() => new FilterEngine<Row>(this.filters()).apply(this.items()));

  onFilterChange(filters: IFilterData[]): void {
    this.filters.set(filters);
  }

  onGlobalRemove(): void {
    // optional - clear external search input when '*' is removed
  }
}`;

  /**
   * FilterEngine - template wiring.
   */
  protected readonly filterEngineTemplateSnippet = `<rng-filter
  [filterableFields]="filterableFields()"
  (changeEvent)="onFilterChange($event)"
  (globalSearchRemoveEvent)="onGlobalRemove()" />

@for (row of filtered(); track row.name) {
  <div>{{ row.name }} - {{ row.status }}</div>
}`;

  protected readonly basicFields = signal<IFilterableField[]>([
    { label: 'Name', value: 'name', type: 'string' },
    { label: 'Amount', value: 'amount', type: 'number' },
    { label: 'Date', value: 'date', type: 'date' },
  ]);

  protected readonly prePopFields = signal<IFilterableField[]>([
    { label: 'Name', value: 'name', type: 'string' },
    { label: 'Amount', value: 'amount', type: 'number' },
    { label: 'Date', value: 'date', type: 'date' },
  ]);

  protected readonly preFilters = signal<IFilterData[]>([
    { field: 'name', items: [{ filterType: 'contains', value: 'Acme' }] },
  ]);

  protected readonly globalFields = signal<IFilterableField[]>([
    { label: 'Name', value: 'name', type: 'string' },
    { label: 'Amount', value: 'amount', type: 'number' },
  ]);

  protected readonly globalFilters = signal<IFilterData[]>([
    { field: '*', items: [{ filterType: 'contains', value: 'example' }] },
  ]);

  protected readonly customFields = signal<IFilterableField[]>([
    { label: 'Name', value: 'name', type: 'string' },
    { label: 'Amount', value: 'amount', type: 'number' },
    { label: 'Start Date', value: 'startDate', type: 'date', hasTemplate: true },
  ]);

  protected readonly fullFields = signal<IFilterableField[]>([
    { label: 'Name', value: 'name', type: 'string' },
    { label: 'Amount', value: 'amount', type: 'number' },
    { label: 'Date', value: 'date', type: 'date' },
    { label: 'Start Date', value: 'startDate', type: 'date', hasTemplate: true },
  ]);

  protected readonly fullFilters = signal<IFilterData[]>([
    { field: 'name', items: [{ filterType: 'contains', value: 'Acme' }] },
  ]);

  protected readonly engineFields = signal<IFilterableField[]>([
    { label: 'Name', value: 'name', type: 'string' },
    { label: 'Status', value: 'status', type: 'string' },
    { label: 'Category', value: 'category', type: 'string' },
  ]);

  protected readonly engineItems = signal<Record<string, unknown>[]>([
    { name: 'Alpha', status: 'active', category: 'A' },
    { name: 'Beta', status: 'inactive', category: 'B' },
    { name: 'Gamma', status: 'active', category: 'A' },
    { name: 'Delta', status: 'active', category: 'B' },
  ]);

  protected readonly engineFilters = signal<IFilterData[]>([]);

  protected readonly engineFiltered = computed<Record<string, unknown>[]>(() =>
    new FilterEngine<Record<string, unknown>>(this.engineFilters()).apply(this.engineItems()),
  );

  protected basicLastFilters = signal<IFilterData[] | null>(null);
  protected prePopLastFilters = signal<IFilterData[] | null>(null);
  protected globalLastFilters = signal<IFilterData[] | null>(null);
  protected globalRemovedCount = signal(0);
  protected customLastFilters = signal<IFilterData[] | null>(null);
  protected fullLastFilters = signal<IFilterData[] | null>(null);
  protected fullGlobalRemovedCount = signal(0);

  protected customFromDate = signal<string | null>(null);
  protected customToDate = signal<string | null>(null);
  protected fullFromDate = signal<string | null>(null);
  protected fullToDate = signal<string | null>(null);

  private _customFilterRef = viewChild<FilterComponent>('customFilterEl');
  private _fullFilterRef = viewChild<FilterComponent>('fullFilterEl');

  /**
   * Handles `changeEvent` from the basic demo.
   *
   * @param filters The updated filter list.
   *
   * @returns void
   */
  protected onBasicChange(filters: IFilterData[]): void {
    this.basicLastFilters.set(filters);
  }

  /**
   * Handles `changeEvent` from the pre-populated demo.
   *
   * @param filters The updated filter list.
   *
   * @returns void
   */
  protected onPrePopChange(filters: IFilterData[]): void {
    this.prePopLastFilters.set(filters);
  }

  /**
   * Handles `changeEvent` from the global search demo.
   *
   * @param filters The updated filter list.
   *
   * @returns void
   */
  protected onGlobalChange(filters: IFilterData[]): void {
    this.globalLastFilters.set(filters);
  }

  /**
   * Handles `globalSearchRemoveEvent` from the global search demo.
   *
   * @returns void
   */
  protected onGlobalRemove(): void {
    this.globalRemovedCount.update((count) => count + 1);
  }

  /**
   * Handles `changeEvent` from the custom template demo.
   *
   * @param filters The updated filter list.
   *
   * @returns void
   */
  protected onCustomChange(filters: IFilterData[]): void {
    this.customLastFilters.set(filters);
  }

  /**
   * Handles `valueChange` from the custom "From Date" picker.
   *
   * @param value The selected date as `DateTime` or `null`.
   *
   * @returns void
   */
  protected onCustomFromDateChange(value: DateTime | null): void {
    this.customFromDate.set(value?.toISODate() ?? null);
  }

  /**
   * Handles `valueChange` from the custom "To Date" picker.
   *
   * @param value The selected date as `DateTime` or `null`.
   *
   * @returns void
   */
  protected onCustomToDateChange(value: DateTime | null): void {
    this.customToDate.set(value?.toISODate() ?? null);
  }

  /**
   * Adds a custom `startDate` filter via the `FilterComponent` public API.
   *
   * Collects the current `customFromDate` / `customToDate` signals and calls `addFilter()`.
   * When neither date is set the popover is simply closed without adding a filter.
   *
   * @returns void
   */
  protected addCustomFilter(): void {
    const from = this.customFromDate();
    const to = this.customToDate();

    if (!from && !to) {
      this._customFilterRef()?.closeAddFilterPopover();
      return;
    }

    const items: IFilterData['items'] = [];

    if (from) {
      items.push({ filterType: 'afterOrEqualTo', value: from });
    }

    if (to) {
      items.push({ filterType: 'beforeOrEqualTo', value: to });
    }

    const data: IFilterData = {
      field: 'startDate',
      items,
    };

    this._customFilterRef()?.addFilter(data);
  }

  /**
   * Closes the custom add-filter popover without adding a filter.
   *
   * @returns void
   */
  protected cancelCustomFilter(): void {
    this._customFilterRef()?.closeAddFilterPopover();
  }

  /**
   * Handles `changeEvent` from the full example.
   *
   * @param filters The updated filter list.
   *
   * @returns void
   */
  protected onFullChange(filters: IFilterData[]): void {
    this.fullLastFilters.set(filters);
  }

  /**
   * Handles `globalSearchRemoveEvent` from the full example.
   *
   * @returns void
   */
  protected onFullGlobalRemove(): void {
    this.fullGlobalRemovedCount.update((count) => count + 1);
  }

  /**
   * Handles `valueChange` from the full example "From Date" picker.
   *
   * @param value The selected date.
   *
   * @returns void
   */
  protected onFullFromDateChange(value: DateTime | null): void {
    this.fullFromDate.set(value?.toISODate() ?? null);
  }

  /**
   * Handles `valueChange` from the full example "To Date" picker.
   *
   * @param value The selected date.
   *
   * @returns void
   */
  protected onFullToDateChange(value: DateTime | null): void {
    this.fullToDate.set(value?.toISODate() ?? null);
  }

  /**
   * Adds a `startDate` filter in the full example via the public `addFilter` API.
   *
   * @returns void
   */
  protected addFullCustomFilter(): void {
    const from = this.fullFromDate();
    const to = this.fullToDate();

    if (!from && !to) {
      this._fullFilterRef()?.closeAddFilterPopover();
      return;
    }

    const items: IFilterData['items'] = [];

    if (from) {
      items.push({ filterType: 'afterOrEqualTo', value: from });
    }

    if (to) {
      items.push({ filterType: 'beforeOrEqualTo', value: to });
    }

    const data: IFilterData = {
      field: 'startDate',
      items,
    };

    this._fullFilterRef()?.addFilter(data);
  }

  /**
   * Closes the full example popover without adding a filter.
   *
   * @returns void
   */
  protected cancelFullFilter(): void {
    this._fullFilterRef()?.closeAddFilterPopover();
  }

  /**
   * Handles `changeEvent` from the `FilterEngine` live demo.
   *
   * Syncs the engine's `filters` signal so `engineFiltered` recomputes via `FilterEngine.apply()`.
   *
   * @param filters The updated filter list.
   *
   * @returns void
   */
  protected onEngineFilterChange(filters: IFilterData[]): void {
    this.engineFilters.set(filters);
  }

  /**
   * Handles `globalSearchRemoveEvent` for the `FilterEngine` demo.
   *
   * @returns void
   */
  protected onEngineGlobalRemove(): void {
    // kept for parity with `globalSearchRemoveEvent` example - no extra work needed
  }

  /**
   * Formats `IFilterData[]` as pretty JSON for display in the demo.
   *
   * @param filters The filter list to format.
   *
   * @returns A JSON string or a placeholder when empty.
   */
  protected formatFilters(filters: IFilterData[] | null): string {
    if (!filters || filters.length === 0) {
      return '[]';
    }

    return JSON.stringify(filters, null, 2);
  }
}
