---
name: roolith-ng
description: Build UI with roolith-ng Angular components using bundled docs when adding a component, looking up props, import path, selector, or usage example.
---

# Roolith-ng

## Purpose

Help the agent use the `roolith-ng` (`@im4all/roolith-ng`) component library with correct imports, selectors, and patterns via the bundled `references/components/**/*.md` docs (copied, no symlink).

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

3. **Read the reference (no symlink):**
   - Read the file at `references/components/<path>` relative to this skill's directory (e.g. `references/components/button/button.md`). Use file copy only, never `ln -s`.
   - Prefer `Read` over `Bash` cat; resolve the skill directory via `Glob` for `skills/roolith-ng/SKILL.md` if the consumer installed to `.agents/skills/roolith-ng/` or `skills/roolith-ng/`.
   - Copy patterns verbatim for import and selector. Consumer projects import from `@im4all/roolith-ng`; this workspace uses `roolith-ng`.

4. **Apply the pattern:**
   - Import the standalone component(s) in `imports: [...]` (e.g. `import { ButtonComponent } from '@im4all/roolith-ng'`).
   - Use `rng-` selectors, Iconoir class names (e.g. `iconoir-search`) via `<rng-icon>`, signal variables, and `rem()` from `sass/functions/_rem.scss` for spacing. Never select raw tags in SCSS and never use component SCSS for styling.
   - Paste usage from the doc's `Usage` section and adapt props to the user's requirement.

5. **Refresh bundled docs when stale (maintainer only):**
   - In this repo, source of truth is `projects/roolith-ng/src/lib/components/**/*.md`.
   - Re-sync with `cp` (not `ln -s`) into `skills/roolith-ng/references/components/` preserving hierarchy. Do not create symlinks.

## Component Catalog

39 docs bundled under `references/components/` (all copied, no symlink):

| Component | Reference |
| --- | --- |
| accordion | `references/components/accordion/accordion.md` |
| badge | `references/components/badge/badge.md` |
| block-message | `references/components/block-message/block-message.md` |
| breadcrumb | `references/components/breadcrumb/breadcrumb.md` |
| button | `references/components/button/button.md` |
| button-split | `references/components/button-split/button-split.md` |
| card | `references/components/card/card.md` |
| dialog | `references/components/dialog/dialog.md` |
| drawer | `references/components/drawer/drawer.md` |
| dropdown | `references/components/dropdown/dropdown.md` |
| filter | `references/components/filter/filter.md` |
| filter-button | `references/components/filter-button/filter-button.md` |
| icon | `references/components/icon/icon.md` |
| list | `references/components/list/list.md` |
| loader | `references/components/loader/loader.md` |
| message | `references/components/message/message.md` |
| nav | `references/components/nav/nav.md` |
| pagination | `references/components/pagination/pagination.md` |
| popover | `references/components/popover/popover.md` |
| progress | `references/components/progress/progress.md` |
| tab | `references/components/tab/tab.md` |
| table | `references/components/table/table.md` |
| toast | `references/components/toast/toast.md` |
| toggle-group | `references/components/toggle-group/toggle-group.md` |
| tooltip | `references/components/tooltip/tooltip.md` |
| checkbox-input | `references/components/inputs/checkbox/checkbox-input.md` |
| date-picker-input | `references/components/inputs/date-picker/date-picker-input.md` |
| date-time-picker-input | `references/components/inputs/date-time-picker/date-time-picker-input.md` |
| file-input | `references/components/inputs/file/file-input.md` |
| multi-select-input | `references/components/inputs/multi-select/multi-select-input.md` |
| number-input | `references/components/inputs/number/number-input.md` |
| radio-input | `references/components/inputs/radio/radio-input.md` |
| search-input | `references/components/inputs/search/search-input.md` |
| select-input | `references/components/inputs/select/select-input.md` |
| select-plain | `references/components/inputs/select-plain/select-plain.md` |
| switch-input | `references/components/inputs/switch/switch-input.md` |
| text-input | `references/components/inputs/text/text-input.md` |
| textarea-input | `references/components/inputs/textarea/textarea-input.md` |
| time-picker-input | `references/components/inputs/time-picker/time-picker-input.md` |

## Output

- Import statement and component usage snippet adapted to the user's task.
- File paths touched and reference file used.
- If docs were refreshed, list the updated `references/components/**/*.md` files.

## Guardrails

- Do not use `ln -s`; always copy with `cp` or `Write`. Verify with `ls -l` that no symlink exists.
- Do not read `projects/roolith-ng/src/lib/components/**/*.md` in consumer projects; read from the bundled `references/components/` inside the installed skill.
- Do not invent props; cite the doc's Inputs table.
- Keep install scope to this skill only: `npx skills add https://github.com/im4aLL/roolith-ng --skill roolith-ng` or `npx skills add https://github.com/im4aLL/roolith-ng/skills --skill roolith-ng`.
