# Filter Button Component

`rng-filter-button` is a popover-driven filter control that lets users select one or more items from a searchable list. It displays the active selection count as a badge and emits changes via `changeEvent`.

## Selector

```
rng-filter-button
```

## Import

```ts
import { FilterButtonComponent } from '@im4all/roolith-ng';
```

```ts
@Component({
  imports: [FilterButtonComponent]
})
```

## Interface

### `IFilterButtonItem`

| Property   | Type      | Required | Description                                   |
| ---------- | --------- | -------- | --------------------------------------------- |
| `label`    | `string`  | Yes      | Display text shown in the dropdown list       |
| `value`    | `string`  | Yes      | Unique identifier for the item                |
| `selected` | `boolean` | No       | Whether the item is initially selected        |
| `counter`  | `number`  | No       | Optional count to display alongside the label |

## Inputs

| Input                    | Type                  | Default | Description                                              |
| ------------------------ | --------------------- | ------- | -------------------------------------------------------- |
| `items`                  | `IFilterButtonItem[]` | `[]`    | Full list of selectable filter items                     |
| `maxSelectedItemsToShow` | `number`              | `2`     | Max number of selected labels shown inline in the button |

## Outputs

| Output        | Type                 | Description                                                                                                       |
| ------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `changeEvent` | `IFilterChangeEvent` | Emits an event object with a `type` (`'change'` or `'clear'`) and `payload` containing the current selected items |

### `IFilterChangeEvent`

| Property  | Type                  | Description                                                              |
| --------- | --------------------- | ------------------------------------------------------------------------ |
| `type`    | `'change' \| 'clear'` | `'change'` when an item is toggled, `'clear'` when all filters are reset |
| `payload` | `IFilterButtonItem[]` | The current array of selected items at time of emit                      |

## Content Projection

| Slot        | Description                        |
| ----------- | ---------------------------------- |
| _(default)_ | Label text shown inside the button |

## Basic Usage

```ts
import { IFilterButtonItem, IFilterChangeEvent } from '@im4all/roolith-ng';

public filterItems = signal<IFilterButtonItem[]>([
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Pending', value: 'pending' },
]);

public onFilterChange(event: IFilterChangeEvent): void {
  console.log(event.type);    // 'change' | 'clear'
  console.log(event.payload); // IFilterButtonItem[]
}
```

```html
<rng-filter-button
  [items]="filterItems()"
  (changeEvent)="onFilterChange($event)">
  Status
</rng-filter-button>
```

## Pre-selected Items

```ts
public filterItems = signal<IFilterButtonItem[]>([
  { label: 'Active', value: 'active', selected: true },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Pending', value: 'pending', selected: true },
]);
```

## With Item Counters

```ts
public filterItems = signal<IFilterButtonItem[]>([
  { label: 'Active', value: 'active', counter: 12 },
  { label: 'Inactive', value: 'inactive', counter: 4 },
  { label: 'Pending', value: 'pending', counter: 7 },
]);
```

```html
<rng-filter-button
  [items]="filterItems()"
  [maxSelectedItemsToShow]="1"
  (changeEvent)="onFilterChange($event)">
  Status
</rng-filter-button>
```
