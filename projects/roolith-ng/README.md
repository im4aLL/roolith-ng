# RoolithNg

A standalone Angular UI library for building consistent, accessible enterprise apps.
It ships headless-logic components, signal-based inputs, overlay primitives, a full table stack, and a token-driven SCSS system.

- Package: `@im4all/roolith-ng`.
- Angular: `>=21.0.0` (tested on `21.2.x`).
- Prefix: `rng` (components are `rng-*`, triggers are `*Target` attributes).
- Dependencies: `lodash-es`, `luxon`, `tslib` (runtime) and `@angular/common`, `@angular/core`, `@angular/forms` (peer).
- Tree-shakable and `sideEffects: false`.

For full API docs and live previews, run the demo app in this repo (`projects/demo`).

## Installation

Install the package and its Angular peers:

```bash
npm install @im4all/roolith-ng
npm install @angular/common @angular/core @angular/forms
```

Add styles once in your app.
Use `modern @use` syntax and include the library mixins:

```scss
@use '@im4all/roolith-ng/sass/rng-scss' as rng;

@include rng.rng-everything();
```

That single mixin emits CSS variables, reset, typography, grid, layout, and all component styles.
See [Theming](#theming) to customize tokens or enable dark mode.

## Quick start

Import only what you need.
All components are standalone and `OnPush`.

```ts
import { Component } from '@angular/core';
import { ButtonComponent, CardComponent } from '@im4all/roolith-ng';

@Component({
  selector: 'app-example',
  imports: [ButtonComponent, CardComponent],
  template: `
    <rng-card>
      <h3>Welcome</h3>
      <rng-button variant="primary" (clickEvent)="save()">Get started</rng-button>
    </rng-card>
  `,
})
export class ExampleComponent {
  save() {
    console.log('clicked');
  }
}
```

No `NgModule` setup is required.
Each component can be lazy-loaded like any other standalone component.

## Forms

All inputs implement Angular signal forms (`FormValueControl` / `FormCheckboxControl` from `@angular/forms/signals`).
They expose `value` / `checked` as `model()` and also accept a `field` from `form()`.

### Two-way binding (simple, no form)

```html
<rng-text-input [(value)]="name" label="Full name" placeholder="Ada Lovelace" />
<rng-select-input [(value)]="country" [data]="countries" label="Country" placeholder="Choose" />
<rng-checkbox-input [(checked)]="accepted" />
<p>{{ name() }} - {{ country()?.label }}</p>
```

```ts
import { Component, signal } from '@angular/core';
import {
  CheckboxInputComponent,
  SelectInputComponent,
  TextInputComponent,
} from '@im4all/roolith-ng';

@Component({
  imports: [TextInputComponent, SelectInputComponent, CheckboxInputComponent],
  templateUrl: './example.html',
})
export class SimpleForm {
  name = signal('');
  country = signal<ISelectInput | undefined>(undefined);
  accepted = signal(false);
  countries: ISelectInput[] = [
    { label: 'Bangladesh', value: 'BD' },
    { label: 'USA', value: 'US' },
  ];
}
```

### Signal form (validation, disabled, errors)

```ts
import { Component, signal } from '@angular/core';
import { form, Field } from '@angular/forms/signals';
import { TextInputComponent, SelectInputComponent } from '@im4all/roolith-ng';

@Component({
  imports: [TextInputComponent, SelectInputComponent, Field],
  template: `
    <rng-text-input [field]="userForm.name" label="Name" placeholder="Name" />
    <rng-select-input [field]="userForm.country" [data]="countries" label="Country" />
  `,
})
export class SignalForm {
  model = signal({ name: '', country: undefined as ISelectInput | undefined });
  userForm = form(this.model);
  countries: ISelectInput[] = [
    { label: 'Bangladesh', value: 'BD' },
    { label: 'USA', value: 'US' },
  ];
}
```

Validation, `disabled`, `readonly`, `required`, `invalid`, and `hint` / `errorMessage` are handled by the field.
Do not mix this with `FormControl` / `ngModel` APIs.

## Components

Import from `@im4all/roolith-ng`.
All selectors start with `rng-`.

### Layout and navigation

| Component      | Selector                   | Import                              | Typical props                                                                      |
| -------------- | -------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------- |
| Card           | `rng-card`                 | `CardComponent`                     | slots for header, body, footer                                                     |
| Accordion      | `rng-accordion`            | `AccordionComponent`                | `allowMultiple`, `bordered` - contains `rng-accordion-item` (`header`, `expanded`) |
| Tab            | `rng-tab`                  | `TabComponent`                      | `*rngTabContentOf` for tab panels                                                  |
| Drawer         | `rng-drawer`               | `DrawerComponent` / `IMPORT_DRAWER` | trigger via `[rngDrawerTarget]`                                                    |
| Nav / NavGroup | `rng-nav`, `rng-nav-group` | `NavComponent`, `NavGroupComponent` | `INavItem[]`, collapsible groups                                                   |
| List           | `rng-list`                 | `ListComponent`                     | `IListItem[]`                                                                      |
| Breadcrumb     | `rng-breadcrumb`           | `BreadcrumbComponent`               | `IBreadcrumbItem[]`                                                                |
| Pagination     | `rng-pagination`           | `PaginationComponent`               | `paginate`, `perPage`, `totalRecords` - emits `IPaginationEvent`                   |

### Actions

| Component        | Selector                          | Key inputs                                                                                                                                                                |
| ---------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Button           | `rng-button`                      | `variant` (`default`, `primary`, `secondary`, `danger`), `size`, `icon` (Iconoir `IconNameType`), `iconPosition`, `block`, `showLoading`, `disabled`, `clickEvent` output |
| Button Group     | `rng-button-group`                | wraps `rng-button`                                                                                                                                                        |
| Button Split     | `rng-button-split`                | split primary + dropdown actions                                                                                                                                          |
| Toggle Group     | `rng-toggle-group`                | single/multi toggle                                                                                                                                                       |
| Icon             | `rng-icon`                        | `name` (Iconoir class), `size`, `custom` for non-Iconoir                                                                                                                  |
| Badge / Extended | `rng-badge`, `rng-badge-extended` | `variant`, `size`                                                                                                                                                         |

```html
<rng-button variant="primary" icon="check" (clickEvent)="onSave()">Save</rng-button>
<rng-icon name="search" size="large" />
<rng-badge>New</rng-badge>
```

### Inputs (14)

All are `OnPush` and support `[field]` or `[(value)]` / `[(checked)]`.

| Component        | Selector                                                               |
| ---------------- | ---------------------------------------------------------------------- |
| Text             | `rng-text-input`                                                       |
| Number           | `rng-number-input`                                                     |
| Textarea         | `rng-textarea-input`                                                   |
| Search           | `rng-search-input`                                                     |
| Checkbox         | `rng-checkbox-input`                                                   |
| Radio            | `rng-radio-input`                                                      |
| Switch           | `rng-switch-input`                                                     |
| Select           | `rng-select-input` (`data: ISelectInput[]`, `searchable`, `showClear`) |
| Multi Select     | `rng-multi-select-input`                                               |
| Select Plain     | `rng-select-plain`                                                     |
| File             | `rng-file-input`                                                       |
| Date Picker      | `rng-date-picker-input` (with `rng-calendar`, `luxon` `DateTime`)      |
| Time Picker      | `rng-time-picker-input`                                                |
| Date Time Picker | `rng-date-time-picker-input`                                           |

```html
<rng-date-picker-input [field]="form.dueDate" label="Due date" />
<rng-time-picker-input [(value)]="startTime" label="Start" />
```

### Data

| Component / Primitive   | Selector                           | Notes                                                                                                                                                                                                                                                                                                                     |
| ----------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Table                   | `rng-table`                        | `data: ITableData[]`, `columns: ITableColumn[]`, `sortableColumns`, `defaultSort`, `paginate`, `perPage`, `stickyConfig`, `expandableRows`, `allowSelection`. Emits `cellClickEvent`, `cellEditEvent`, `selectionChange`. Directives: `[rngTableCell]`, `[rngTableCellEdit]`, `[rngTableSticky]`. Helpers: `IMPORT_TABLE` |
| Loader                  | `rng-loader`, `rng-inline-loader`  | `LoaderService` for global loading                                                                                                                                                                                                                                                                                        |
| Progress                | `rng-progress`                     | `value` 0-100                                                                                                                                                                                                                                                                                                             |
| Message / Block Message | `rng-message`, `rng-block-message` | `variant`, dismissible                                                                                                                                                                                                                                                                                                    |

Table example:

```ts
import { TableComponent, ITableColumn, ITableData } from '@im4all/roolith-ng';

@Component({
  imports: [TableComponent],
  template: `
    <rng-table
      [data]="rows"
      [columns]="cols"
      [sortableColumns]="['customer']"
      [paginate]="true"
      [perPage]="10"
      (cellClickEvent)="onCell($event)"
    />
  `,
})
export class Orders {
  cols: ITableColumn[] = [
    { field: 'customer', label: 'Customer', clickable: true },
    { field: 'amount', label: 'Amount', align: 'right' },
    { field: 'status', label: 'Status' },
  ];
  rows: ITableData[] = [
    { customer: 'Acme', amount: '$4,250', status: 'Paid' },
    { customer: 'Stark Ltd.', amount: '$1,800', status: 'Pending' },
  ];
  onCell(e: ITableCellClickEvent) {
    console.log(e.row, e.field);
  }
}
```

Use `ITableCellDirective` (`*rngTableCell="amount"`) for custom cell templates and `cellValue()` / `clearAllEdits()` / `saveEdits()` APIs on `TableComponent`.

### Overlays

| Component | Selector       | Import / Service                                                                |
| --------- | -------------- | ------------------------------------------------------------------------------- |
| Dialog    | `rng-dialog`   | `DialogService.open(config): IDialogRef`, `<rng-dialog-host />` must be in root |
| Toast     | `rng-toast`    | `ToastService.success / error / info`, `<rng-toast />` in root                  |
| Dropdown  | `rng-dropdown` | `IMPORT_DROPDOWN` + `[rngDropdownTarget]`                                       |
| Popover   | `rng-popover`  | `IMPORT_POPOVER` + `[rngPopoverTarget]`                                         |
| Tooltip   | `rng-tooltip`  | `[rngTooltip]` directive on any element                                         |

Dialog + Toast example:

```ts
import { Component, inject } from '@angular/core';
import { DialogService, ToastService } from '@im4all/roolith-ng';

@Component({ template: `<rng-dialog-host /><rng-toast />` })
export class Root {
  private dialog = inject(DialogService);
  private toast = inject(ToastService);

  confirm() {
    const ref = this.dialog.open({
      header: 'Delete item?',
      content: 'This cannot be undone.',
      actionButtons: [
        { label: 'Delete', value: 'delete', variant: 'primary' },
        { label: 'Cancel', value: 'cancel' },
      ],
    });
    ref.event.subscribe((e) => {
      if (e?.value === 'delete') this.toast.success('Deleted');
      ref.destroy();
    });
  }
}
```

Dropdown / Popover / Drawer pattern:

```html
<rng-dropdown>
  <button rngDropdownTarget>Actions</button>
  <ng-template>Dropdown content</ng-template>
</rng-dropdown>

<rng-drawer>
  <button rngDrawerTarget>Open</button>
  <ng-template>Drawer panel</ng-template>
</rng-drawer>
```

### Filtering

| Primitive      | Selector                   | Import                                                         |
| -------------- | -------------------------- | -------------------------------------------------------------- |
| Filter         | `rng-filter`               | `FilterComponent` (`filterableFields`, `value`, `changeEvent`) |
| Filter Button  | `rng-filter-button`        | `FilterButtonComponent`                                        |
| Field template | `[rngFilterFieldTemplate]` | `FilterFieldTemplateDirective`                                 |

For local data, use `FilterEngine`:

```ts
import { FilterEngine } from '@im4all/roolith-ng';

const engine = new FilterEngine<Row>(filters);
const filtered = engine.apply(rows);
```

Filter types: `equals`, `contains` (extend via `IFilterableField`), wildcard `field: '*'` searches all fields, and per-item `operator: 'and' | 'or'`.

## Theming

Override design tokens without forking components.

Tokens live in `@im4all/roolith-ng/sass/_settings.scss`.
Override before including mixins:

```scss
@use '@im4all/roolith-ng/sass/rng-scss' as rng with (
  $primary-color: #0b7285,
  $border-radius: 8px,
  $grid-layout: traditional
);

@include rng.rng-everything();
```

Or override CSS variables at runtime:

```scss
:root {
  --rng-color-primary: #0b7285;
  --rng-border-radius: 8px;
}
```

Mixins available in `rng-scss.scss`:

- `rng-everything()` - everything (recommended).
- `rng-base-style()` - variables, reset, typography.
- `rng-modules-style()` - component styles.
- `rng-layout-style()` - grid and layout.
- `rng-state-style()` - state helpers.

### Dark mode

The library emits a `.theme-dark` variant for all components:

```html
<html class="theme-dark"></html>
```

Toggle via class or `localStorage`:

```ts
document.documentElement.classList.toggle('theme-dark', theme === 'dark');
localStorage.setItem('theme', theme);
```

Variables for dark mode are defined in `@im4all/roolith-ng/sass/_css-var.scss` (e.g. `--rng-surface-bg-color`, `--rng-border-color`).
Add brand themes the same way.

### Icons

`rng-icon` uses Iconoir by default.

```html
<rng-icon name="check" />
<rng-icon name="search" size="small" />
<!-- custom SVG/font -->
<rng-icon name="my-custom-icon" [custom]="true" />
```

See `IconNameType` in `@im4all/roolith-ng` and Iconoir docs at https://iconoir.com/.

## Requirements and compatibility

- Angular `>=21.0.0`, `rxjs ~7.8.0`, `typescript ~5.9`.
- `lodash-es ^4.17.21`, `luxon ^3.7.2`, `tslib ^2.3.0` are installed with the library.
- Browsers: evergreen (ES2022 target).
- Styles require SCSS with `modern @use`.

## Contributing and local development

This section is only needed if you work on the library itself.

```bash
npm install
npm run build:lib        # builds to dist/roolith-ng
npm run start:demo       # docs app at http://localhost:4200
npm run test:lib         # Vitest + jsdom, coverage via v8
npm run lint             # eslint
```

`ng-packagr` copies `src/sass` to `dist/roolith-ng/sass` and `src/lib` typings to `dist/roolith-ng/types`.
The demo links the built package locally as `@im4all/roolith-ng` via `file:dist/roolith-ng`.

## License

MIT.
See [LICENSE](../../LICENSE).
Copyright (c) 2026 Md Habibullah Al Hadi.
