# TextareaInputComponent

`rng-textarea-input` is a multi-line text input. Supports auto-resize, character count, max-length enforcement, label, hint, validation state, and `FormValueControl` integration.

## Selector

```
rng-textarea-input
```

---

## Inputs

| Input           | Type                  | Default     | Description                                                                          |
| --------------- | --------------------- | ----------- | ------------------------------------------------------------------------------------ |
| `label`         | `string \| null`      | `null`      | Field label rendered above the textarea                                              |
| `placeholder`   | `string \| null`      | `null`      | Placeholder text                                                                     |
| `hint`          | `string \| null`      | `null`      | Helper text shown below the textarea                                                 |
| `name`          | `string`              | `''`        | Native `name` attribute                                                              |
| `rows`          | `number`              | `4`         | Initial number of visible rows                                                       |
| `autoResize`    | `boolean`             | `false`     | When `true`, the textarea grows to fit its content and disables manual resize        |
| `maxLength`     | `number \| undefined` | `undefined` | Hard character limit — input is capped at this length. Also shows `x / max` counter. |
| `showCharCount` | `boolean`             | `false`     | Shows a character counter even when no `maxLength` is set                            |
| `error`         | `boolean`             | `false`     | Applies error styling                                                                |
| `errorMessage`  | `string \| null`      | `null`      | Overrides `hint` when `error` is `true`                                              |
| `disabled`      | `boolean`             | `false`     | Disables the textarea                                                                |
| `readonly`      | `boolean`             | `false`     | Makes the textarea read-only                                                         |
| `required`      | `boolean`             | `false`     | Marks the textarea as required (ARIA)                                                |

## Models

| Model   | Type     | Description                               |
| ------- | -------- | ----------------------------------------- |
| `value` | `string` | The current text value (two-way bindable) |

---

## Basic Usage

```html
<rng-textarea-input
  label="Description"
  placeholder="Enter a description…"
  hint="Keep it concise"
  [(value)]="description" />
```

---

## Character Count (no limit)

Shows a live counter below the textarea without enforcing a limit.

```html
<rng-textarea-input
  label="Notes"
  [showCharCount]="true"
  [(value)]="notes" />
```

---

## Max Length

Enforces a hard character cap and displays an `x / max` counter. The counter turns red when the limit is reached.

```html
<rng-textarea-input
  label="Bio"
  [maxLength]="500"
  [(value)]="bio" />
```

---

## Auto Resize

The textarea grows vertically to fit its content. Manual resize handle is hidden.

```html
<rng-textarea-input
  label="Notes"
  [autoResize]="true"
  [(value)]="notes" />
```

---

## Auto Resize + Max Length

```html
<rng-textarea-input
  label="Summary"
  [autoResize]="true"
  [maxLength]="300"
  [(value)]="summary" />
```

---

## Custom Row Count

```html
<rng-textarea-input
  label="Bio"
  [rows]="8"
  [(value)]="bio" />
```

---

## With Error State

```html
<rng-textarea-input
  label="Description"
  [error]="true"
  errorMessage="Description is required" />
```

---

## With `FormField` (Signals Forms)

```html
<rng-textarea-input
  label="Description"
  [formField]="form.controls.description" />
```

---

## With `FormField` (Signals Forms)

```html
<rng-textarea-input
  label="Description"
  [formField]="form.controls.description" />
```
