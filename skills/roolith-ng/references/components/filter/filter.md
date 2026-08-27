# Filter

A composable filter bar that lets users add, display, and remove field-level filter conditions. Supports `string`, `number`, and `date` field types with type-appropriate filter operators.

## Import

```ts
import { FilterComponent, IFilterableField, IFilterData } from 'roolith-ng';
```

```ts
@Component({
  imports: [FilterComponent]
})
```

## Interfaces

### `IFilterableField`

Extends `ISelectInput` with a `type` discriminator.

| Property | Type               | Description                               |
| -------- | ------------------ | ----------------------------------------- |
| `label`  | `string`           | Human-readable field name shown in the UI |
| `value`  | `string`           | Field key used in filter data             |
| `type`   | `IFilterFieldType` | `'string' \| 'number' \| 'date'`          |

### `IFilterData`

Represents active filter conditions for a single field.

| Property | Type            | Description                                                                              |
| -------- | --------------- | ---------------------------------------------------------------------------------------- |
| `field`  | `string`        | Field key (matches `IFilterableField.value`). Use `'*'` for "any field" / global search. |
| `items`  | `IFilterItem[]` | One or more conditions on that field                                                     |

### `IFilterItem`

A single condition within a `IFilterData`.

| Property     | Type                                   | Description                                       |
| ------------ | -------------------------------------- | ------------------------------------------------- |
| `filterType` | `string`                               | Operator key (e.g. `'contains'`, `'equals'`)      |
| `value`      | `string \| number \| DateTime \| null` | The comparison value                              |
| `operator`   | `'and' \| 'or'` _(optional)_           | How to combine with other items (default `'and'`) |

### Supported `filterType` values

| Key                    | Label                    | Types          |
| ---------------------- | ------------------------ | -------------- |
| `contains`             | Contains                 | string         |
| `doesNotContain`       | Does not contain         | string         |
| `equals`               | Equals                   | string, number |
| `notEqualTo`           | Not equal to             | string, number |
| `startsWith`           | Starts with              | string         |
| `endsWith`             | Ends with                | string         |
| `isEmpty`              | Is empty                 | string, number |
| `isNotEmpty`           | Is not empty             | string, number |
| `greaterThan`          | Greater than             | number         |
| `greaterThanOrEqualTo` | Greater than or equal to | number         |
| `lessThan`             | Less than                | number         |
| `lessThanOrEqualTo`    | Less than or equal to    | number         |
| `before`               | Before                   | date           |
| `after`                | After                    | date           |

## Inputs

| Input              | Type                 | Required | Default | Description                                          |
| ------------------ | -------------------- | -------- | ------- | ---------------------------------------------------- |
| `filterableFields` | `IFilterableField[]` | yes      | —       | Fields the user can filter by                        |
| `value`            | `IFilterData[]`      | no       | `[]`    | Pre-populate the filter bar with existing conditions |

## Outputs

| Output                    | Payload         | Description                                                           |
| ------------------------- | --------------- | --------------------------------------------------------------------- |
| `changeEvent`             | `IFilterData[]` | Emits the full updated filter list on every add/remove                |
| `globalSearchRemoveEvent` | `void`          | Emits when a filter on the special `'*'` (any-field) field is removed |

## Usage

### Basic

```ts
import { signal } from '@angular/core';
import { IFilterableField, IFilterData } from 'roolith-ng';

filterableFields = signal<IFilterableField[]>([
  { label: 'Name',   value: 'name',   type: 'string' },
  { label: 'Amount', value: 'amount', type: 'number' },
  { label: 'Date',   value: 'date',   type: 'date'   },
]);

onFilterChange(filters: IFilterData[]): void {
  console.log(filters);
}
```

```html
<rng-filter
  [filterableFields]="filterableFields()"
  (changeEvent)="onFilterChange($event)" />
```

### Pre-populated filters

Pass an initial value to display existing conditions on load. The component merges incoming `value` changes into its internal state.

```ts
filters = signal<IFilterData[]>([{ field: 'name', items: [{ filterType: 'contains', value: 'Acme' }] }]);
```

```html
<rng-filter
  [filterableFields]="filterableFields()"
  [value]="filters()"
  (changeEvent)="onFilterChange($event)" />
```

### Global / any-field search

Use `field: '*'` to represent a cross-field search condition (e.g. a global search bar). When the user removes this condition the `globalSearchRemoveEvent` output fires so you can clear the linked search input.

```ts
filters = signal<IFilterData[]>([
  { field: '*', items: [{ filterType: 'contains', value: 'example' }] },
]);

onGlobalFilterRemove(): void {
  // clear global search input here
}
```

```html
<rng-filter
  [filterableFields]="filterableFields()"
  [value]="filters()"
  (changeEvent)="onFilterChange($event)"
  (globalSearchRemoveEvent)="onGlobalFilterRemove()" />
```

### Multiple conditions on the same field

`changeEvent` returns an array of `IFilterData`. Each field entry has an `items` array, so you can apply multiple conditions to the same field. The `operator` on each item controls how conditions are combined server-side.

```ts
// Received in changeEvent handler
[
  {
    field: 'amount',
    items: [
      { filterType: 'greaterThan', value: 100, operator: 'and' },
      { filterType: 'lessThanOrEqualTo', value: 500, operator: 'and' },
    ],
  },
];
```

### Custom field template

For fields that need a fully custom UI (e.g. a date range picker), mark the field with `hasTemplate: true` and project an `<ng-template>` with the `rngFilterFieldTemplate` directive.

**1. Mark the field**

```ts
import { signal } from '@angular/core';
import { IFilterableField } from 'roolith-ng';

filterableFields = signal<IFilterableField[]>([
  { label: 'Start Date', value: 'startDate', type: 'date', hasTemplate: true },
]);
```

**2. Import the directive and wire up public methods**

```ts
import { viewChild } from '@angular/core';
import { FilterComponent, FilterFieldTemplateDirective, IFilterData } from 'roolith-ng';

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
}
```

```ts
@Component({
  imports: [FilterComponent, FilterFieldTemplateDirective],
})
```

**3. Project the template**

```html
<rng-filter
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
</rng-filter>
```

**How it works:**

- When the user selects a field with `hasTemplate: true`, the add-filter popover renders your projected `<ng-template>` instead of the default input UI.
- Your template is responsible for collecting values and calling `addFilter()` on the `FilterComponent` instance via `viewChild`.
- Call `closeAddFilterPopover()` on cancel to dismiss the popover without adding a filter.

**Public methods on `FilterComponent`**

| Method                  | Signature                     | Description                             |
| ----------------------- | ----------------------------- | --------------------------------------- |
| `addFilter`             | `(data: IFilterData) => void` | Adds/merges a filter and closes popover |
| `closeAddFilterPopover` | `() => void`                  | Closes the add-filter popover           |
