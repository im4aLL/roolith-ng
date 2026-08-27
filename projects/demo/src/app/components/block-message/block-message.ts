import { Component } from '@angular/core';
import { BlockMessageComponent } from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-block-message',
  imports: [CodeBlock, DocPager, BlockMessageComponent],
  templateUrl: './block-message.html',
  styleUrl: './block-message.scss',
})
export class BlockMessage {
  /**
   * Snippet for importing `BlockMessageComponent`.
   */
  protected readonly importSnippet = `import { BlockMessageComponent } from '@im4all/roolith-ng';

@Component({
  imports: [BlockMessageComponent]
})`;

  /**
   * Basic usage without a header.
   */
  protected readonly basicSnippet = `<rng-block-message>No items to display yet.</rng-block-message>`;

  /**
   * Usage with a header above the description.
   */
  protected readonly withHeaderSnippet = `<rng-block-message header="Hint">
  Select an item to view its details. Use the controls above to make a selection.
</rng-block-message>`;

  /**
   * Custom height markup - the container height is set via inline style.
   */
  protected readonly heightSnippet = `<rng-block-message
  header="No results"
  height="220px">
  No data available for the selected filters.
</rng-block-message>`;

  /**
   * Full example combining `header` and `height`.
   */
  protected readonly fullSnippet = `<rng-block-message
  header="No results"
  height="300px">
  No data available for the selected filters. Try adjusting the filters or clearing the search.
</rng-block-message>`;
}
