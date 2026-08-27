# Button

## Import

```ts
import { ButtonComponent, ButtonGroupComponent } from '@im4all/roolith-ng';
```

```ts
@Component({
  imports: [ButtonComponent, ButtonGroupComponent]
})
```

## Usage

### Variants

```html
<rng-button>Default</rng-button>
<rng-button variant="primary">Primary</rng-button>
<rng-button variant="secondary">Secondary</rng-button>
<rng-button variant="success">Success</rng-button>
<rng-button variant="danger">Danger</rng-button>
<rng-button variant="warning">Warning</rng-button>
<rng-button variant="info">Info</rng-button>
<rng-button variant="dark">Dark</rng-button>
<rng-button variant="gray">Gray</rng-button>
<rng-button variant="ghost">Ghost</rng-button>
<rng-button variant="link">Ghost</rng-button>
```

### Sizes

```html
<rng-button size="xsmall">Extra Small</rng-button>
<rng-button size="small">Small</rng-button>
<rng-button>Default</rng-button>
<rng-button size="large">Large</rng-button>
```

### With Icon

```html
<!-- Icon on the left (default) -->
<rng-button icon="calendar">Schedule</rng-button>

<!-- Icon on the right -->
<rng-button
  icon="arrow-right"
  iconPosition="right">
  Next
</rng-button>

<!-- Icon only -->
<rng-button
  icon="delete"
  variant="ghost"></rng-button>
```

### Loading State

While `showLoading` is `true`, the click handler is suppressed and a spinner is shown.

```html
<rng-button [showLoading]="isSaving">Save</rng-button>
```

### Click Event

```html
<rng-button
  variant="primary"
  (clickEvent)="onSave()">
  Save
</rng-button>
```

---

## Button Group

Renders a set of toggle buttons where one can be active at a time.

```ts
tabs = ['Overview', 'Details', 'History'];
activeTab = 'Overview';

onTabSelect(label: string): void {
  this.activeTab = label;
}
```

```html
<rng-button-group
  [labels]="tabs"
  [activeLabel]="activeTab"
  (labelSelected)="onTabSelect($event)"></rng-button-group>
```

## API

### `rng-button` Inputs

| Input          | Type                                                                                                                             | Default     | Description                                    |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------- | ----------- | ---------------------------------------------- |
| `variant`      | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning' \| 'info' \| 'dark' \| 'gray' \| 'ghost' \| 'link'` | `'default'` | Visual style variant                           |
| `size`         | `'default' \| 'small' \| 'xsmall' \| 'large'`                                                                                    | `'default'` | Button size                                    |
| `icon`         | `IconNameType \| null`                                                                                                           | `null`      | Icon to show alongside the label               |
| `iconPosition` | `'left' \| 'right'`                                                                                                              | `'left'`    | Side on which the icon appears                 |
| `showLoading`  | `boolean`                                                                                                                        | `false`     | Replaces icon with a spinner and blocks clicks |

### `rng-button` Outputs

| Output       | Payload | Description                                                       |
| ------------ | ------- | ----------------------------------------------------------------- |
| `clickEvent` | `void`  | Emitted on button click (suppressed when `showLoading` is `true`) |

### `rng-button-group` Inputs

| Input         | Type             | Default | Description                     |
| ------------- | ---------------- | ------- | ------------------------------- |
| `labels`      | `string[]`       | `[]`    | List of button labels to render |
| `activeLabel` | `string \| null` | `null`  | Currently active/selected label |

### `rng-button-group` Outputs

| Output          | Payload  | Description                    |
| --------------- | -------- | ------------------------------ |
| `labelSelected` | `string` | Emitted with the clicked label |
