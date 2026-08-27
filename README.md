# RoolithNg

A modern, Angular-native UI component library for building enterprise-grade web applications.
`@im4all/roolith-ng` ships standalone Angular components, directives, pipes, and a design-token driven SCSS system so you can compose consistent, accessible, and themeable interfaces.

- Package: `@im4all/roolith-ng`
- Version: `1.0.0`
- Angular: `>=21.0.0` (tested on `21.2.x`, standalone, no `NgModule` required)
- Runtime deps: `lodash-es`, `luxon`, `tslib`
- Bundling: `sideEffects: false`, tree-shakable, `ng-packagr` build

## Features

- Standalone Angular components - import only what you need.
- Token-driven theming via SCSS and CSS variables, with light/dark support out of the box.
- Forms-ready inputs with full `ReactiveForms` and `FormsModule` support.
- Data-heavy building blocks - table with sorting/selection, pagination, filters, and export helpers.
- Overlay primitives - dialog, drawer, dropdown, popover, tooltip, and toast with focus-trapping and stacking.
- Zero global side effects (`sideEffects: false`) and minimal runtime dependencies.

## Requirements

- Node.js `^20.19.0 || ^22.12.0 || >=24` (repo uses `npm@11.11.0`, CI builds on Node `22`).
- Angular `>=21.0.0` with `@angular/common`, `@angular/core`, `@angular/forms` as peer dependencies.

## Installation

```bash
npm install @im4all/roolith-ng
```

Peer dependencies (install matching versions in your app):

```bash
npm install @angular/common @angular/core @angular/forms
```

Other package managers:

```bash
yarn add @im4all/roolith-ng
pnpm add @im4all/roolith-ng
bun add @im4all/roolith-ng
```

## Usage

Import components directly into your standalone components:

```ts
import { Component } from '@angular/core';
import { ButtonComponent, CardComponent } from '@im4all/roolith-ng';

@Component({
  selector: 'app-example',
  imports: [ButtonComponent, CardComponent],
  template: `
    <rng-card header="Hello Roolith">
      <rng-button variant="primary">Get started</rng-button>
    </rng-card>
  `,
})
export class ExampleComponent {}
```

