# Tab

A tabbed navigation component that uses a `rng-toggle-group` for the tab bar and renders the active pane's content. Supports static string content and custom slot templates per tab.

## Import

```ts
import { TabComponent, TabContentOfDirective, ITabItem, ITabContent } from 'roolith-ng';
```

```ts
@Component({
  imports: [TabComponent, TabContentOfDirective]
})
```

## Usage

### Basic (static content)

Provide parallel arrays: `items` drives the tab bar and `contents` supplies the body of each pane matched by `key`.

```ts
tabs = signal<ITabItem[]>([
  { label: 'Tab 1', value: 'tab-1' },
  { label: 'Tab 2', value: 'tab-2' },
  { label: 'Tab 3', value: 'tab-3' },
]);

tabContents = signal<ITabContent[]>([
  { key: 'tab-1', header: 'Tab 1', content: 'Tab 1 content here.' },
  { key: 'tab-2', content: 'Tab 2 content here.' },
  { key: 'tab-3', content: 'Tab 3 content here.' },
]);

onTabChange(item: ITabItem): void {
  console.error(item);
}
```

```html
<rng-tab
  [items]="tabs()"
  [contents]="tabContents()"
  (changeEvent)="onTabChange($event)" />
```

### With a default selected tab

Pass `value` to pre-select a tab by its value. Defaults to the first item if omitted or not matched.

```html
<rng-tab
  [items]="tabs()"
  [contents]="tabContents()"
  value="tab-2" />
```

### Custom pane template

Use the `rngTabContentOf` directive inside `rng-tab` to override the rendered content for a specific tab key. The implicit context is the matching `ITabContent` object.

```html
<rng-tab
  [items]="tabs()"
  [contents]="tabContents()"
  (changeEvent)="onTabChange($event)">
  <ng-template
    rngTabContentOf="tab-1"
    let-tab>
    <h5>{{ tab.header }}</h5>
    <p>
      Custom
      <strong>tab 1</strong>
      content goes here.
    </p>
  </ng-template>
</rng-tab>
```

---

## API

### `rng-tab` Inputs

| Input      | Type                       | Default | Description                                                       |
| ---------- | -------------------------- | ------- | ----------------------------------------------------------------- |
| `items`    | `ITabItem[]`               | `[]`    | Tab bar items — each item maps to a pane via its `value`/`key`    |
| `contents` | `ITabContent[]`            | `[]`    | Content for each pane, matched to a tab item by `key`             |
| `value`    | `string \| number \| null` | `null`  | Initial active tab value; falls back to the first item when unset |

### `rng-tab` Outputs

| Output        | Payload    | Description                         |
| ------------- | ---------- | ----------------------------------- |
| `changeEvent` | `ITabItem` | Emitted when the active tab changes |

### `[rngTabContentOf]` Directive

Applied to an `<ng-template>` inside `<rng-tab>` to supply a custom template for a specific tab pane.

| Input            | Type               | Description                                |
| ---------------- | ------------------ | ------------------------------------------ |
| `rngTabContentOf` | `string \| number` | Key of the tab pane this template replaces |

The template receives the matching `ITabContent` object as `$implicit`:

```html
<ng-template
  rngTabContentOf="myKey"
  let-tab>
  {{ tab.header }} — {{ tab.content }}
</ng-template>
```

### `ITabItem`

Alias for `IToggleGroupItem`.

| Property | Type               | Description              |
| -------- | ------------------ | ------------------------ |
| `label`  | `string`           | Display text for the tab |
| `value`  | `string \| number` | Unique identifier        |

### `ITabContent`

| Property  | Type               | Required | Description                          |
| --------- | ------------------ | -------- | ------------------------------------ |
| `key`     | `string \| number` | Yes      | Must match the `value` of a tab item |
| `content` | `string`           | Yes      | Default body text                    |
| `header`  | `string`           | No       | Optional heading rendered above body |
