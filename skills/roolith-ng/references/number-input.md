# NumberInputComponent

`rng-number-input` is a numeric input field. Supports min/max/step constraints, validation state, label, hint, and `FormValueControl` integration.

## Selector

```
rng-number-input
```

---

## Inputs

| Input          | Type                  | Default     | Description                             |
| -------------- | --------------------- | ----------- | --------------------------------------- |
| `label`        | `string \| null`      | `null`      | Field label rendered above the input    |
| `placeholder`  | `string \| null`      | `null`      | Placeholder text                        |
| `hint`         | `string \| null`      | `null`      | Helper text shown below the input       |
| `name`         | `string`              | `''`        | Native `name` attribute                 |
| `min`          | `number \| undefined` | `undefined` | Minimum allowed value                   |
| `max`          | `number \| undefined` | `undefined` | Maximum allowed value                   |
| `step`         | `number`              | `1`         | Step increment for the input            |
| `error`        | `boolean`             | `false`     | Applies error styling                   |
| `errorMessage` | `string \| null`      | `null`      | Overrides `hint` when `error` is `true` |
| `disabled`     | `boolean`             | `false`     | Disables the input                      |
| `readonly`     | `boolean`             | `false`     | Makes the input read-only               |
| `required`     | `boolean`             | `false`     | Marks the input as required (ARIA)      |

## Models

| Model   | Type             | Description                                              |
| ------- | ---------------- | -------------------------------------------------------- |
| `value` | `number \| null` | The current value (two-way bindable). `null` when empty. |

---

## Basic Usage

```html
<rng-number-input
  label="Quantity"
  placeholder="0"
  [(value)]="quantity" />
```

---

## With Min / Max / Step

```html
<rng-number-input
  label="Rating"
  [min]="1"
  [max]="10"
  [step]="0.5"
  [(value)]="rating" />
```

---

## With Error State

```html
<rng-number-input
  label="Age"
  [error]="true"
  errorMessage="Age must be a positive number" />
```

---

## With `FormField` (Signals Forms)

```html
<rng-number-input
  label="Quantity"
  [formField]="form.controls.quantity" />
```
