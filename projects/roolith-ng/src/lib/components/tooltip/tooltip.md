# Tooltip Component

`rng-tooltip` is a wrapper component that displays a tooltip relative to its trigger content. It supports plain text tooltips and rich content via a named template.

## Selector

```
rng-tooltip
```

## Inputs

| Input      | Type                                     | Default     | Description                                     |
| ---------- | ---------------------------------------- | ----------- | ----------------------------------------------- |
| `text`     | `string`                                 | `''`        | Plain text to display inside the tooltip        |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `undefined` | Position of the tooltip relative to the trigger |
| `width`    | `string \| null`                         | `null`      | Optional inline width for the tooltip container |

## Content Projection

| Slot                | Description                                                              |
| ------------------- | ------------------------------------------------------------------------ |
| _(default)_         | The trigger element the tooltip wraps around                             |
| `#rngTooltipContent` | A `<ng-template>` for rich/custom tooltip content (activates large mode) |

## Basic Usage

### Plain text tooltip (default position)

```html
<rng-tooltip text="Here is the tooltip text">Hover me</rng-tooltip>
```

### Positioned tooltips

```html
<!-- Top -->
<rng-tooltip
  text="Tooltip text"
  position="top">
  Top trigger
</rng-tooltip>

<!-- Bottom -->
<rng-tooltip
  text="Tooltip text"
  position="bottom">
  Bottom trigger
</rng-tooltip>

<!-- Left -->
<rng-tooltip
  text="Tooltip text"
  position="left">
  Left trigger
</rng-tooltip>

<!-- Right -->
<rng-tooltip
  text="Tooltip text"
  position="right">
  Right trigger
</rng-tooltip>
```

## Rich Content Tooltip

Use a named `<ng-template #rngTooltipContent>` as a content child to render custom HTML inside the tooltip. This automatically applies the `rng-tooltip--large` modifier class.

```html
<rng-tooltip>
  Hover for details

  <ng-template #rngTooltipContent>
    <div class="rng-tooltip__content-hl">Tooltip Header</div>
    <p>Rich description text with more detail.</p>
    <a
      href="#"
      class="rng-tooltip__content-button">
      Action Button
    </a>
  </ng-template>
</rng-tooltip>
```
