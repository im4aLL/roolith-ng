# TimePickerInputComponent

`rng-time-picker-input` is a 12-hour time picker with AM/PM selector. Uses Luxon `DateTime` as the value type and supports `FormValueControl` integration.

## Selector

```
rng-time-picker-input
```

---

## Inputs

| Input          | Type             | Default | Description                             |
| -------------- | ---------------- | ------- | --------------------------------------- |
| `label`        | `string \| null` | `null`  | Field label rendered above the input    |
| `placeholder`  | `string \| null` | `null`  | Placeholder text                        |
| `hint`         | `string \| null` | `null`  | Helper text shown below the input       |
| `name`         | `string`         | `''`    | Native `name` attribute                 |
| `error`        | `boolean`        | `false` | Applies error styling                   |
| `errorMessage` | `string \| null` | `null`  | Overrides `hint` when `error` is `true` |
| `disabled`     | `boolean`        | `false` | Disables the input                      |
| `required`     | `boolean`        | `false` | Marks the input as required (ARIA)      |

## Models

| Model   | Type               | Description                                     |
| ------- | ------------------ | ----------------------------------------------- |
| `value` | `DateTime \| null` | The selected time as a Luxon DateTime (two-way) |

---

## Basic Usage

```html
<rng-time-picker-input
  label="Start time"
  hint="12-hour format"
  [(value)]="startTime" />
```

---

## With Error State

```html
<rng-time-picker-input
  label="Meeting time"
  [error]="true"
  errorMessage="Please select a valid time" />
```

---

## With `FormField` (Signals Forms)

```html
<rng-time-picker-input
  label="Start time"
  [formField]="form.controls.startTime" />
```
