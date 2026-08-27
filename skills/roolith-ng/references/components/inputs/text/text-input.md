# TextInputComponent

`rng-text-input` is a single-line text input. Supports multiple input types, validation state, label, hint, and `FormValueControl` integration.

## Selector

```
rng-text-input
```

---

## Inputs

| Input          | Type                                          | Default     | Description                                |
| -------------- | --------------------------------------------- | ----------- | ------------------------------------------ |
| `label`        | `string \| null`                              | `null`      | Field label rendered above the input       |
| `placeholder`  | `string \| null`                              | `null`      | Placeholder text                           |
| `hint`         | `string \| null`                              | `null`      | Helper text shown below the input          |
| `type`         | `'text' \| 'password' \| 'email' \| 'hidden'` | `'text'`    | Native input type                          |
| `name`         | `string`                                      | `''`        | Native `name` attribute                    |
| `error`        | `boolean`                                     | `false`     | Applies error styling                      |
| `errorMessage` | `string \| null`                              | `null`      | Overrides `hint` when `error` is `true`    |
| `disabled`     | `boolean`                                     | `false`     | Disables the input                         |
| `readonly`     | `boolean`                                     | `false`     | Makes the input read-only                  |
| `required`     | `boolean`                                     | `false`     | Marks the input as required (ARIA)         |
| `minLength`    | `number \| undefined`                         | `undefined` | Minimum character length (form validation) |
| `maxLength`    | `number \| undefined`                         | `undefined` | Maximum character length (form validation) |
| `pattern`      | `readonly RegExp[]`                           | `[]`        | Regex patterns for form validation         |

## Models

| Model   | Type     | Description                                |
| ------- | -------- | ------------------------------------------ |
| `value` | `string` | The current input value (two-way bindable) |

---

## Basic Usage

```html
<rng-text-input
  label="Full name"
  placeholder="e.g. John Doe"
  hint="As it appears on your passport"
  [(value)]="name" />
```

---

## With Error State

```html
<rng-text-input
  label="Email"
  type="email"
  [error]="true"
  errorMessage="Please enter a valid email address" />
```

---

## Password Input

```html
<rng-text-input
  label="Password"
  type="password"
  placeholder="Enter your password" />
```

---

## Disabled

```html
<rng-text-input
  label="Username"
  [disabled]="true"
  value="johndoe" />
```

---

## With `FormField` (Signals Forms)

```html
<rng-text-input
  label="Full name"
  [formField]="form.controls.name" />
```
