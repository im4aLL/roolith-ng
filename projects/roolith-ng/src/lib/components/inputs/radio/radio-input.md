# RadioInputComponent

`rng-radio-input` is a group of radio buttons. Supports inline layout, label, hint, validation state, and `FormValueControl` integration.

## Selector

```
rng-radio-input
```

---

## Inputs

| Input          | Type             | Default | Description                                  |
| -------------- | ---------------- | ------- | -------------------------------------------- |
| `options`      | `IRadioOption[]` | `[]`    | List of radio options                        |
| `label`        | `string \| null` | `null`  | Group label rendered above the radio buttons |
| `hint`         | `string \| null` | `null`  | Helper text shown below the group            |
| `name`         | `string`         | `''`    | Shared `name` attribute for the radio group  |
| `inline`       | `boolean`        | `false` | Displays options horizontally                |
| `error`        | `boolean`        | `false` | Applies error styling                        |
| `errorMessage` | `string \| null` | `null`  | Overrides `hint` when `error` is `true`      |
| `disabled`     | `boolean`        | `false` | Disables all radio buttons                   |
| `required`     | `boolean`        | `false` | Marks the group as required (ARIA)           |

## Models

| Model   | Type                       | Description                                   |
| ------- | -------------------------- | --------------------------------------------- |
| `value` | `string \| number \| null` | The currently selected option value (two-way) |

---

## `IRadioOption`

```ts
interface IRadioOption {
  label: string;
  value: string | number;
}
```

---

## Basic Usage

```html
<rng-radio-input
  [options]="options"
  label="Preferred contact"
  hint="We will only use this to reach you"
  [(value)]="selectedValue" />
```

```ts
options: IRadioOption[] = [
  { label: 'Email', value: 'email' },
  { label: 'Phone', value: 'phone' },
  { label: 'SMS', value: 'sms' },
];
```

---

## Inline Layout

```html
<rng-radio-input
  [options]="options"
  label="Size"
  [inline]="true"
  [(value)]="selectedSize" />
```

---

## With `FormField` (Signals Forms)

```html
<rng-radio-input
  [options]="options"
  label="Preferred contact"
  [formField]="form.controls.contact" />
```
