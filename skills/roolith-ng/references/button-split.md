# Button Split

A split button combining a content area (text / icon) with a separate action icon button that emits the click event.

## Import

```ts
import { ButtonSplitComponent } from '@im4all/roolith-ng';
```

```ts
@Component({
  imports: [ButtonSplitComponent]
})
```

## Usage

### Basic

```html
<rng-button-split (clickEvent)="onAction()">Split Button</rng-button-split>
```

### With a leading icon in the text slot

```html
<rng-button-split (clickEvent)="onRemove()">
  <rng-icon name="filter" />
  Status
  <em>is</em>
  'active'
</rng-button-split>
```

### Custom action icon

```html
<rng-button-split
  actionIcon="delete"
  (clickEvent)="onDelete()">
  Delete Item
</rng-button-split>
```

### Sizes

```html
<rng-button-split
  size="xsmall"
  (clickEvent)="onAction()">
  Extra Small
</rng-button-split>
<rng-button-split
  size="small"
  (clickEvent)="onAction()">
  Small
</rng-button-split>
<rng-button-split (clickEvent)="onAction()">Default</rng-button-split>
<rng-button-split
  size="large"
  (clickEvent)="onAction()">
  Large
</rng-button-split>
```

---

## API

### Inputs

| Input        | Type                                          | Default          | Description                                      |
| ------------ | --------------------------------------------- | ---------------- | ------------------------------------------------ |
| `actionIcon` | `IconNameType`                                | `'chevron-down'` | Icon displayed inside the action (right) button  |
| `size`       | `'default' \| 'small' \| 'xsmall' \| 'large'` | `'default'`      | Controls the height and padding of the component |

### Outputs

| Output       | Payload | Description                                    |
| ------------ | ------- | ---------------------------------------------- |
| `clickEvent` | `void`  | Emitted when the action icon button is clicked |

### Content projection

The text area (`rng-button-split__text`) is fully projected via `<ng-content />`. Pass any combination of plain text, `<rng-icon>`, and `<em>` tags as children.