Selectors use the `rng-` prefix (e.g. `<rng-button>`, `<rng-card>`, `<rng-table>`).
Icons use the [Iconoir](https://iconoir.com/) class names (e.g. `<rng-icon name="iconoir-search" />`).

### Forms

Form controls integrate with Angular forms out of the box.
Import `FormsModule` or `ReactiveFormsModule` as needed:

```ts
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent, SelectInputComponent } from '@im4all/roolith-ng';
```

```html
<rng-text-input [(ngModel)]="name" placeholder="Name" />
<rng-select-input [options]="options" formControlName="country" />
```

All inputs support `formControl`, `formControlName`, `ngModel`, `disabled`, `error`, and validation states.

## Components

30+ primitives exported from `projects/roolith-ng/src/lib/index.ts:1`.

| Category | Components |
| --- | --- |
| Layout | `Card`, `Accordion`, `Tab`, `Drawer`, `Nav`, `NavGroup`, `List` |
| Actions & indicators | `Button`, `ButtonGroup`, `ButtonSplit`, `ToggleGroup`, `Icon`, `Badge`, `BadgeExtended` |
| Forms / Inputs | `TextInput`, `NumberInput`, `TextareaInput`, `SearchInput`, `SwitchInput`, `CheckboxInput`, `RadioInput`, `SelectInput`, `MultiSelectInput`, `SelectPlain`, `FileInput`, `DatePicker`, `TimePicker`, `DateTimePicker` |
| Data display | `Table` (sorting/selection/header-checkbox), `Pagination`, `Breadcrumb`, `Progress`, `Loader` (+ `InlineLoader`), `BlockMessage`, `Message`, `Tooltip`, `Popover` |
| Overlay & feedback | `Dialog` (`DialogService`), `Drawer`, `Dropdown`, `Popover`, `Tooltip`, `Toast` |
| Filtering | `Filter`, `FilterButton`, `FilterFieldTemplate` directive, `FilterEngine` utility, `shared.helpers` |

See `projects/demo/src/app/app.routes.ts:1` for a live catalogue of every component with examples.
Directives include `TableCellDirective`, `TableSort`, `FilterFieldTemplate`, `TabContentOf`, and drawer/dialog structural directives.

## Theming

`@im4all/roolith-ng` ships its SCSS system under `@im4all/roolith-ng/sass`.
Use the modern `@use` syntax.

### Base setup (recommended)

Include everything - tokens, reset, typography, components, grid, and state helpers - in your global `styles.scss`:

```scss
@use '@im4all/roolith-ng/sass/rng-scss' as rng;

@include rng.rng-everything();
```

The demo app does this in `projects/demo/src/styles.scss:1`.

### Modular imports

Pick only what you need (`projects/roolith-ng/src/sass/rng-scss.scss:9`):

```scss
@use '@im4all/roolith-ng/sass/rng-scss' as rng;

@include rng.rng-base-style();    // tokens, reset, typography
@include rng.rng-modules-style(); // components
@include rng.rng-layout-style();  // grid + layout
@include rng.rng-state-style();   // helpers
```

### Runtime overrides (CSS variables)

Override tokens without rebuilding.
All tokens are emitted as `--rng-*` variables from `projects/roolith-ng/src/sass/_css-var.scss:1`:

```scss
:root {
  --rng-color-primary: #4f46e5;
  --rng-color-secondary: #1e1b4b;
  --rng-border-radius: 12px;
  --rng-surface-bg-color: #ffffff;
}

/* dark variant - toggled via class on html/body */
.theme-dark {
  --rng-color-primary: #a8b1ff;
  --rng-surface-bg-color: #1b1b1b;
  --rng-border-color: var(--rng-color-neutral-200);
}
```

Toggle at runtime:

```ts
const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.classList.toggle('theme-dark', isDark);
```

## AI Ready - Agent Skills

`@im4all/roolith-ng` ships an optional, installable agent skill `roolith-ng` so AI coding agents can generate correct `rng-*` markup, theming, and forms code without guesswork.

- Package includes: `skills/roolith-ng/SKILL.md` + `references/` (components, theming, conventions, forms, patterns)
- Not installed automatically - opt-in via installer
- No internal workspace skills (`.agents/skills`, `.opencode/agents`) are included - only `roolith-ng` is published (verified at build)

### Install skills in a consumer app

After `npm install @im4all/roolith-ng`:

```bash
# Install to all detected agents (.agents, .claude, .cursor, .opencode, .codex)
npx roolith-skills
# or via package bin
npx @im4all/roolith-ng add-skills

# Target a specific agent
npx roolith-skills --agent=claude
npx roolith-skills --agent=agents
npx roolith-skills --agent=cursor --force
npx roolith-skills --dry-run   # preview
npx roolith-skills --list      # show installed
```

Installer copies `node_modules/@im4all/roolith-ng/skills/roolith-ng/` to:

- `.agents/skills/roolith-ng/` (OpenCode, generic)
- `.claude/skills/roolith-ng/` (Claude Code)
- `.cursor/skills/roolith-ng/` (Cursor)
- `.opencode/skills/roolith-ng/`, `.codex/skills/roolith-ng/`, `.windsurf/skills/roolith-ng/`, `.github/skills/roolith-ng/` (others)

Multi-agent: `npx roolith-skills --agent=claude,cursor`

Manual copy (no CLI):

```bash
cp -R node_modules/@im4all/roolith-ng/skills/roolith-ng .agents/skills/
cp -R node_modules/@im4all/roolith-ng/skills/roolith-ng .claude/skills/
```

Verify:

```bash
ls .agents/skills/roolith-ng/SKILL.md
ls .claude/skills/roolith-ng/SKILL.md
```

Uninstall: `rm -rf .agents/skills/roolith-ng .claude/skills/roolith-ng .cursor/skills/roolith-ng`

### What the skill gives your agent

- Correct imports from `projects/roolith-ng/src/lib/index.ts:1`, `rng-*` selectors, required setup (`rng-dialog-host`, `rng-toast` host), and forms integration (`ReactiveForms`, `FormsModule`)
- Theming patterns from `projects/roolith-ng/src/sass/rng-scss.scss:9` and `projects/roolith-ng/src/sass/_css-var.scss:1` (global `rng-everything()`, modular imports, CSS variable runtime overrides, SCSS `!default` build-time overrides)
- Conventions from `AGENTS.md:1`: `rem()` not `1px`, no raw tag selectors, Iconoir only, signals, `ng g component --project=<name>`
- Component catalog with snippets sourced from `projects/demo/src/app/components/*/` live examples

Skill file: `skills/roolith-ng/SKILL.md:1`, references: `skills/roolith-ng/references/*`. Source at repo `skills/` is canonical - synced to `projects/roolith-ng/skills/` at build via `scripts/sync-skills.mjs:1` and shipped via `projects/roolith-ng/ng-package.json:8`.

### Build-time overrides (SCSS)

Override `!default` variables in `projects/roolith-ng/src/sass/_settings.scss:1` before including the mixins:

```scss
@use '@im4all/roolith-ng/sass/settings' with (
  $primary-color: #4f46e5,
  $secondary-color: #1e1b4b
);
@use '@im4all/roolith-ng/sass/rng-scss' as rng;

@include rng.rng-everything();
```

See `projects/demo/src/app/components/theming/theming.ts:1` for the full token list and dark-mode reference.

## Demo app (documentation)

The documentation site lives in `projects/demo` and is the canonical usage reference.
It is an Angular application that imports from `@im4all/roolith-ng`.

```bash
# serve docs locally at http://localhost:4200
npm run start:demo
# or
ng serve demo

# production build (output to dist/demo/browser)
npm run build
```

Routes are defined in `projects/demo/src/app/app.routes.ts:1` and cover `guide/getting-started`, `guide/theming`, `guide/components`, and every component page (`components/button`, `components/table`, etc.).

## Development

This repository is an Angular workspace with two projects:

- `projects/roolith-ng` - the publishable library (`@im4all/roolith-ng`, `ng-packagr` build, `prefix: rng`).
- `projects/demo` - the documentation/demo application.

```
projects/roolith-ng/src/lib/   # components, directives, pipes, utils
projects/roolith-ng/src/sass/  # design tokens and component SCSS
projects/demo/src/app/         # docs pages and live examples
```

### Scripts

| Command | Description |
| --- | --- |
| `npm install` | Install workspace dependencies |
| `npm run build:lib` | Build the library to `dist/roolith-ng` |
| `npm run build` | Build the demo app to `dist/demo/browser` |
| `npm run start:demo` | Serve the demo app locally |
| `npm run test:lib` | Run library unit tests with coverage (`vitest`, `jsdom`) |
| `npm run lint` | Lint with `eslint` + `angular-eslint` |

Build output is placed in `dist/roolith-ng` (library) and `dist/demo/browser` (demo SPA).
The demo deploy workflow is in `.github/workflows/deploy.yml:1` (FTP deploy to Hostinger, SPA fallback via `.htaccess`).

### Conventions

- Use Angular CLI generators: `ng g component <path> --project=roolith-ng` (or `demo`).
- Styling is token-driven SCSS - never use component SCSS for ad-hoc styling, do not target raw tags (use classes), use `rem()` from `sass/functions/_rem.scss` instead of raw `px`, and use Iconoir class names for icons.
- Prefer signals over regular variables in components.

## Publishing

After building, publish from the build output (as configured in `projects/roolith-ng/ng-package.json:1` and `projects/roolith-ng/package.json:1`):

```bash
npm run build:lib
cd dist/roolith-ng
npm publish --access public
```

The package is published as `@im4all/roolith-ng` with `publishConfig.access: public`.

## License

See [LICENSE](LICENSE).
MIT - Copyright (c) 2026 Md Habibullah Al Hadi.
