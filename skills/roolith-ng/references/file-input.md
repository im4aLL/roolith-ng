# FileInputComponent

`rng-file-input` is a styled file upload field. Supports single and multiple file selection, accept filters, and `FormValueControl` integration.

## Selector

```
rng-file-input
```

---

## Inputs

| Input          | Type             | Default | Description                                               |
| -------------- | ---------------- | ------- | --------------------------------------------------------- |
| `label`        | `string \| null` | `null`  | Field label rendered above the input                      |
| `hint`         | `string \| null` | `null`  | Helper text shown below the input                         |
| `name`         | `string`         | `''`    | Native `name` attribute                                   |
| `accept`       | `string`         | `''`    | Comma-separated list of accepted MIME types or extensions |
| `multiple`     | `boolean`        | `false` | Allows selecting multiple files at once                   |
| `error`        | `boolean`        | `false` | Applies error styling                                     |
| `errorMessage` | `string \| null` | `null`  | Overrides `hint` when `error` is `true`                   |
| `disabled`     | `boolean`        | `false` | Disables the input                                        |
| `required`     | `boolean`        | `false` | Marks the input as required (ARIA)                        |

## Models

| Model   | Type     | Description                            |
| ------- | -------- | -------------------------------------- |
| `value` | `File[]` | The currently selected files (two-way) |

## Outputs

| Output       | Type     | Description                        |
| ------------ | -------- | ---------------------------------- |
| `fileChange` | `File[]` | Emits the selected files on change |

---

## Basic Usage

```html
<rng-file-input
  label="Upload document"
  hint="Accepted formats: PDF, DOCX"
  accept=".pdf,.docx"
  (fileChange)="onFileChange($event)" />
```

---

## Multiple Files

```html
<rng-file-input
  label="Upload images"
  accept=".jpg,.png,.webp"
  [multiple]="true"
  [(value)]="selectedFiles" />
```

---

## With `FormField` (Signals Forms)

```html
<rng-file-input
  label="Attachment"
  [formField]="form.controls.attachment" />
```
