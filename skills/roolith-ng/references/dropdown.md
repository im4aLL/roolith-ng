# Dropdown

## Import

```ts
import { DropdownComponent, DropdownTargetDirective } from '@im4all/roolith-ng';
// or
import { IMPORT_DROPDOWN } from '@im4all/roolith-ng';
```

```ts
@Component({
  imports: [...IMPORT_DROPDOWN]
  // or: imports: [DropdownComponent, DropdownTargetDirective]
})
```

## Usage

### Basic dropdown

The `rngDropdownTarget` directive goes on the wrapper element that contains the trigger. It automatically sets the required `popovertarget`, `anchor-name`, and CSS class on the first child element. Please note that `rngDropdownTarget` directive looks for a clickable element (preferably button).

```ts
public menuGroups = signal<IDropdownGroup[]>([
  {
    headline: 'User Settings',
    items: [
      { label: 'Profile', value: 'profile', secondaryLabel: 'Ctrl + k' },
      { label: 'Account', value: 'account', secondaryLabel: 'Ctrl + j' },
    ],
  },
  {
    items: [
      { label: 'Logout', value: 'logout', icon: 'logout', isDanger: true },
    ],
  },
]);
```

```html
<!-- Trigger -->
<div rngDropdownTarget="user-menu">
  <rng-button icon="user">Account</rng-button>
</div>

<!-- Dropdown panel -->
<rng-dropdown
  name="user-menu"
  [groups]="menuGroups()"
  (itemClick)="onMenuSelect($event)" />
```

### With secondary icon

Use `secondaryIcon` to render an icon in the secondary slot instead of a text label.

```ts
public actionGroups = signal<IDropdownGroup[]>([
  {
    items: [
      { label: 'Approved', value: 'approved', secondaryIcon: 'check' },
      { label: 'Export Report', value: 'export' },
    ],
  },
]);
```

```html
<div rngDropdownTarget="actions">
  <rng-button>Actions</rng-button>
</div>

<rng-dropdown
  name="actions"
  [groups]="actionGroups()" />
```

### With item icon

Use `icon` to render an icon before the item label.

```ts
public fileGroups = signal<IDropdownGroup[]>([
  {
    items: [
      { label: 'Download', value: 'download', icon: 'download' },
      { label: 'Copy Link', value: 'copy', icon: 'clipboard' },
      { label: 'Delete', value: 'delete', icon: 'delete', isDanger: true },
    ],
  },
]);
```

```html
<div rngDropdownTarget="file-menu">
  <rng-button icon="more-vertical" />
</div>

<rng-dropdown
  name="file-menu"
  [groups]="fileGroups()"
  (itemClick)="onAction($event)" />
```

### Multiple groups with headlines

```ts
public settingsGroups = signal<IDropdownGroup[]>([
  {
    headline: 'Account',
    items: [
      { label: 'Profile', value: 'profile' },
      { label: 'Billing', value: 'billing' },
    ],
  },
  {
    headline: 'Workspace',
    items: [
      { label: 'Settings', value: 'settings' },
      { label: 'Members', value: 'members' },
    ],
  },
  {
    items: [
      { label: 'Sign out', value: 'signout', isDanger: true },
    ],
  },
]);
```

```html
<div rngDropdownTarget="settings">
  <rng-button icon="settings" />
</div>

<rng-dropdown
  name="settings"
  [groups]="settingsGroups()"
  (itemClick)="onSettingsAction($event)" />
```

### Fixed alignment

Pass `alignment` to force a position instead of relying on auto-detection.

```html
<div rngDropdownTarget="menu">
  <rng-button>Open</rng-button>
</div>

<!-- Always opens to the right -->
<rng-dropdown
  name="menu"
  alignment="right"
  [groups]="groups()" />

<!-- Always opens above -->
<rng-dropdown
  name="menu"
  alignment="top"
  [groups]="groups()" />

<!-- Always opens above and to the right -->
<rng-dropdown
  name="menu"
  alignment="top-right"
  [groups]="groups()" />
```

When `alignment` is set, viewport overflow detection is skipped entirely.

### Disabled items

Set `isDisabled: true` on any `IDropdownItem` to prevent it from being clicked. Disabled items are still rendered but are visually muted and do not emit `itemClick`.

