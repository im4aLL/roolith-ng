# SelectPlainComponent

`rng-select-plain` is a lightweight native `<select>` wrapper. Use it when a styled dropdown overlay is not needed — it renders the browser's native select with the shared label and hint layout.

## Selector

```
rng-select-plain
```

---

## Inputs

| Input          | Type                   | Default | Description                             |
| -------------- | ---------------------- | ------- | --------------------------------------- |
| `data`         | `ISelectPlainOption[]` | `[]`    | List of available options               |
| `label`        | `string \| null`       | `null`  | Field label rendered above the select   |
| `hint`         | `string \| null`       | `null`  | Helper text shown below the select      |
| `name`         | `string`               | `''`    | Native `name` attribute                 |
| `error`        | `boolean`              | `false` | Applies error styling                   |
| `errorMessage` | `string \| null`       | `null`  | Overrides `hint` when `error` is `true` |
| `disabled`     | `boolean`              | `false` | Disables the select                     |
| `required`     | `boolean`              | `false` | Marks the select as required (ARIA)     |

## Models

| Model   | Type                              | Description                                    |
| ------- | --------------------------------- | ---------------------------------------------- |
| `value` | `ISelectPlainOption \| undefined` | The currently selected item (two-way bindable) |

---

## `ISelectPlainOption`

```ts
interface ISelectPlainOption {
  value: string | number;
  label: string;
}
```

---

## Basic Usage

```html
<rng-select-plain
  [data]="options"
  label="Priority"
  hint="Select a priority level"
  [(value)]="selectedOption" />
```

---

## With `FormField` (Signals Forms)

```html
<rng-select-plain
  [data]="options"
  label="Priority"
  [formField]="form.controls.priority" />
```
