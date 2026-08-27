# SelectInputComponent

`rng-select-input` is a single-value dropdown select. Supports search filtering, keyboard navigation, typeahead, a clear button, custom option templates, and `FormValueControl` integration.

## Selector

```
rng-select-input
```

---

## Inputs

| Input           | Type             | Default | Description                                        |
| --------------- | ---------------- | ------- | -------------------------------------------------- |
| `data`          | `ISelectInput[]` | `[]`    | List of available options                          |
| `label`         | `string \| null` | `null`  | Field label rendered above the input               |
| `placeholder`   | `string`         | `''`    | Placeholder shown when no value is selected        |
| `hint`          | `string \| null` | `null`  | Helper text shown below the input                  |
| `name`          | `string`         | `''`    | Native `name` attribute on the inner `<input>`     |
| `searchable`    | `boolean`        | `false` | Enables free-text filtering of options             |
| `showClear`     | `boolean`        | `false` | Shows a clear button when a value is selected      |
| `rightAligned`  | `boolean`        | `false` | Aligns the dropdown to the right edge of the field |
| `dropdownWidth` | `number \| null` | `null`  | Minimum pixel width of the dropdown list           |
| `error`         | `boolean`        | `false` | Applies error styling                              |
| `errorMessage`  | `string \| null` | `null`  | Overrides `hint` when `error` is `true`            |
| `disabled`      | `boolean`        | `false` | Disables the field                                 |
| `readonly`      | `boolean`        | `false` | Makes the field read-only                          |
| `required`      | `boolean`        | `false` | Marks the field as required (ARIA)                 |

## Models

| Model   | Type                        | Description                                    |
| ------- | --------------------------- | ---------------------------------------------- |
| `value` | `ISelectInput \| undefined` | The currently selected item (two-way bindable) |

## Content Projection

| Template ref                   | Description                                         |
| ------------------------------ | --------------------------------------------------- |
| `#rngSelectInputOptionTemplate` | Custom template for each option row in the dropdown |

---

## `ISelectInput`

```ts
interface ISelectInput {
  label: string;
  value: string | number | null;
  icon?: string;
  subtext?: string;
}
```

---

## Basic Usage

```html
<rng-select-input
  [data]="options"
  label="Status"
  placeholder="Select a status…"
  [(value)]="selectedOption" />
```

---

## Searchable

```html
<rng-select-input
  [data]="options"
  label="Country"
  placeholder="Search and select…"
  [searchable]="true"
  [(value)]="selectedOption" />
```

---

## With Clear Button

```html
<rng-select-input
  [data]="options"
  label="Category"
  [showClear]="true"
  [(value)]="selectedOption" />
```

---

## Custom Option Template

```html
<rng-select-input
  [data]="options"
  label="Project"
  [(value)]="selectedOption">
  <ng-template
    #rngSelectInputOptionTemplate
    let-item>
    <div class="rng-input-list__item-content">
      <div class="rng-input-list__item-content-hl">{{ item.label }}</div>
      <div class="rng-input-list__item-content-body">{{ item.subtext }}</div>
    </div>
  </ng-template>
</rng-select-input>
```

---

## With `FormField` (Signals Forms)

```html
<rng-select-input
  [data]="options"
  label="Status"
  [formField]="form.controls.status" />
```
