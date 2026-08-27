# AGENTS.md

- projects/demo is the documentation project for the library projects/roolith-ng.
- Never use component's SCSS for styling.
- Do not use component as style selector in SCSS files.
- For icon use https://iconoir.com/ icon class name, not SVG.
- Do not run demo project I will run and test myself.
- Do not write unit test for demo project.
- When creating new component run `ng g component <component-name-and-path> --project=<name>` command to generate component files.
- When creating new service, directive, pipe use angular CLI command to generate files.
- Document methods in the demo project with JSDoc block comments.
- In JSDoc, add a blank line between the description and the `@param`/`@returns` tags.
- Use backticks for code snippets in components.
- When writing styles never select raw tags e.g. .example a, .example code. Use classes instead. e.g. .example-link, .example-code.
- Never use direct pixel values such as `1px`; use `rem(1)` instead (via `sass/functions/_rem.scss`).
- In component prefer signal variable over regular variable.
