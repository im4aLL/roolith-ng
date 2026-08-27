import { Component } from '@angular/core';
import { ButtonComponent, TooltipComponent } from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-tooltip',
  imports: [CodeBlock, DocPager, TooltipComponent, ButtonComponent],
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.scss',
})
export class Tooltip {
  /**
   * Snippet for importing `TooltipComponent`.
   */
  protected readonly importSnippet = `import { TooltipComponent } from '@im4all/roolith-ng';

@Component({
  imports: [TooltipComponent]
})`;

  /**
   * Basic usage - plain text tooltip with default position.
   */
  protected readonly basicSnippet = `<rng-tooltip text="Here is the tooltip text">Hover me</rng-tooltip>`;

  /**
   * Basic with button trigger.
   */
  protected readonly basicButtonSnippet = `<rng-tooltip text="Save your changes">
  <rng-button>Save</rng-button>
</rng-tooltip>`;

  /**
   * Positioned tooltips - `top`, `bottom`, `left` and `right`.
   */
  protected readonly positionSnippet = `<!-- Top -->
<rng-tooltip text="Tooltip text" position="top">
  Top trigger
</rng-tooltip>

<!-- Bottom -->
<rng-tooltip text="Tooltip text" position="bottom">
  Bottom trigger
</rng-tooltip>

<!-- Left -->
<rng-tooltip text="Tooltip text" position="left">
  Left trigger
</rng-tooltip>

<!-- Right -->
<rng-tooltip text="Tooltip text" position="right">
  Right trigger
</rng-tooltip>`;

  /**
   * Position values as a TypeScript type.
   */
  protected readonly positionTypeSnippet = `import { TooltipPositionType } from '@im4all/roolith-ng';

type TooltipPositionType = 'top' | 'bottom' | 'left' | 'right';`;

  /**
   * Custom width - controls `max-width` of the tooltip bubble.
   */
  protected readonly widthSnippet = `<!-- Fixed width - adds rng-tooltip__content--limited -->
<rng-tooltip text="Here is the tooltip text with a wider container" width="20rem">
  Hover for wider tooltip
</rng-tooltip>

<!-- Narrow width -->
<rng-tooltip text="Short width example that wraps sooner" width="12rem">
  Narrow
</rng-tooltip>`;

  /**
   * Rich content via `ng-template` - activates large mode (`rng-tooltip--large`).
   */
  protected readonly richContentSnippet = `<rng-tooltip>
  Hover for details

  <ng-template #rngTooltipContent>
    <div class="rng-tooltip__content-hl">Tooltip Header</div>
    <p>Rich description text with more detail.</p>
    <a href="#" class="rng-tooltip__content-button">Action Button</a>
  </ng-template>
</rng-tooltip>`;

  /**
   * Rich content with a button trigger and custom markup.
   */
  protected readonly richButtonSnippet = `<rng-tooltip>
  <rng-button variant="ghost" icon="info">Details</rng-button>

  <ng-template #rngTooltipContent>
    <div class="rng-tooltip__content-hl">Helpful information</div>
    <p style="margin: 0;">This tooltip uses projected HTML via <code>#rngTooltipContent</code> and renders in large mode.</p>
    <a href="#" class="rng-tooltip__content-button">Learn more</a>
  </ng-template>
</rng-tooltip>`;

  /**
   * Rich content with width constraint.
   */
  protected readonly richWidthSnippet = `<rng-tooltip width="22rem">
  Hover for wide rich tooltip

  <ng-template #rngTooltipContent>
    <div class="rng-tooltip__content-hl">Wide rich tooltip</div>
    <p>When <code>width</code> is set the content wrapper receives <code>rng-tooltip__content--limited</code> and an inline <code>max-width</code>.</p>
    <a href="#" class="rng-tooltip__content-button">Action</a>
  </ng-template>
</rng-tooltip>`;

  /**
   * Full example combining plain text, positions and rich content.
   */
  protected readonly fullSnippet = `import { TooltipComponent, ButtonComponent } from '@im4all/roolith-ng';

@Component({
  imports: [TooltipComponent, ButtonComponent]
})
export class ExampleComponent {}`;

  /**
   * Full template markup - plain, positioned and rich tooltips together.
   */
  protected readonly fullTemplateSnippet = `<rng-tooltip text="Here is the tooltip text">
  <rng-button>Default</rng-button>
</rng-tooltip>

<rng-tooltip text="Tooltip text" position="top">
  <rng-button variant="secondary">Top</rng-button>
</rng-tooltip>

<rng-tooltip text="Tooltip text" position="right" width="18rem">
  <rng-button variant="ghost">Right (wide)</rng-button>
</rng-tooltip>

<rng-tooltip>
  <rng-button variant="primary">Rich content</rng-button>

  <ng-template #rngTooltipContent>
    <div class="rng-tooltip__content-hl">Tooltip Header</div>
    <p>Rich description text with more detail.</p>
    <a href="#" class="rng-tooltip__content-button">Action Button</a>
  </ng-template>
</rng-tooltip>`;
}
