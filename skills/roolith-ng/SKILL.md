---
name: roolith-ng
description: Build UI with roolith-ng Angular components using bundled docs when adding a component, looking up props, import path, selector, or usage example.
---

# Roolith-ng

## Purpose

Help the agent use the `roolith-ng` (`@im4all/roolith-ng`) component library with correct imports, selectors, and patterns via the bundled `references/*.md` docs (copied, no symlink).

## When to Use

Use this skill when the user wants to:

- add or modify UI using a `roolith-ng` component
- look up a component's import, selector (`rng-*`), inputs/outputs, or code example
- scaffold an Angular standalone component that consumes `roolith-ng`
- verify or update the local copy of component docs

Trigger phrases: "roolith-ng", "add button/card/table/dialog", "roolith component", "rng-*".

## Process

1. **Verify installation:**
   - Check `package.json` for `dependencies` or `devDependencies` containing `@im4all/roolith-ng` (or `roolith-ng` in this workspace).
   - If missing, tell the user to run `npm install @im4all/roolith-ng` and stop until installed.
   - Do not scan `node_modules` for docs; the published package does not ship `*.md` files.

2. **Identify components:**
   - Map the request to the catalog below.
   - If the request is vague, list the catalog and ask which component is needed.

3. **Read the reference:**
   - Read the file at `references/<name>.md` relative to this skill's directory (e.g. `references/button.md`). Use file copy only, never `ln -s`.
   - Prefer `Read` over `Bash` cat; resolve the skill directory via `Glob` for `skills/roolith-ng/SKILL.md` if the consumer installed to `.agents/skills/roolith-ng/` or `skills/roolith-ng/`.
   - Copy imports and selectors verbatim; the docs already use `@im4all/roolith-ng`.

4. **Apply the pattern:**
   - Import the standalone component(s) in `imports: [...]` (e.g. `import { ButtonComponent } from '@im4all/roolith-ng'`).
   - Use `rng-` selectors and signal variables. For icons, use `<rng-icon>` with a built-in `name` from `IconNameType` (e.g. `name="search"`); use Iconoir class names only with `[custom]="true"` (e.g. `name="iconoir-search" [custom]="true"`) and only when the Iconoir CSS is loaded. For spacing, use `rem()` via `@use '@im4all/roolith-ng/sass/functions/rem'` in consumer SCSS. Never select raw tags in SCSS and never use component SCSS for styling.
   - Paste usage from the doc's `Usage` section and adapt props to the user's requirement.

5. **Refresh bundled docs when stale (maintainer only):**
   - In this repo, source of truth is `projects/roolith-ng/src/lib/components/**/*.md`.
   - Re-sync with `cp` (not `ln -s`) each leaf `*.md` into `skills/roolith-ng/references/<name>.md` (flattened, no `components/` subfolders). Do not create symlinks.
   - Leaf filenames are unique across the tree, so flattening is safe. Any relative link in a doc that points to a non-`.md` source file is stale in the flattened copy; prefer inlining or absolute `projects/roolith-ng/...` links in the source docs.

## Component Catalog

39 docs bundled under `references/` (all copied, no symlink):

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
- If docs were refreshed, list the updated `references/*.md` files.

## Guardrails

- Do not use `ln -s`; always copy with `cp` or `Write`. Verify with `ls -l` that no symlink exists.
- Do not read `projects/roolith-ng/src/lib/components/**/*.md` in consumer projects; read from the bundled `references/` inside the installed skill.
- Do not invent props; cite the doc's Inputs table.
- Keep install scope to this skill only: `npx skills add https://github.com/im4aLL/roolith-ng --skill roolith-ng` or `npx skills add https://github.com/im4aLL/roolith-ng/skills --skill roolith-ng`.
