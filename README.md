# RoolithNg

**Documentation: https://roolith-ng.habibhadi.com/**

A modern, Angular-native UI component library for building consistent, accessible enterprise apps.
Standalone components, signal-based inputs, a full table stack, and overlay primitives - all themed through SCSS design tokens.

- Package: `@im4all/roolith-ng`
- Angular: `>=21.0.0`
- Standalone, tree-shakable, no `NgModule` required
- MIT Licensed

## Installation

```bash
npm install @im4all/roolith-ng
```

Peer dependencies: `@angular/common`, `@angular/core`, `@angular/forms`.

Add styles once in your app with `modern @use` syntax:

```scss
@use '@im4all/roolith-ng/sass/rng-scss' as rng;

@include rng.rng-everything();
```

## Components

26 components, standalone and tree-shakable.
Layout, actions, 14 form inputs, data tables, overlays, and filtering - all prefixed with `rng-`.

See the full list with live previews: https://roolith-ng.habibhadi.com/guide/components

## AI agent ready

Roolith NG ships an installable `roolith-ng` skill so AI coding agents use correct `rng-*` APIs instead of hallucinating props.
Install once - your agent reads 39 bundled references and follows project conventions.

```bash
npx skills add https://github.com/im4aLL/roolith-ng/skills --skill roolith-ng
```

## Documentation

For full API docs, usage examples, theming, and live previews, visit https://roolith-ng.habibhadi.com/.

## License

MIT.
