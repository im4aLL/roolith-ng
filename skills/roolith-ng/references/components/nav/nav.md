# Nav

Two components are available:

- `rng-nav` — a standalone navigation list with optional submenu support
- `rng-nav-group` — a wrapper that renders multiple named `rng-nav` sections

## Import

```ts
import { NavComponent } from 'roolith-ng';
import { NavGroupComponent } from 'roolith-ng';
```

```ts
@Component({
  imports: [NavComponent, NavGroupComponent]
})
```

## Usage

### Basic nav

```ts
import { INav } from 'roolith-ng';

items: INav[] = [
  { id: '1', name: 'Item One', link: '/item-one', isActive: true, icon: 'home' },
  { id: '2', name: 'Item Two', link: '/item-two', isActive: false },
  { id: '3', name: 'Item Three', link: '/item-three', isActive: false },
];

onNavClick(item: INav): void {
  // handle navigation with item.link
}
```

```html
<rng-nav
  [data]="items"
  (clickEvent)="onNavClick($event)" />
```

### Nav with submenu

Set `children` on a nav item to render a nested list. Clicking a parent item with children toggles the submenu instead of emitting `clickEvent`.

```ts
items: INav[] = [
  {
    id: '1',
    name: 'Parent Item',
    link: '#',
    isActive: false,
    children: [
      { id: '1-1', name: 'Child Item One', link: '/child-one', isActive: false },
      { id: '1-2', name: 'Child Item Two', link: '/child-two', isActive: false },
    ],
  },
];
```

### Nav with badge count

Set `count` on a nav item to display a badge with the given number.

```ts
items: INav[] = [
  { id: '1', name: 'Item With Badge', link: '/item-with-badge', isActive: false, count: 5 },
];
```

### Nav type

Use `type` to apply a contextual colour to the nav. Defaults to `'default'`.

```html
<rng-nav
  [data]="items"
  type="warning" />
```

### Nav variation

Use `variation="primary"` to switch to the primary visual style.

```html
<rng-nav
  [data]="items"
  variation="primary" />
```

### Collapsed mode

Set `[isCollapsed]="true"` to render the nav in compact mode — icons only with a tooltip. In this mode, opening one submenu automatically closes any other open submenu.

```html
<rng-nav
  [data]="items"
  [isCollapsed]="true" />
```

### Nav group

Use `rng-nav-group` to render multiple nav sections, each with its own label, type, and variation. The `clickEvent` output emits both the clicked item and the group id.

```ts
import { INavGroup, INavClickEvent } from 'roolith-ng';

groups: INavGroup[] = [
  {
    id: 'main',
    name: 'Main',
    items: [
      { id: '1', name: 'Item One', link: '/item-one', isActive: true },
      { id: '2', name: 'Item Two', link: '/item-two', isActive: false },
    ],
  },
  {
    id: 'admin',
    name: 'Administration',
    type: 'warning',
    items: [
      { id: '3', name: 'Item Three', link: '/item-three', isActive: false },
    ],
  },
];

onGroupNavClick(event: INavClickEvent): void {
  console.log(event.groupId, event.item.link);
}
```

```html
<rng-nav-group
  [data]="groups"
  (clickEvent)="onGroupNavClick($event)" />
```

## API

### `rng-nav` Inputs

| Input         | Type               | Required | Default     | Description                                                               |
| ------------- | ------------------ | -------- | ----------- | ------------------------------------------------------------------------- |
| `data`        | `INav[]`           | Yes      | —           | Array of navigation items                                                 |
| `type`        | `NavType`          | No       | `'default'` | Contextual colour: `'default'`, `'warning'`, or `'info'`                  |
| `variation`   | `NavVariationType` | No       | `'default'` | Visual style: `'default'` or `'primary'`                                  |
| `isCollapsed` | `boolean`          | No       | `false`     | Compact (icon-only) mode; tooltips are shown and open submenus are closed |

### `rng-nav` Outputs

| Output       | Payload | Description                                                       |
| ------------ | ------- | ----------------------------------------------------------------- |
| `clickEvent` | `INav`  | Emits the clicked leaf item (items with children are not emitted) |

### `rng-nav-group` Inputs

| Input  | Type          | Required | Default | Description                    |
| ------ | ------------- | -------- | ------- | ------------------------------ |
| `data` | `INavGroup[]` | Yes      | —       | Array of nav group definitions |

### `rng-nav-group` Outputs

| Output       | Payload          | Description                                               |
| ------------ | ---------------- | --------------------------------------------------------- |
| `clickEvent` | `INavClickEvent` | Emits the clicked item and the id of the containing group |

### INav

| Property   | Type             | Description                                                          |
| ---------- | ---------------- | -------------------------------------------------------------------- |
| `id`       | `string`         | Unique identifier for the item                                       |
| `name`     | `string`         | Display label                                                        |
| `link`     | `string`         | Navigation href                                                      |
| `isActive` | `boolean`        | Marks the item as the currently active route                         |
| `count`    | `number \| null` | Optional badge count shown next to the label                         |
| `icon`     | `string \| null` | Optional icon class applied to the item's icon element               |
| `children` | `INav[]`         | Optional nested items; presence turns the item into a submenu parent |
| `isOpen`   | `boolean`        | Tracks whether the submenu is currently expanded                     |

### INavGroup

| Property    | Type               | Description                                                |
| ----------- | ------------------ | ---------------------------------------------------------- |
| `id`        | `string`           | Unique identifier for the group                            |
| `name`      | `string \| null`   | Group header label; when `null` the header is not rendered |
| `type`      | `NavType`          | Optional contextual colour applied to the group's `rng-nav` |
| `variation` | `NavVariationType` | Optional visual style applied to the group's `rng-nav`      |
| `items`     | `INav[]`           | Navigation items for this group                            |

### INavClickEvent

| Property  | Type     | Description                               |
| --------- | -------- | ----------------------------------------- |
| `item`    | `INav`   | The nav item that was clicked             |
| `groupId` | `string` | The `id` of the group the item belongs to |
