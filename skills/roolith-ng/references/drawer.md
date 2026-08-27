# Drawer

## Import

```ts
import { IMPORT_DRAWER } from 'roolith-ng/components/drawer';
```

`IMPORT_DRAWER` includes both `DrawerComponent` and `DrawerTargetDirective`.

## Usage

### Basic drawer

Use `rngDrawerTarget` on a trigger element and match it to the `name` of `<rng-drawer>`:

```html
<rng-button rngDrawerTarget="drawer1">Open Drawer</rng-button>

<rng-drawer
  name="drawer1"
  header="Drawer title"
  subheader="Drawer subtitle"
  #drawerEl>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit.

  <ng-container rngDrawerAction>
    <rng-button
      variant="dark"
      [block]="true"
      (clickEvent)="drawerEl.close()">
      Action 1
    </rng-button>
    <rng-button
      [block]="true"
      (clickEvent)="drawerEl.close()">
      Action 2
    </rng-button>
  </ng-container>
</rng-drawer>
```

### Closing programmatically

Use a template reference (`#drawerEl`) and call `.close()`:

```html
<rng-drawer
  name="myDrawer"
  #drawerEl>
  ...
  <ng-container rngDrawerAction>
    <rng-button (clickEvent)="drawerEl.close()">Close</rng-button>
  </ng-container>
</rng-drawer>
```

Or inject and call `.close()` from the component class via a `viewChild` reference.

### Reacting to open/close events

`closeEvent` fires whenever the drawer closes — including when the user presses **Escape**.

```html
<rng-drawer
  name="myDrawer"
  (openEvent)="onDrawerOpen()"
  (closeEvent)="onDrawerClose()">
  ...
</rng-drawer>
```

```ts
public onDrawerOpen(): void {
  // handle open
}

public onDrawerClose(): void {
  // handle close
}
```

## Inputs

| Input       | Type             | Default    | Description                          |
| ----------- | ---------------- | ---------- | ------------------------------------ |
| `name`      | `string`         | `'drawer'` | Unique name used to link the trigger |
| `header`    | `string \| null` | `null`     | Drawer header title                  |
| `subheader` | `string \| null` | `null`     | Drawer header subtitle               |

## Outputs

| Output       | Payload | Description                                                                              |
| ------------ | ------- | ---------------------------------------------------------------------------------------- |
| `closeEvent` | `void`  | Emitted when the drawer closes — whether via `.close()`, the X button, or the Escape key |
| `openEvent`  | `void`  | Emitted when the drawer is opened via `.open()`                                          |

## Slots

| Slot          | Selector           | Description                                      |
| ------------- | ------------------ | ------------------------------------------------ |
| Default       | _(none)_           | Drawer body content                              |
| Action footer | `[rngDrawerAction]` | Buttons or actions rendered in the drawer footer |

## Directive: `rngDrawerTarget`

Apply to any trigger component to wire it to a named drawer:

```html
<rng-button rngDrawerTarget="myDrawer">Open</rng-button>
```

The directive resolves the inner `<button>` element and sets the native `popovertarget` attribute automatically.

| Input            | Type     | Default | Description                          |
| ---------------- | -------- | ------- | ------------------------------------ |
| `rngDrawerTarget` | `string` | `''`    | The `name` of the target `rng-drawer` |
