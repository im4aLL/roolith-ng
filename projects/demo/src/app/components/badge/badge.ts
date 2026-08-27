import { Component } from '@angular/core';
import { BadgeComponent, BadgeExtendedComponent } from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-badge',
  imports: [CodeBlock, DocPager, BadgeComponent, BadgeExtendedComponent],
  templateUrl: './badge.html',
  styleUrl: './badge.scss',
})
export class Badge {
  /**
   * Snippet for importing `BadgeComponent`.
   */
  protected readonly importSnippet = `import { BadgeComponent, BadgeExtendedComponent } from '@im4all/roolith-ng';

@Component({
  imports: [BadgeComponent, BadgeExtendedComponent]
})`;

  /**
   * Basic usage markup - all type variants.
   */
  protected readonly basicSnippet = `<rng-badge>Default</rng-badge>
<rng-badge type="primary">Primary</rng-badge>
<rng-badge type="success">Success</rng-badge>
<rng-badge type="danger">Danger</rng-badge>
<rng-badge type="warning">Warning</rng-badge>
<rng-badge type="info">Info</rng-badge>
<rng-badge type="subtle">Subtle</rng-badge>
<rng-badge type="intense">Intense</rng-badge>`;

  /**
   * Large size markup.
   */
  protected readonly largeSnippet = `<rng-badge size="large">Large badge</rng-badge>`;

  /**
   * Status variant markup - icon + label.
   */
  protected readonly statusSnippet = `<rng-badge variant="status" icon="check-solid" iconColor="success">Approved</rng-badge>
<rng-badge variant="status" icon="spinner" iconColor="default">In Progress</rng-badge>
<rng-badge variant="status" icon="minus-circle-solid" iconColor="danger">Rejected</rng-badge>
<rng-badge variant="status" icon="bookmark-circle-solid" iconColor="info">Validated</rng-badge>
<rng-badge variant="status" icon="xmark-solid" iconColor="danger">Deleted</rng-badge>
<rng-badge variant="status" icon="redo-circle-solid" iconColor="secondary">Action Required</rng-badge>`;

  /**
   * Extended badge with plain text.
   */
  protected readonly extendedSnippet = `<rng-badge-extended text="This is extended badge text">
  <rng-badge>Default</rng-badge>
</rng-badge-extended>`;

  /**
   * Extended badge with rich template content.
   */
  protected readonly extendedRichSnippet = `<rng-badge-extended>
  <rng-badge type="success">Active</rng-badge>

  <ng-template #rngBadgeExtendedContent>
    <strong>Status:</strong> All systems operational
  </ng-template>
</rng-badge-extended>`;

  /**
   * Full example combining type, size and status variant.
   */
  protected readonly fullSnippet = `<rng-badge type="primary" size="large">Large Primary</rng-badge>

<rng-badge variant="status" icon="check-solid" iconColor="success">Approved</rng-badge>

<rng-badge-extended text="Awaiting review">
  <rng-badge type="warning">Pending</rng-badge>
</rng-badge-extended>`;
}
