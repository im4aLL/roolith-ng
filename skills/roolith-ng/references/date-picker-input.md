# DatePickerInputComponent

`rng-date-picker-input` is a date picker with a calendar popover. Uses Luxon `DateTime` as the value type and supports `FormValueControl` integration.

## Selector

```
rng-date-picker-input
```

---

## Inputs

| Input          | Type                    | Default             | Description                                  |
| -------------- | ----------------------- | ------------------- | -------------------------------------------- |
| `label`        | `string \| null`        | `null`              | Field label rendered above the input         |
| `placeholder`  | `string \| null`        | `null`              | Placeholder shown when no date is selected   |
| `hint`         | `string \| null`        | `null`              | Helper text shown below the input            |
| `name`         | `string`                | `''`                | Native `name` attribute                      |
| `format`       | `DateTimeFormatOptions` | `DateTime.DATE_MED` | Luxon format options for displaying the date |
| `error`        | `boolean`               | `false`             | Applies error styling                        |
| `errorMessage` | `string \| null`        | `null`              | Overrides `hint` when `error` is `true`      |
| `disabled`     | `boolean`               | `false`             | Disables the field                           |
| `required`     | `boolean`               | `false`             | Marks the field as required (ARIA)           |

## Models

| Model   | Type               | Description                                     |
| ------- | ------------------ | ----------------------------------------------- |
| `value` | `DateTime \| null` | The selected date as a Luxon DateTime (two-way) |

---

## Basic Usage

```html
<rng-date-picker-input
  label="Start date"
  placeholder="e.g. Jan 1, 2024"
  [(value)]="startDate" />
```

---

## Custom Display Format

```html
<rng-date-picker-input
  label="Date of birth"
  [format]="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
  [(value)]="birthDate" />
```

---

## With Error State

```html
<rng-date-picker-input
  label="Event date"
  [error]="true"
  errorMessage="Please select a valid date" />
```

---

## With `FormField` (Signals Forms)

```html
<rng-date-picker-input
  label="Start date"
  [formField]="form.controls.startDate" />
```