```ts
public exportGroups = signal<IDropdownGroup[]>([
  {
    items: [
      { label: 'Export as CSV', value: 'csv' },
      { label: 'Export as PDF', value: 'pdf', isDisabled: true },
    ],
  },
]);
```

```html
<div rngDropdownTarget="export-menu">
  <rng-button>Export</rng-button>
</div>

<rng-dropdown
  name="export-menu"
  [groups]="exportGroups()"
  (itemClick)="onExport($event)" />
```

### Custom content via `ng-content`

For fully custom markup, omit `groups` and project content directly.

```html
<div rngDropdownTarget="custom">
  <rng-button>Custom</rng-button>
</div>

<rng-dropdown name="custom">
  <div class="rng-dropdown__body">
    <div class="rng-dropdown__group">
      <ul class="rng-dropdown__list">
        <li class="rng-dropdown__item">Custom item</li>
      </ul>
    </div>
  </div>
</rng-dropdown>
```

## Position

By default the dropdown auto-detects viewport overflow and applies the correct position. Pass `alignment` to override this behaviour:

| `alignment` value | CSS class applied         | When to use                         |
| ----------------- | ------------------------- | ----------------------------------- |
| _(not set)_       | auto-detected (see below) | Default — let the component decide  |
| `'right'`         | `rng-dropdown--right`      | Trigger is near the right edge      |
| `'top'`           | `rng-dropdown--top`        | Trigger is near the bottom edge     |
| `'top-right'`     | `rng-dropdown--top-right`  | Trigger is in a bottom-right corner |

**Auto-detection** (when `alignment` is not set):

| Condition                                      | Class applied            |
| ---------------------------------------------- | ------------------------ |
| Sufficient space below and to the right        | _(none)_                 |
| Would overflow the right edge                  | `rng-dropdown--right`     |
| Would overflow the bottom edge                 | `rng-dropdown--top`       |
| Would overflow both the bottom and right edges | `rng-dropdown--top-right` |

## API

### `rngDropdownTarget` Directive

Applied to the **wrapper** element of the trigger. The directive targets the first child element and automatically sets all required browser Popover API attributes.

| Input              | Type     | Required | Description                                  |
| ------------------ | -------- | -------- | -------------------------------------------- |
| `rngDropdownTarget` | `string` | Yes      | Must match the `name` input of `rng-dropdown` |

### `rng-dropdown` Inputs

| Input       | Type                                      | Default | Description                                            |
| ----------- | ----------------------------------------- | ------- | ------------------------------------------------------ |
| `name`      | `string`                                  | `''`    | Unique name; links with `rngDropdownTarget`             |
| `groups`    | `IDropdownGroup[]`                        | `[]`    | List of groups to render as dropdown content           |
| `alignment` | `'right' \| 'top' \| 'top-right' \| null` | `null`  | Forces a fixed position; skips auto-detection when set |

### `rng-dropdown` Outputs

| Output      | Type                              | Description                                           |
| ----------- | --------------------------------- | ----------------------------------------------------- |
| `itemClick` | `OutputEmitterRef<IDropdownItem>` | Emits the clicked item; dropdown closes automatically |

### `IDropdownGroup`

| Property   | Type              | Required | Description                                   |
| ---------- | ----------------- | -------- | --------------------------------------------- |
| `headline` | `string`          | No       | Optional label rendered above the group items |
| `items`    | `IDropdownItem[]` | Yes      | Items to render in this group                 |

### `IDropdownItem`

| Property         | Type               | Required | Description                                                                  |
| ---------------- | ------------------ | -------- | ---------------------------------------------------------------------------- |
| `label`          | `string`           | Yes      | Primary label text                                                           |
| `value`          | `string \| number` | Yes      | Unique identifier for the item                                               |
| `icon`           | `IconNameType`     | No       | Icon rendered before the label                                               |
| `secondaryLabel` | `string`           | No       | Text rendered in the secondary (right) slot                                  |
| `secondaryIcon`  | `IconNameType`     | No       | Icon rendered in the secondary slot (takes precedence over `secondaryLabel`) |
| `isDanger`       | `boolean`          | No       | Applies danger styling (`rng-dropdown__item--danger`)                         |
| `isDisabled`     | `boolean`          | No       | Disables the item — it renders but cannot be clicked                         |
