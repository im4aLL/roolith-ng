# Popover

## Import

```ts
import { PopoverComponent, PopoverTargetDirective } from '@im4all/roolith-ng';
// or
import { IMPORT_POPOVER } from '@im4all/roolith-ng';
```

```ts
@Component({
  imports: [...IMPORT_POPOVER]
  // or: imports: [PopoverComponent, PopoverTargetDirective]
})
```

## Usage

### Basic popover

The `rngPopoverTarget` directive goes on the wrapper element that contains the trigger. It automatically sets the required `popovertarget`, `anchor-name`, and CSS class on the first child element.

```html
<!-- Trigger -->
<div rngPopoverTarget="info">
  <rng-button>Show Info</rng-button>
</div>

<!-- Popover panel -->
<rng-popover name="info">
  <p>This is the popover content.</p>
</rng-popover>
```

### With header and subtext (string inputs)

```html
<div rngPopoverTarget="details">
  <rng-button
    variant="ghost"
    icon="info">
    Details
  </rng-button>
</div>

<rng-popover
  name="details"
  header="Popover Title"
  subtext="Last updated 5 minutes ago">
  <p>Detailed information goes here.</p>
</rng-popover>
```

### With header and subtext (template projection)

```html
<div rngPopoverTarget="details">
  <rng-button
    variant="ghost"
    icon="info">
    Details
  </rng-button>
</div>

<rng-popover name="details">
  <ng-template #rngPopoverHeader>Popover Title</ng-template>
  <ng-template #rngPopoverSubtext>Last updated 5 minutes ago</ng-template>

  <p>Detailed information goes here.</p>
</rng-popover>
```

### Right-aligned popover

Use `alignment` to force a fixed position. When not set, the component auto-detects viewport overflow.

```html
<!-- Always opens to the right -->
<rng-popover
  name="menu"
  alignment="right">
  <p>Right-aligned content.</p>
</rng-popover>

<!-- Always opens above -->
<rng-popover
  name="menu"
  alignment="top">
  <p>Top-aligned content.</p>
</rng-popover>

<!-- Always opens above and to the right -->
<rng-popover
  name="menu"
  alignment="top-right">
  <p>Top-right-aligned content.</p>
</rng-popover>
```

## Position

By default the popover auto-detects viewport overflow and applies the correct position. Pass `alignment` to override:

| `alignment` value | CSS class applied         | When to use                         |
| ----------------- | ------------------------- | ----------------------------------- |
| _(not set)_       | auto-detected (see below) | Default — let the component decide  |
| `'right'`         | `rng-popover--right`       | Trigger is near the right edge      |
| `'top'`           | `rng-popover--top`         | Trigger is near the bottom edge     |
| `'top-right'`     | `rng-popover--top-right`   | Trigger is in a bottom-right corner |

**Auto-detection** (when `alignment` is not set):

| Condition                                      | Class applied           |
| ---------------------------------------------- | ----------------------- |
| Sufficient space below and to the right        | _(none)_                |
| Would overflow the right edge                  | `rng-popover--right`     |
| Would overflow the bottom edge                 | `rng-popover--top`       |
| Would overflow both the bottom and right edges | `rng-popover--top-right` |

## API

### `rngPopoverTarget` Directive

Applied to the **wrapper** element of the trigger. The directive targets the first child element and automatically sets all required browser Popover API attributes.

| Input             | Type     | Required | Description                                 |
| ----------------- | -------- | -------- | ------------------------------------------- |
| `rngPopoverTarget` | `string` | Yes      | Must match the `name` input of `rng-popover` |

### `rng-popover` Inputs

| Input       | Type                                      | Default | Description                                            |
| ----------- | ----------------------------------------- | ------- | ------------------------------------------------------ |
| `name`      | `string`                                  | `''`    | Unique name; links with `rngPopoverTarget`              |
| `alignment` | `'right' \| 'top' \| 'top-right' \| null` | `null`  | Forces a fixed position; skips auto-detection when set |
| `header`    | `string \| null`                          | `null`  | Plain-text title rendered above the body               |
| `subtext`   | `string \| null`                          | `null`  | Plain-text subtitle rendered below the header          |

### `rng-popover` Outputs

| Output        | Type                  | Description                              |
| ------------- | --------------------- | ---------------------------------------- |
| `changeEvent` | `IPopoverChangeEvent` | Emitted when the popover opens or closes |

#### `IPopoverChangeEvent`

| Property | Type                | Description                          |
| -------- | ------------------- | ------------------------------------ |
| `type`   | `'open' \| 'close'` | Whether the popover opened or closed |

```html
<rng-popover
  name="info"
  (changeEvent)="onPopoverChange($event)">
  Content
</rng-popover>
```

```ts
public onPopoverChange(event: IPopoverChangeEvent): void {
  console.log(event.type); // 'open' | 'close'
}
```

### `rng-popover` Content Projection

| Slot                | Description                                      |
| ------------------- | ------------------------------------------------ |
| _(default)_         | Main body content of the popover                 |
| `#rngPopoverHeader`  | `<ng-template>` for the popover title/heading    |
| `#rngPopoverSubtext` | `<ng-template>` for a subtitle below the heading |
