---
name: checkpoint
description: Create a concise git checkpoint commit when the user says "checkpoint".
disable-model-invocation: true
---

# Checkpoint

## Purpose

Turn the current working tree changes into a concise git checkpoint commit.

## When to Use

Use this skill when the user says exactly or effectively: "checkpoint".

## Process

1. Inspect the repo state:
   - `git status --short`
   - `git diff --stat`
   - `git diff`
   - include staged changes with `git diff --cached` if present
2. If there are no staged, unstaged, or untracked changes, report that there is nothing to commit and stop.
3. Summarize the change in a short imperative phrase, based on the actual diff.
4. Build the commit message as `<summary>`. Tickets and Jira are not used, so no ticket prefix is added.
5. Stage all current changes with `git add -A`.
6. Create the commit with `git commit -m "<message>"`.
7. Report the commit hash and message.

## Guardrails

- Do not commit if the diff includes secrets, credentials, or obviously accidental large/generated files; warn the user instead.
- Do not amend, rebase, push, or create tags.
- Keep the summary specific enough to identify the checkpoint, but short enough for a one-line commit subject.
