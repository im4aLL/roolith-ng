import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-theming',
  imports: [CodeBlock, RouterLink, DocPager],
  templateUrl: './theming.html',
  styleUrl: './theming.scss',
})
export class Theming {
  /**
   * Tokens emitted by the library mixin.
   *
   * @see projects/roolith-ng/src/sass/_css-var.scss:54
   */
  protected readonly tokenExample = `:root {
  --rng-color-primary: #3e63dd;
  --rng-color-secondary: #0d1b2a;
  --rng-color-warning: #ffbd2e;
  --rng-color-danger: #ff5f56;
  --rng-color-success: #27c93f;
  --rng-color-info: #a8b1ff;
  --rng-color-primary-light: #4d6fe0;   /* color.scale primary 7% */
  --rng-color-primary-lighter: #5c7ce4; /* color.scale primary 14% */
  --rng-color-neutral: #ffffff;
  --rng-color-neutral-900: #171717;
  --rng-color-neutral-300: #e7ecef;
  --rng-surface-bg-color: var(--rng-color-neutral);
  --rng-surface-text-color: var(--rng-color-neutral-900);
  --rng-border-color: var(--rng-color-neutral-300);
  --rng-border-radius: 10px;
  --rng-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.1);
}`;

  /**
   * Dark mode override from the same mixin.
   *
   * @see projects/roolith-ng/src/sass/_css-var.scss:4
   */
  protected readonly darkExample = `.theme-dark {
  --rng-surface-bg-color: #1b1b1b;
  --rng-surface-text-color: var(--rng-color-neutral-600);
  --rng-surface-alt-text-color: var(--rng-color-neutral-900);
  --rng-border-color: var(--rng-color-neutral-200);
  --rng-color-info: #3451b2;
  --rng-color-secondary: #778da9;
  --rng-color-accent: var(--rng-color-primary);
}`;

  /**
   * Runtime override with CSS variables - no rebuild needed.
   */
  protected readonly cssOverride = `:root {
  --rng-color-primary: #4f46e5;
  --rng-color-secondary: #1e1b4b;
  --rng-border-radius: 12px;
  --rng-surface-bg-color: #ffffff;
}

/* dark variant */
.theme-dark {
  --rng-color-primary: #a8b1ff;
  --rng-surface-bg-color: #1b1b1b;
  --rng-border-color: var(--rng-color-neutral-200);
}`;

  /**
   * Build-time override with SCSS !default variables.
   *
   * @see projects/roolith-ng/src/sass/_settings.scss:34
   */
  protected readonly scssOverride = `@use '@im4all/roolith-ng/sass/settings' with (
  $primary-color: #4f46e5,
  $secondary-color: #1e1b4b,
  $border-radius: 12px
);
@use '@im4all/roolith-ng/sass/rng-scss' as rng;

@include rng.rng-everything();`;

  /**
   * Custom theme class - ship a brand palette without forking.
   */
  protected readonly customExample = `.theme-brand {
  --rng-color-primary: #0b7285;
  --rng-color-secondary: #15aabf;
  --rng-color-accent: var(--rng-color-primary);
  --rng-color-accent-light: hsl(from var(--rng-color-accent) h s calc(l - 5));
  --rng-border-color: var(--rng-color-neutral-300);
}`;

  /**
   * Toggling dark mode at runtime.
   */
  protected readonly toggleExample = `// toggle dark mode
const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.classList.toggle('theme-dark', isDark);

// listen for OS changes
window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (e) => {
    document.documentElement.classList.toggle('theme-dark', e.matches);
  });`;

  /**
   * Modular import alternative to rng-everything.
   *
   * @see projects/roolith-ng/src/sass/rng-scss.scss:77
   */
  protected readonly modularExample = `@use '@im4all/roolith-ng/sass/rng-scss' as rng;

// pick only what you need
@include rng.rng-base-style();    // tokens, reset, typography
@include rng.rng-modules-style(); // components
@include rng.rng-layout-style();  // grid + layout
@include rng.rng-state-style();   // helpers`;

