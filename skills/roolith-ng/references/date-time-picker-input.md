# DateTimePickerInputComponent

`rng-date-time-picker-input` combines a calendar date picker and a 12-hour time selector into a single field. Selecting a date closes the popover; time is adjusted inline in the same panel. Uses Luxon `DateTime` as the value type and supports `FormValueControl` integration.

## Selector

```
rng-date-time-picker-input
```

---

## Inputs

| Input          | Type                    | Default             | Description                                                        |
| -------------- | ----------------------- | ------------------- | ------------------------------------------------------------------ |
| `label`        | `string \| null`        | `null`              | Field label rendered above the input                               |
| `placeholder`  | `string \| null`        | `null`              | Placeholder shown when no date/time is selected                    |
| `hint`         | `string \| null`        | `null`              | Helper text shown below the input                                  |
| `name`         | `string`                | `''`                | Native `name` attribute                                            |
| `format`       | `DateTimeFormatOptions` | `DateTime.DATE_MED` | Luxon format options used to display the date portion in the field |
| `error`        | `boolean`               | `false`             | Applies error styling                                              |
| `errorMessage` | `string \| null`        | `null`              | Overrides `hint` when `error` is `true`                            |
| `disabled`     | `boolean`               | `false`             | Disables the field                                                 |
| `readonly`     | `boolean`               | `false`             | Makes the field read-only                                          |
| `required`     | `boolean`               | `false`             | Marks the field as required (ARIA)                                 |

## Models

| Model   | Type               | Description                                                                                                                                       |
| ------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value` | `DateTime \| null` | The selected date + time as a Luxon DateTime (two-way). When only a date is selected and no time has been chosen, defaults to midnight (`00:00`). |

---

## Basic Usage

```html
<rng-date-time-picker-input
  label="Schedule"
  placeholder="Select date and time…"
  [(value)]="scheduledAt" />
```

---

## Custom Date Format

```html
<rng-date-time-picker-input
  label="Appointment"
  [format]="{ year: 'numeric', month: '2-digit', day: '2-digit' }"
  [(value)]="appointmentAt" />
```

---

## With Error State

```html
<rng-date-time-picker-input
  label="Schedule"
  [error]="true"
  errorMessage="Please select a valid date and time" />
```

---

## Pre-set Value

When `[value]` is bound externally, both the calendar and the time selectors initialize from it:

```html
<rng-date-time-picker-input
  label="Start date & time"
  [value]="existingDateTime" />
```

---

## With `FormField` (Signals Forms)

```html
<rng-date-time-picker-input
  label="Schedule"
  [formField]="form.controls.scheduledAt" />
```
