# List Component

`rng-list` renders an unordered list from a structured array of items.

## Selector

```
rng-list
```

---

## Inputs

| Input   | Type         | Default | Description                        |
| ------- | ------------ | ------- | ---------------------------------- |
| `items` | `IListItem[]` | `[]`    | Array of items to render as `<li>` elements |

## `IListItem`

| Property  | Type                    | Description                                                          |
| --------- | ----------------------- | -------------------------------------------------------------------- |
| `content` | `string`                | Main text displayed inside the list item                             |
| `title`   | `string` _(optional)_   | Header shown above `content`; also used as the tracking key          |

---

## Basic Usage

```html
<rng-list [items]="items" />
```

```ts
import { ListComponent, IListItem } from 'roolith-ng/components/list';

items: IListItem[] = [
  { content: 'Item one' },
  { content: 'Item two' },
  { content: 'Item three' },
];
```

## With Titles

When `title` is provided it renders as a header above the item content.

```ts
items: IListItem[] = [
  { title: 'First', content: 'Description for item one' },
  { title: 'Second', content: 'Description for item two' },
];
```

```html
<rng-list [items]="items" />
```

Rendered structure per item:

```html
<li class="rng-list__item">
  <div class="rng-list__header">First</div>
  <div class="rng-list__content">Description for item one</div>
</li>
```
