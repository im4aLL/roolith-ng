import { Component } from '@angular/core';
import { ButtonSplitComponent, IconComponent } from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-button-split',
  imports: [CodeBlock, DocPager, ButtonSplitComponent, IconComponent],
  templateUrl: './button-split.html',
  styleUrl: './button-split.scss',
})
export class ButtonSplit {
  /**
   * Snippet for importing `ButtonSplitComponent`.
   */
  protected readonly importSnippet = `import { ButtonSplitComponent } from '@im4all/roolith-ng';

@Component({
  imports: [ButtonSplitComponent]
})`;

  /**
   * Basic usage markup - plain text content.
   */
  protected readonly basicSnippet = `<rng-button-split (clickEvent)="onAction()">Split Button</rng-button-split>`;

  /**
   * With leading icon and rich text markup - demonstrates content projection.
   */
  protected readonly withIconSnippet = `<rng-button-split (clickEvent)="onRemove()">
  <rng-icon name="filter" />
  Status
  <em>is</em>
  'active'
</rng-button-split>`;

  /**
   * Custom action icon markup.
   */
  protected readonly customActionIconSnippet = `<rng-button-split
  actionIcon="delete"
  (clickEvent)="onDelete()">
  Delete Item
</rng-button-split>`;

  /**
   * Sizes markup - all `size` options.
   */
  protected readonly sizesSnippet = `<rng-button-split size="xsmall" (clickEvent)="onAction()">Extra Small</rng-button-split>
<rng-button-split size="small" (clickEvent)="onAction()">Small</rng-button-split>
<rng-button-split (clickEvent)="onAction()">Default</rng-button-split>
<rng-button-split size="large" (clickEvent)="onAction()">Large</rng-button-split>`;

  /**
   * Click event template markup.
   */
  protected readonly clickEventSnippet = `<rng-button-split (clickEvent)="onAction()">Split Button</rng-button-split>`;

  /**
   * Handler for the `clickEvent` output.
   */
  protected readonly clickHandlerSnippet = `onAction(): void {
  console.log('Split button action clicked');
}`;

  /**
   * Full example component snippet.
   */
  protected readonly fullSnippet = `import { ButtonSplitComponent } from '@im4all/roolith-ng';

@Component({
  imports: [ButtonSplitComponent]
})
export class ExampleComponent {
  onAction(): void {
    console.log('Split button action clicked');
  }
}`;

  /**
   * Full template markup.
   */
  protected readonly fullTemplateSnippet = `<rng-button-split (clickEvent)="onAction()">Split Button</rng-button-split>

<rng-button-split actionIcon="delete" (clickEvent)="onDelete()">
  Delete Item
</rng-button-split>

<rng-button-split size="small" (clickEvent)="onAction()">
  <rng-icon name="filter" />
  Status
  <em>is</em>
  'active'
</rng-button-split>`;

  protected clickCount = 0;
  protected customClickCount = 0;
  protected richClickCount = 0;

  /**
   * Handles `clickEvent` from the basic split button and increments the click counter.
   *
   * @returns void
   */
  protected onAction(): void {
    this.clickCount++;
  }

  /**
   * Handles `clickEvent` from the custom action icon demo.
   *
   * @returns void
   */
  protected onCustomAction(): void {
    this.customClickCount++;
  }

  /**
   * Handles `clickEvent` from the rich content demo.
   *
   * @returns void
   */
  protected onRichAction(): void {
    this.richClickCount++;
  }
}
