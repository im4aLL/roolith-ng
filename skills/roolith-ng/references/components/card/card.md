# Card

## Import

```ts
import { CardComponent, CardActionDirective, CardFooterDirective } from 'roolith-ng';
// or
import { IMPORT_CARD } from 'roolith-ng';
```

```ts
@Component({
  imports: [CardComponent, CardActionDirective, CardFooterDirective]
  // or: imports: [...IMPORT_CARD]
})
```

For body-only or header-only cards `CardComponent` alone is sufficient.
Import `CardActionDirective` when you project `[rngCardAction]` and `CardFooterDirective` when you project `[rngCardFooter]`.
The card uses `contentChild` signals to detect the directives and only renders `rng-card__action` and `rng-card__footer` wrappers when content is present.

## Usage

### Basic (body only)

```html
<rng-card>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</rng-card>
```

### With header and subheader

```html
<rng-card
  header="Card title"
  subheader="Card subtitle">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
</rng-card>
```

The header area `rng-card__header` only renders when `header` or `subheader` is set.

### With header action

Requires `CardActionDirective`.

```ts
import { CardComponent, CardActionDirective } from 'roolith-ng';

@Component({
  imports: [CardComponent, CardActionDirective]
})
```

```html
<rng-card
  header="Card title"
  subheader="Card subtitle">
  Lorem ipsum dolor sit amet.

  <rng-button
    rngCardAction
    size="xsmall"
    variant="link">
    Open Action
  </rng-button>
</rng-card>
```

The element with `rngCardAction` is projected into `rng-card__action` on the right side of the header.
The wrapper is not rendered when no `CardActionDirective` content is present.

### With footer

Requires `CardFooterDirective`.

```ts
import { CardComponent, CardFooterDirective } from 'roolith-ng';

@Component({
  imports: [CardComponent, CardFooterDirective]
})
```

```html
<rng-card
  header="Card title"
  subheader="Card subtitle">
  Lorem ipsum dolor sit amet.

  <ng-container rngCardFooter>
    <rng-button
      variant="dark"
      [block]="true">
      Action 1
    </rng-button>
    <rng-button [block]="true">Action 2</rng-button>
  </ng-container>
</rng-card>
```

Wrap footer content in an `ng-container` with `rngCardFooter`.
The content is rendered inside `rng-card__footer` at the bottom of the card.
The wrapper is not rendered when no `CardFooterDirective` content is present.

### Full example

```ts
import { ButtonComponent, CardActionDirective, CardComponent, CardFooterDirective } from 'roolith-ng';

@Component({
  imports: [CardComponent, CardActionDirective, CardFooterDirective, ButtonComponent]
})
```

```html
<rng-card
  header="Card title"
  subheader="Card subtitle">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit.

  <rng-button
    rngCardAction
    size="xsmall"
    variant="link">
    Open Action
  </rng-button>

  <ng-container rngCardFooter>
    <rng-button
      variant="dark"
      [block]="true">
      Action 1
    </rng-button>
    <rng-button [block]="true">Action 2</rng-button>
  </ng-container>
</rng-card>
```

## API

### Inputs

| Input       | Type             | Required | Default | Description                       |
| ----------- | ---------------- | -------- | ------- | --------------------------------- |
| `header`    | `string \| null` | No       | `null`  | Title rendered in the card header |
| `subheader` | `string \| null` | No       | `null`  | Subtitle rendered below the title |

### Content projection

| Slot          | Selector         | Directive              | Description                                                        |
| ------------- | ---------------- | ---------------------- | ------------------------------------------------------------------ |
| Body          | _(default)_      | -                      | Main content of the card, rendered inside `rng-card__body`          |
| Header action | `[rngCardAction]` | `CardActionDirective`  | Element placed on the right side of the card header (`rng-card__action`). Wrapper only renders when directive is present |
| Footer        | `[rngCardFooter]` | `CardFooterDirective`  | Content rendered inside `rng-card__footer` at the bottom of the card. Wrapper only renders when directive is present |

### Directives

| Directive              | Selector         | Description                                                                 |
| ---------------------- | ---------------- | --------------------------------------------------------------------------- |
| `CardActionDirective`  | `[rngCardAction]` | Marker for header action projection. Detected via `contentChild(CardActionDirective)` |
| `CardFooterDirective`  | `[rngCardFooter]` | Marker for footer projection. Detected via `contentChild(CardFooterDirective)` |

### `IMPORT_CARD`

```ts
import { IMPORT_CARD } from 'roolith-ng';

@Component({
  imports: [...IMPORT_CARD]
})
```

Includes `CardComponent`, `CardActionDirective` and `CardFooterDirective`.
