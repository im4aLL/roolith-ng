# SearchInputComponent

`rng-search-input` is a search field with a debounced `debouncedChange` output and a clear button. It does not implement `FormValueControl` — it is intended for use as a standalone UI search control.

## Selector

```
rng-search-input
```

---

## Inputs

| Input           | Type      | Default | Description                                                                        |
| --------------- | --------- | ------- | ---------------------------------------------------------------------------------- |
| `debouncedTime` | `number`  | `250`   | Debounce delay in ms before `valueChange` emits. Set to `0` to disable debouncing. |
| `disabled`      | `boolean` | `false` | Disables the input                                                                 |

## Models

| Model   | Type             | Description                       |
| ------- | ---------------- | --------------------------------- |
| `value` | `string \| null` | The current search text (two-way) |

## Outputs

| Output            | Type     | Description                               |
| ----------------- | -------- | ----------------------------------------- |
| `debouncedChange` | `string` | Emits the debounced search value on input |

---

## Basic Usage

```html
<rng-search-input (debouncedChange)="onSearch($event)" />
```

---

## With Custom Debounce

```html
<rng-search-input
  [debouncedTime]="500"
  (debouncedChange)="onSearch($event)" />
```

---

## No Debounce

```html
<rng-search-input
  [debouncedTime]="0"
  (debouncedChange)="onSearch($event)" />
```

---

## Two-Way Binding

```html
<rng-search-input [(value)]="searchQuery" />
```
