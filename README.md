# RoolithNg

A modern, Angular-native UI component library for building enterprise-grade web applications.
`roolith-ng` ships standalone Angular components, directives, pipes, and a design-token driven
SCSS system so you can compose consistent, accessible, and themeable interfaces.

- Package: `roolith-ng`
- Version: `1.0.0`
- Angular: `>=21.0.0` (21+)
- Runtime deps: `lodash-es`, `luxon`, `tslib`

## Features

- Standalone Angular components (no `NgModule` required for consumption).
- Built-in theming and design tokens via SCSS, with sensible defaults.
- Forms-ready inputs with Angular `ReactiveForms` and `FormsModule` support.
- Data-heavy building blocks: table with sorting/selection, pagination, filters, and export.
- Overlay primitives: dialog, drawer, dropdown, popover, tooltip, and toast.
- Zero global side effects (`sideEffects: false`).

## Installation

```bash
npm install roolith-ng
```

Peer dependencies (install matching versions in your app):

```bash
npm install @angular/common @angular/core @angular/forms
```

## Usage

Import components directly into your standalone components or module:

```ts
import { Component } from '@angular/core';
import { ButtonComponent, CardComponent } from 'roolith-ng';

@Component({
  selector: 'app-example',
  imports: [ButtonComponent, CardComponent],
  template: `
    <rng-card>
      <rng-button variant="primary">Get started</rng-button>
    </rng-card>
  `,
})
export class ExampleComponent {}
```

### Forms

Form controls integrate with Angular forms out of the box. Import `FormsModule` or
`ReactiveFormsModule` as needed:

```ts
import { FormsModule } from '@angular/forms';
import { TextInputComponent, SelectInputComponent } from 'roolith-ng';
```

```html
<rng-text-input [(ngModel)]="name" placeholder="Name" />
<rng-select-input [options]="options" formControlName="country" />
```

## Components

| Category | Components |
| --- | --- |
| Layout | `Card`, `Accordion`, `Tab`, `Drawer`, `Nav`, `NavGroup`, `List` |
| Buttons | `Button`, `ButtonGroup`, `ButtonSplit`, `ToggleGroup`, `Icon`, `Badge`, `BadgeExtended` |
| Inputs | `TextInput`, `NumberInput`, `TextareaInput`, `SearchInput`, `SwitchInput`, `CheckboxInput`, `RadioInput`, `SelectInput`, `MultiSelectInput`, `SelectPlain`, `FileInput`, `DatePicker`, `TimePicker`, `DateTimePicker` |
| Data display | `Table`, `Pagination`, `Breadcrumb`, `Progress`, `BlockMessage`, `Message`, `Tooltip`, `Popover`, `Loader` |
| Overlay | `Dialog`, `Toast`, `Dropdown`, `Popover` |
| Feedback | `Toast`, `Message`, `BlockMessage`, `Loader`, `Progress` |
| Filtering | `Filter`, `FilterButton`, `FilterFieldTemplate` directive |
| Utilities | Shared helpers (`shared.helpers`) and the `FilterEngine` for client-side filtering |

## Theming

`roolith-ng` ships its SCSS system under `roolith-ng/sass`. Use the modern `@use` syntax and
include the `rng-everything()` mixin to get base styles, design tokens, resets, layout, and
component styles:

```scss
@use 'roolith-ng/sass/rng-scss' as rng;

@include rng.rng-everything();
```

Override the provided SCSS variables or CSS custom properties to customize the look and feel
without forking the components.

## Development

This repository is an Angular workspace containing the `roolith-ng` library under
`projects/roolith-ng`.

```bash
# Install dependencies
npm install

# Build the library
npm run build:lib

# Run unit tests with coverage
npm run test:lib

# Lint
npm run lint
```

The build output is placed in `dist/roolith-ng`.

## Publishing

After building, publish from the build output:

```bash
cd dist/roolith-ng
npm publish
```

## License

See [LICENSE](LICENSE).
