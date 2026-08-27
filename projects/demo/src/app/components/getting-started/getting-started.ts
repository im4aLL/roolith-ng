import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-getting-started',
  imports: [CodeBlock, RouterLink, DocPager],
  templateUrl: './getting-started.html',
  styleUrl: './getting-started.scss',
})
export class GettingStarted {
  protected readonly installNpm = `npm install @im4all/roolith-ng`;
  protected readonly installYarn = `yarn add @im4all/roolith-ng`;
  protected readonly installPnpm = `pnpm add @im4all/roolith-ng`;
  protected readonly installBun = `bun add @im4all/roolith-ng`;

  protected readonly stylesSnippet = `@use '@im4all/roolith-ng/sass/rng-scss' as rng;

@include rng.rng-everything();`;

  protected readonly modularSnippet = `@use '@im4all/roolith-ng/sass/rng-scss' as rng;

// pick only what you need
@include rng.rng-base-style();    // tokens, reset, typography
@include rng.rng-modules-style(); // components
@include rng.rng-layout-style();  // grid + layout
@include rng.rng-state-style();   // helpers`;

  protected readonly overrideSnippet = `:root {
  --rng-color-primary: #4f46e5;
  --rng-border-radius: 12px;
}

/* dark mode */
.theme-dark {
  --rng-color-primary: #a8b1ff;
}`;

  protected readonly usageSnippet = `import { Component } from '@angular/core';
import { ButtonComponent, CardComponent } from '@im4all/roolith-ng';

@Component({
  selector: 'app-example',
  imports: [ButtonComponent, CardComponent],
  template: \`
    <rng-card header="Hello Roolith">
      <rng-button variant="primary">Get started</rng-button>
    </rng-card>
  \`,
})
export class ExampleComponent {}`;

  protected readonly formsSnippet = `import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from '@im4all/roolith-ng';

// template
// <rng-text-input formControlName="email" placeholder="Email" />`;

  protected readonly verifySnippet = `// app.component.ts
import { ButtonComponent } from '@im4all/roolith-ng';

@Component({
  imports: [ButtonComponent],
  template: \`<rng-button variant="primary">It works!</rng-button>\`
})
export class AppComponent {}`;
}