  /**
   * Complete :root block emitted by css-variable mixin.
   *
   * @see projects/roolith-ng/src/sass/_css-var.scss:54
   * @see projects/roolith-ng/src/sass/_settings.scss:34
   */
  protected readonly completeList = `:root {
  /* base */
  --rng-base-font-size: 16px;
  --rng-base-font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  /* brand and semantic */
  --rng-color-primary: #3e63dd;
  --rng-color-primary-light: #4c6edf;
  --rng-color-primary-lighter: #5979e2;
  --rng-color-secondary: #0d1b2a;
  --rng-color-secondary-light: #18314d;
  --rng-color-secondary-dark: #0c1826;
  --rng-color-warning: #ffbd2e;
  --rng-color-danger: #ff5f56;
  --rng-color-success: #27c93f;
  --rng-color-info: #a8b1ff;

  /* neutral scale - light (theme-default) */
  --rng-color-neutral: #ffffff;
  --rng-color-neutral-50: #f5f7f9;
  --rng-color-neutral-100: #ecf0f2;
  --rng-color-neutral-150: #ebeff1;
  --rng-color-neutral-200: #e9eef1;
  --rng-color-neutral-300: #e7ecef;
  --rng-color-neutral-400: #cbd6dc;
  --rng-color-neutral-500: #afbfc9;
  --rng-color-neutral-600: #8b8b8b;
  --rng-color-neutral-700: #5d5d5d;
  --rng-color-neutral-800: #2e2e2e;
  --rng-color-neutral-900: #171717;

  /* surface and accent - light */
  --rng-surface-bg-color: var(--rng-color-neutral);
  --rng-surface-text-color: var(--rng-color-neutral-900);
  --rng-surface-alt-text-color: var(--rng-color-neutral-100);
  --rng-border-color: var(--rng-color-neutral-300);
  --rng-color-accent: var(--rng-color-primary);
  --rng-color-accent-light: hsl(from var(--rng-color-accent) h s calc(l - 5));
  --rng-color-accent-dark: hsl(from var(--rng-color-accent) h s calc(l + 5));

  /* typography weights */
  --rng-font-weight-regular: 400;
  --rng-font-weight-semi-bold: 500;
  --rng-font-weight-bold: 700;

  /* animation */
  --rng-animation-easing: cubic-bezier(1, 0, 0, 1);
  --rng-animation-duration: 0.25s;

  /* misc */
  --rng-border-radius: 10px;
  --rng-focus-outline: 0.0625rem dotted rgba(62, 99, 221, 0.3);
  --rng-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.1);
  --rng-shadow-small: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
  --rng-shadow-xsmall: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  /* dark mode overrides are in .theme-dark - see below */
}

.theme-dark {
  --rng-color-neutral: var(--rng-surface-bg-color);
  --rng-color-neutral-50: hsl(from var(--rng-color-neutral) h s 6%);
  --rng-color-neutral-100: hsl(from var(--rng-color-neutral) h s 12%);
  --rng-color-neutral-150: hsl(from var(--rng-color-neutral) h s 17%);
  --rng-color-neutral-200: hsl(from var(--rng-color-neutral) h s 22%);
  --rng-color-neutral-300: hsl(from var(--rng-color-neutral) h s 35%);
  --rng-color-neutral-400: hsl(from var(--rng-color-neutral) h s 50%);
  --rng-color-neutral-500: hsl(from var(--rng-color-neutral) h s 65%);
  --rng-color-neutral-600: hsl(from var(--rng-color-neutral) h s 78%);
  --rng-color-neutral-700: hsl(from var(--rng-color-neutral) h s 88%);
  --rng-color-neutral-800: hsl(from var(--rng-color-neutral) h s 94%);
  --rng-color-neutral-900: hsl(from var(--rng-color-neutral) h s 98%);
  --rng-surface-bg-color: #1b1b1b;
  --rng-surface-text-color: var(--rng-color-neutral-600);
  --rng-surface-alt-text-color: var(--rng-color-neutral-900);
  --rng-border-color: var(--rng-color-neutral-200);
  --rng-color-info: #3451b2;
  --rng-color-secondary: #778da9;
  --rng-color-primary-light: hsl(from var(--rng-color-primary) h s 40%);
  --rng-color-primary-lighter: hsl(from var(--rng-color-primary) h s 60%);
  --rng-color-accent: var(--rng-color-primary);
}`;
}
