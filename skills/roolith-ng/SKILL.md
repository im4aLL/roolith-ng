---
name: roolith-ng
description: Build UI with roolith-ng Angular components using bundled docs when adding a component, looking up props, import path, selector, or usage example.
---

# Roolith-ng

## Purpose

Help the agent use the `roolith-ng` (`@im4all/roolith-ng`) component library with correct imports, selectors, and patterns via the bundled `references/*.md` docs.

## When to Use

Use this skill when the user wants to:

- add or modify UI using a `@im4all/roolith-ng` component
- look up a component's import, selector (`rng-*`), inputs/outputs, or code example
- scaffold an Angular standalone component that consumes `roolith-ng`

Trigger phrases: "roolith component", "rng-*".

## Process

1. **Verify installation:**
   - Check `package.json` for `dependencies` or `devDependencies` containing `@im4all/roolith-ng` (or `roolith-ng` in this workspace).
   - If missing, tell the user to run `npm install @im4all/roolith-ng` and stop until installed.
   - Do not scan `node_modules` for docs; the published package does not ship the component reference docs.

2. **Identify components:**
   - Map the request to the catalog below.
   - If the request is vague, list the catalog and ask which component is needed.

3. **Read the reference:**
   - Read the file at `references/<name>.md` relative to this skill's directory (e.g. `references/button.md`).
   - Prefer `Read` over `Bash` cat; resolve the skill directory via `Glob` for `skills/roolith-ng/SKILL.md` if the consumer installed to `.agents/skills/roolith-ng/` or `skills/roolith-ng/`.
   - Copy imports and selectors verbatim; the docs already use `@im4all/roolith-ng`.

4. **Apply the pattern:**
   - Import the standalone component(s) in `imports: [...]` (e.g. `import { ButtonComponent } from '@im4all/roolith-ng'`).
   - Use `rng-` selectors and signal variables. For icons, use `<rng-icon>` with a built-in `name` from `IconNameType` (e.g. `name="search"`); use `[custom]="true"` with the class name(s) for third-party icon fonts or custom SVGs. For spacing, use `rem()` via `@use '@im4all/roolith-ng/sass/functions/rem'` in consumer SCSS. Never select raw tags in SCSS and never use component SCSS for styling.
   - Paste usage from the doc's `Usage` section and adapt props to the user's requirement.

## Component Catalog

39 docs bundled under `references/`:

| Component              | Reference                              |
| ---------------------- | -------------------------------------- |
| accordion              | `references/accordion.md`              |
| badge                  | `references/badge.md`                  |
| block-message          | `references/block-message.md`          |
| breadcrumb             | `references/breadcrumb.md`             |
| button                 | `references/button.md`                 |
| button-split           | `references/button-split.md`           |
| card                   | `references/card.md`                   |
| dialog                 | `references/dialog.md`                 |
| drawer                 | `references/drawer.md`                 |
| dropdown               | `references/dropdown.md`               |
| filter                 | `references/filter.md`                 |
| filter-button          | `references/filter-button.md`          |
| icon                   | `references/icon.md`                   |
| list                   | `references/list.md`                   |
| loader                 | `references/loader.md`                 |
| message                | `references/message.md`                |
| nav                    | `references/nav.md`                    |
| pagination             | `references/pagination.md`             |
| popover                | `references/popover.md`                |
| progress               | `references/progress.md`               |
| tab                    | `references/tab.md`                    |
| table                  | `references/table.md`                  |
| toast                  | `references/toast.md`                  |
| toggle-group           | `references/toggle-group.md`           |
| tooltip                | `references/tooltip.md`                |
| checkbox-input         | `references/checkbox-input.md`         |
| date-picker-input      | `references/date-picker-input.md`      |
| date-time-picker-input | `references/date-time-picker-input.md` |
| file-input             | `references/file-input.md`             |
| multi-select-input     | `references/multi-select-input.md`     |
| number-input           | `references/number-input.md`           |
| radio-input            | `references/radio-input.md`            |
| search-input           | `references/search-input.md`           |
| select-input           | `references/select-input.md`           |
| select-plain           | `references/select-plain.md`           |
| switch-input           | `references/switch-input.md`           |
| text-input             | `references/text-input.md`             |
| textarea-input         | `references/textarea-input.md`         |
| time-picker-input      | `references/time-picker-input.md`      |

## Output

- Import statement and component usage snippet adapted to the user's task.
- File paths touched and reference file used.
