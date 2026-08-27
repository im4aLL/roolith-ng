# Badge Component

`rng-badge` is a small label component used to display status, counts, or categories. It supports multiple types (colors) and sizes, and comes with an extended variant for adding supplementary text.

## Selector

```
rng-badge
rng-badge-extended
```

---

## `rng-badge`

### Inputs

| Input       | Type                                                                                              | Default     | Description                                       |
| ----------- | ------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------- |
| `type`      | `'default' \| 'primary' \| 'success' \| 'danger' \| 'warning' \| 'info' \| 'subtle' \| 'intense'` | `'default'` | Color variant of the badge                        |
| `size`      | `'default' \| 'large'`                                                                            | `'default'` | Size variant of the badge                         |
| `variant`   | `'default' \| 'status'`                                                                           | `'default'` | Layout variant; use `'status'` for icon + label   |
| `icon`      | `IconNameType \| null`                                                                            | `null`      | Icon shown before the badge text (status variant) |
| `iconColor` | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning' \| 'info'`           | `'default'` | Color applied to the badge icon                   |

### Content Projection

| Slot        | Description                      |
| ----------- | -------------------------------- |
| _(default)_ | Text or content inside the badge |

### Basic Usage

```html
<rng-badge>Default</rng-badge>
<rng-badge type="primary">Primary</rng-badge>
<rng-badge type="success">Success</rng-badge>
<rng-badge type="danger">Danger</rng-badge>
<rng-badge type="warning">Warning</rng-badge>
<rng-badge type="info">Info</rng-badge>
<rng-badge type="subtle">Subtle</rng-badge>
<rng-badge type="intense">Intense</rng-badge>
```

### Large Size

```html
<rng-badge size="large">Large badge</rng-badge>
```

### Status Variant

Use `variant="status"` with `icon` and `iconColor` to display a badge that represents a workflow state.

```html
<rng-badge
  variant="status"
  icon="check-solid"
  iconColor="success">
  Approved
</rng-badge>
<rng-badge
  variant="status"
  icon="spinner"
  iconColor="default">
  In Progress
</rng-badge>
<rng-badge
  variant="status"
  icon="minus-circle-solid"
  iconColor="danger">
  Rejected
</rng-badge>
<rng-badge
  variant="status"
  icon="bookmark-circle-solid"
  iconColor="info">
  Validated
</rng-badge>
<rng-badge
  variant="status"
  icon="xmark-solid"
  iconColor="danger">
  Deleted
</rng-badge>
<rng-badge
  variant="status"
  icon="redo-circle-solid"
  iconColor="secondary">
  Action Required
</rng-badge>
```

---

## `rng-badge-extended`

Wraps a `rng-badge` and adds accompanying descriptive text beside it.

### Inputs

| Input  | Type     | Default     | Description                                       |
| ------ | -------- | ----------- | ------------------------------------------------- |
| `text` | `string` | `undefined` | Plain text to display next to the projected badge |

### Content Projection

| Slot                      | Description                                                              |
| ------------------------- | ------------------------------------------------------------------------ |
| _(default)_               | The `rng-badge` element                                                   |
| `#rngBadgeExtendedContent` | A `<ng-template>` for rich/custom extended text (overrides `text` input) |

### Plain text extended badge

```html
<rng-badge-extended text="This is extended badge text">
  <rng-badge>Default</rng-badge>
</rng-badge-extended>
```

### Rich content extended badge

```html
<rng-badge-extended>
  <rng-badge type="success">Active</rng-badge>

  <ng-template #rngBadgeExtendedContent>
    <strong>Status:</strong>
    All systems operational
  </ng-template>
</rng-badge-extended>
```
