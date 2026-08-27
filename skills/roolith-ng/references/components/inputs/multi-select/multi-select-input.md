# MultiSelectInputComponent

`rng-multi-select-input` is a multi-value select input. Selected items appear as removable chips. Supports search filtering, keyboard navigation, typeahead, custom option templates, and `FormValueControl` integration.

## Selector

```
rng-multi-select-input
```

---

## Inputs

| Input            | Type                        | Default | Description                                                         |
| ---------------- | --------------------------- | ------- | ------------------------------------------------------------------- |
| `data`           | `IMultiSelectInputOption[]` | `[]`    | List of available options                                           |
| `label`          | `string \| null`            | `null`  | Field label rendered above the input                                |
| `placeholder`    | `string`                    | `''`    | Placeholder shown when no items are selected                        |
| `hint`           | `string \| null`            | `null`  | Helper text shown below the input                                   |
| `error`          | `boolean`                   | `false` | Applies error styling                                               |
| `errorMessage`   | `string \| null`            | `null`  | Overrides `hint` when `error` is `true`                             |
| `name`           | `string`                    | `''`    | Native `name` attribute on the inner `<input>`                      |
| `searchable`     | `boolean`                   | `false` | Enables free-text filtering of options                              |
| `rightAligned`   | `boolean`                   | `false` | Aligns the dropdown to the right edge of the field                  |
| `dropdownWidth`  | `number \| null`            | `null`  | Minimum pixel width of the dropdown list                            |
| `maxChipsShown`  | `number`                    | `3`     | Max chips rendered before an overflow badge ("N more selected")     |
| `allowSelectAll` | `boolean`                   | `false` | Shows **Select All** / **Deselect All** buttons inside the dropdown |
| `disabled`       | `boolean`                   | `false` | Disables the field                                                  |
| `readonly`       | `boolean`                   | `false` | Makes the field read-only                                           |
| `required`       | `boolean`                   | `false` | Marks the field as required (ARIA)                                  |

## Models

| Model   | Type                        | Description                                     |
| ------- | --------------------------- | ----------------------------------------------- |
| `value` | `IMultiSelectInputOption[]` | The currently selected items (two-way bindable) |

## Content Projection

| Template ref                        | Description                                         |
| ----------------------------------- | --------------------------------------------------- |
| `#rngMultiSelectInputOptionTemplate` | Custom template for each option row in the dropdown |

---

## `IMultiSelectInputOption`

```ts
interface IMultiSelectInputOption {
  label: string;
  value: string | number | null;
  icon?: string;
  subtext?: string;
}
```

---

## Basic Usage

```html
<rng-multi-select-input
  [data]="countries"
  label="Countries"
  placeholder="Select countries…"
  [(value)]="selectedCountries" />
```

```ts
countries: IMultiSelectInputOption[] = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Canada', value: 'ca' },
  { label: 'Australia', value: 'au' },
];

selectedCountries: IMultiSelectInputOption[] = [];
```

---

## With Search Filtering

```html
<rng-multi-select-input
  [data]="countries"
  label="Countries"
  placeholder="Search and select…"
  [searchable]="true"
  [(value)]="selectedCountries" />
```

---

## With Error State

```html
<rng-multi-select-input
  [data]="countries"
  label="Countries"
  [error]="true"
  errorMessage="At least one country is required"
  [(value)]="selectedCountries" />
```

---

## Limit Visible Chips

By default 3 chips are shown before an overflow badge. Override with `maxChipsShown`:

```html
<rng-multi-select-input
  [data]="countries"
  label="Countries"
  [maxChipsShown]="2"
  [(value)]="selectedCountries" />
<!-- If 5 items are selected: 2 chips + "3 more selected" badge -->
```

---

## Select All / Deselect All

Set `[allowSelectAll]="true"` to show **Select All** and **Deselect All** buttons at the top of the dropdown.

- **Select All** — sets `value` to all items currently in `data`.
- **Deselect All** — clears `value`.

Both buttons respect the current `filteredData` list only when `searchable` is also enabled — Select All selects all items in `data`, not just the visible filtered subset.

```html
<rng-multi-select-input
  [data]="countries"
  label="Countries"
  [allowSelectAll]="true"
  [(value)]="selectedCountries" />
```

---

## Custom Option Template

Use `#rngMultiSelectInputOptionTemplate` to render a custom option row.

```html
<rng-multi-select-input
  [data]="countries"
  label="Countries"
  [(value)]="selectedCountries">
  <ng-template
    #rngMultiSelectInputOptionTemplate
    let-item>
    <i [class]="item.icon"></i>
    <strong>{{ item.label }}</strong>
  </ng-template>
</rng-multi-select-input>
```

---

## With `FormField` (Signals Forms)

```html
<rng-multi-select-input
  [data]="countries"
  label="Countries"
  [formField]="form.controls.countries" />
```
