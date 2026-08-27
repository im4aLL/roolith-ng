import { Component } from '@angular/core';
import { ButtonComponent } from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-button',
  imports: [CodeBlock, DocPager, ButtonComponent],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  /**
   * Snippet for importing `ButtonComponent`.
   */
  protected readonly importSnippet = `import { ButtonComponent } from '@im4all/roolith-ng';

@Component({
  imports: [ButtonComponent]
})`;

  /**
   * Variants markup - all `variant` options.
   */
  protected readonly variantsSnippet = `<rng-button>Default</rng-button>
<rng-button variant="primary">Primary</rng-button>
<rng-button variant="secondary">Secondary</rng-button>
<rng-button variant="success">Success</rng-button>
<rng-button variant="danger">Danger</rng-button>
<rng-button variant="warning">Warning</rng-button>
<rng-button variant="info">Info</rng-button>
<rng-button variant="dark">Dark</rng-button>
<rng-button variant="gray">Gray</rng-button>
<rng-button variant="ghost">Ghost</rng-button>
<rng-button variant="link">Link</rng-button>`;

  /**
   * Sizes markup.
   */
  protected readonly sizesSnippet = `<rng-button size="xsmall">Extra Small</rng-button>
<rng-button size="small">Small</rng-button>
<rng-button>Default</rng-button>
<rng-button size="large">Large</rng-button>`;

  /**
   * With icon markup - left, right and icon-only.
   */
  protected readonly withIconSnippet = `<!-- Icon on the left (default) -->
<rng-button icon="calendar">Schedule</rng-button>

<!-- Icon on the right -->
<rng-button icon="arrow-right" iconPosition="right">Next</rng-button>

<!-- Icon only -->
<rng-button icon="delete" variant="ghost"></rng-button>`;

  /**
   * Loading state markup.
   */
  protected readonly loadingSnippet = `<rng-button [showLoading]="isSaving">Save</rng-button>`;

  /**
   * Disabled state markup.
   */
  protected readonly disabledSnippet = `<rng-button [disabled]="true">Disabled</rng-button>
<rng-button variant="primary" [disabled]="true">Primary Disabled</rng-button>`;

  /**
   * Block (full width) markup.
   */
  protected readonly blockSnippet = `<rng-button [block]="true" variant="primary">Full Width</rng-button>`;

  /**
   * Click event template markup.
   */
  protected readonly clickEventSnippet = `<rng-button variant="primary" (clickEvent)="onSave()">Save</rng-button>`;

  /**
   * Handler for the `clickEvent` output.
   */
  protected readonly clickHandlerSnippet = `onSave(): void {
  console.log('Button clicked');
}`;

  /**
   * Full example component snippet.
   */
  protected readonly fullSnippet = `import { ButtonComponent } from '@im4all/roolith-ng';

@Component({
  imports: [ButtonComponent]
})
export class ExampleComponent {
  isSaving = false;
  clickCount = 0;

  onSave(): void {
    this.clickCount++;
  }
}`;

  /**
   * Full template markup.
   */
  protected readonly fullTemplateSnippet = `<rng-button variant="primary" icon="check" (clickEvent)="onSave()">Save</rng-button>
<rng-button [showLoading]="isSaving">Saving</rng-button>
<rng-button [block]="true" variant="secondary">Full Width</rng-button>`;

  protected isSaving = false;
  protected clickCount = 0;

  /**
   * Handles `clickEvent` from `rng-button` and increments the click counter.
   *
   * @returns void
   */
  protected onSave(): void {
    this.clickCount++;
  }

  /**
   * Handles `clickEvent` for the loading demo - simulates an async save.
   *
   * @returns void
   */
  protected onSavingClick(): void {
    if (this.isSaving) {
      return;
    }

    this.isSaving = true;

    setTimeout(() => {
      this.isSaving = false;
    }, 1500);
  }
}
