# Accordion

## Import

```ts
import { IMPORT_ACCORDION } from '@im4all/roolith-ng';
```

```ts
@Component({
  imports: [...IMPORT_ACCORDION]
})
```

## Usage

### Basic

```html
<rng-accordion>
  <rng-accordion-item header="Item 1">Content of item 1.</rng-accordion-item>
  <rng-accordion-item header="Item 2">Content of item 2.</rng-accordion-item>
  <rng-accordion-item header="Item 3">Content of item 3.</rng-accordion-item>
</rng-accordion>
```

### Bordered

```html
<rng-accordion [bordered]="true">
  <rng-accordion-item header="Item 1">Content of item 1.</rng-accordion-item>
  <rng-accordion-item header="Item 2">Content of item 2.</rng-accordion-item>
</rng-accordion>
```

### Allow multiple items open

By default only one item can be expanded at a time. Set `allowMultiple` to allow multiple items to be open simultaneously.

```html
<rng-accordion [allowMultiple]="true">
  <rng-accordion-item header="Item 1">Content of item 1.</rng-accordion-item>
  <rng-accordion-item header="Item 2">Content of item 2.</rng-accordion-item>
</rng-accordion>
```

### Disabled item

```html
<rng-accordion>
  <rng-accordion-item header="Item 1">Content of item 1.</rng-accordion-item>
  <rng-accordion-item
    header="Disabled Item"
    [disabled]="true">
    This item cannot be toggled.
  </rng-accordion-item>
</rng-accordion>
```

### Pre-expanded item

```html
<rng-accordion>
  <rng-accordion-item header="Item 1">Content of item 1.</rng-accordion-item>
  <rng-accordion-item
    header="Item 2"
    [expanded]="true">
    This item starts expanded.
  </rng-accordion-item>
</rng-accordion>
```

### Listening to change events

`changeEvent` on `rng-accordion` fires whenever any item is toggled and provides the index, header, and expanded state of the affected item.

```html
<rng-accordion (changeEvent)="onAccordionChange($event)">
  <rng-accordion-item header="Item 1">Content of item 1.</rng-accordion-item>
  <rng-accordion-item header="Item 2">Content of item 2.</rng-accordion-item>
</rng-accordion>
```

```ts
onAccordionChange(event: IAccordionEvent): void {
  console.log(event.expanded);   // true | false
  console.log(event.itemIndex);  // 0-based index
  console.log(event.itemHeader); // header string of the toggled item
}
```

### Full example

```html
<rng-accordion
  [bordered]="true"
  [allowMultiple]="true"
  (changeEvent)="onAccordionChange($event)">
  <rng-accordion-item header="Accordion Item 1">This is the content of Accordion Item 1.</rng-accordion-item>
  <rng-accordion-item header="Accordion Item 2">This is the content of Accordion Item 2.</rng-accordion-item>
  <rng-accordion-item
    header="Disabled Accordion Item"
    [disabled]="true">
    This content should not be visible because the accordion item is disabled.
  </rng-accordion-item>
</rng-accordion>
```

## API

### `rng-accordion` Inputs

| Input           | Type      | Required | Default | Description                                          |
| --------------- | --------- | -------- | ------- | ---------------------------------------------------- |
| `bordered`      | `boolean` | No       | `false` | Adds a border and border-radius around the accordion |
| `allowMultiple` | `boolean` | No       | `false` | When `true`, multiple items can be expanded at once  |

### `rng-accordion` Outputs

| Output        | Type                         | Description                                                                 |
| ------------- | ---------------------------- | --------------------------------------------------------------------------- |
| `changeEvent` | `OutputRef<IAccordionEvent>` | Emits whenever any child item is toggled, with its index, header, and state |

#### `IAccordionEvent`

| Property     | Type      | Description                                |
| ------------ | --------- | ------------------------------------------ |
| `expanded`   | `boolean` | Whether the item was expanded or collapsed |
| `itemIndex`  | `number`  | Zero-based index of the toggled item       |
| `itemHeader` | `string`  | Header text of the toggled item            |

### `rng-accordion-item` Inputs

| Input      | Type      | Required | Default | Description                                               |
| ---------- | --------- | -------- | ------- | --------------------------------------------------------- |
| `header`   | `string`  | No       | `''`    | Text displayed in the clickable header row                |
| `disabled` | `boolean` | No       | `false` | When `true`, the item cannot be expanded or collapsed     |
| `expanded` | `boolean` | No       | `false` | Two-way bindable. Controls the expanded state of the item |

### `rng-accordion-item` Outputs

| Output        | Type                 | Description                                      |
| ------------- | -------------------- | ------------------------------------------------ |
| `changeEvent` | `OutputRef<boolean>` | Emits the new expanded state whenever it changes |
