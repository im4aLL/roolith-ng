# Toggle Group

A segmented control that renders a list of buttons where one item can be active at a time. Supports horizontal, vertical, and block (full-width) layouts.

## Import

```ts
import { ToggleGroupComponent, IToggleGroupItem } from '@im4all/roolith-ng';
```

```ts
@Component({
  imports: [ToggleGroupComponent]
})
```

## Usage

### Basic

```ts
items = signal<IToggleGroupItem[]>([
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
]);
activeValue = signal<string | number>('day');

onToggleChange(item: IToggleGroupItem): void {
  this.activeValue.set(item.value);
}
```

```html
<rng-toggle-group
  [items]="items()"
  [value]="activeValue()"
  (valueChange)="onToggleChange($event)" />
```

### Vertical

```html
<rng-toggle-group
  [items]="items()"
  [value]="activeValue()"
  [vertical]="true"
  (valueChange)="onToggleChange($event)" />
```

### Block (full-width)

```html
<rng-toggle-group
  [items]="items()"
  [value]="activeValue()"
  [block]="true"
  (valueChange)="onToggleChange($event)" />
```

### Vertical + Block

```html
<rng-toggle-group
  [items]="items()"
  [value]="activeValue()"
  [vertical]="true"
  [block]="true"
  (valueChange)="onToggleChange($event)" />
```

---

## API

### Inputs

| Input      | Type                       | Default | Description                                  |
| ---------- | -------------------------- | ------- | -------------------------------------------- |
| `items`    | `IToggleGroupItem[]`       | `[]`    | List of items to render                      |
| `value`    | `string \| number \| null` | `null`  | Value of the currently active item           |
| `vertical` | `boolean`                  | `false` | Stack items vertically                       |
| `block`    | `boolean`                  | `false` | Stretch to full width with equal-width items |

### Outputs

| Output        | Payload            | Description                     |
| ------------- | ------------------ | ------------------------------- |
| `valueChange` | `IToggleGroupItem` | Emitted when an item is clicked |

### `IToggleGroupItem`

| Property | Type               | Description               |
| -------- | ------------------ | ------------------------- |
| `label`  | `string`           | Display text for the item |
| `value`  | `string \| number` | Unique identifier         |
