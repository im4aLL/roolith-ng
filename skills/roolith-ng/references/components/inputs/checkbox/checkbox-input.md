# CheckboxInputComponent

`rng-checkbox-input` is a styled checkbox. Supports standalone mode (no label), indeterminate state, and `FormCheckboxControl` integration.

## Selector

```
rng-checkbox-input
```

---

## Inputs

| Input        | Type      | Default | Description                                                    |
| ------------ | --------- | ------- | -------------------------------------------------------------- |
| `name`       | `string`  | `''`    | Native `name` attribute                                        |
| `standalone` | `boolean` | `false` | Renders the checkbox without a label wrapper (icon-only style) |
| `error`      | `boolean` | `false` | Applies error styling                                          |
| `disabled`   | `boolean` | `false` | Disables the checkbox                                          |
| `required`   | `boolean` | `false` | Marks the checkbox as required (ARIA)                          |

## Models

| Model           | Type      | Description                                                     |
| --------------- | --------- | --------------------------------------------------------------- |
| `checked`       | `boolean` | Whether the checkbox is checked (two-way)                       |
| `indeterminate` | `boolean` | Indeterminate state — auto-clears when `checked` becomes `true` |

## Outputs

| Output          | Type      | Description                           |
| --------------- | --------- | ------------------------------------- |
| `checkedChange` | `boolean` | Emits the new checked state on change |

## Content Projection

| Slot        | Description                                 |
| ----------- | ------------------------------------------- |
| _(default)_ | Label text or rich HTML beside the checkbox |

---

## Basic Usage

```html
<rng-checkbox-input [(checked)]="isAgreed">
  I agree with the
  <a href="/terms">terms and conditions</a>
</rng-checkbox-input>
```

---

## Standalone (No Label)

```html
<rng-checkbox-input
  [checked]="true"
  [standalone]="true" />
```

---

## Indeterminate State

```html
<rng-checkbox-input
  [checked]="false"
  [standalone]="true"
  [indeterminate]="true" />
```

---

## With `FormField` (Signals Forms)

```html
<rng-checkbox-input [formField]="form.controls.agreed">Accept terms</rng-checkbox-input>
```
