# SwitchInputComponent

`rng-switch-input` is a toggle switch. Supports label, hint, validation state, and `FormValueControl` integration.

## Selector

```
rng-switch-input
```

---

## Inputs

| Input          | Type             | Default | Description                             |
| -------------- | ---------------- | ------- | --------------------------------------- |
| `label`        | `string \| null` | `null`  | Label rendered beside the toggle        |
| `hint`         | `string \| null` | `null`  | Helper text shown below the switch      |
| `name`         | `string`         | `''`    | Native `name` attribute                 |
| `error`        | `boolean`        | `false` | Applies error styling to the hint       |
| `errorMessage` | `string \| null` | `null`  | Overrides `hint` when `error` is `true` |
| `disabled`     | `boolean`        | `false` | Disables the switch                     |
| `readonly`     | `boolean`        | `false` | Makes the switch read-only              |
| `required`     | `boolean`        | `false` | Marks the switch as required (ARIA)     |

## Models

| Model   | Type      | Description                        |
| ------- | --------- | ---------------------------------- |
| `value` | `boolean` | Whether the switch is on (two-way) |

## Outputs

| Output          | Type      | Description                   |
| --------------- | --------- | ----------------------------- |
| `checkedChange` | `boolean` | Emits the new state on change |

---

## Basic Usage

```html
<rng-switch-input
  label="Enable notifications"
  [(value)]="isEnabled" />
```

---

## With Hint

```html
<rng-switch-input
  label="Dark mode"
  hint="Applies to the entire application"
  [(value)]="isDarkMode" />
```

---

## Disabled

```html
<rng-switch-input
  label="Feature flag"
  [disabled]="true"
  [value]="true" />
```

---

## With `FormField` (Signals Forms)

```html
<rng-switch-input
  label="Enable notifications"
  [formField]="form.controls.notifications" />
```
