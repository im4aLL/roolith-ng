# Block Message

## Import

```ts
import { BlockMessageComponent } from '@im4all/roolith-ng';
```

```ts
@Component({
  imports: [BlockMessageComponent]
})
```

## Usage

### Basic

```html
<rng-block-message>No items to display yet.</rng-block-message>
```

### With header

```html
<rng-block-message header="Hint">
  Select an item to view its details. Use the controls above to make a selection.
</rng-block-message>
```

### Custom height

```html
<rng-block-message
  title="No results"
  height="400px">
  No data available for the selected filters.
</rng-block-message>
```

## API

### Inputs

| Input    | Type             | Required | Default | Description                                              |
| -------- | ---------------- | -------- | ------- | -------------------------------------------------------- |
| `header` | `string \| null` | No       | `null`  | Optional heading rendered above the description text     |
| `height` | `string \| null` | No       | `null`  | Inline height of the container (e.g. `'300px'`, `'50%'`) |

### Content projection

The component body is projected via `<ng-content />` and rendered as the description paragraph.
