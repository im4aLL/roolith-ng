import { Component } from '@angular/core';
import { ButtonGroupComponent } from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-button-group',
  imports: [CodeBlock, DocPager, ButtonGroupComponent],
  templateUrl: './button-group.html',
  styleUrl: './button-group.scss',
})
export class ButtonGroup {
  /**
   * Snippet for importing `ButtonGroupComponent`.
   */
  protected readonly importSnippet = `import { ButtonGroupComponent } from '@im4all/roolith-ng';

@Component({
  imports: [ButtonGroupComponent]
})`;

  /**
   * Basic template markup.
   */
  protected readonly basicSnippet = `<rng-button-group
  [labels]="tabs"
  [activeLabel]="activeTab"
  (labelSelected)="onTabSelect($event)"></rng-button-group>`;

  /**
   * Data snippet for the basic example.
   */
  protected readonly dataSnippet = `tabs = ['Overview', 'Details', 'History'];
activeTab = 'Overview';

onTabSelect(label: string): void {
  this.activeTab = label;
}`;

  /**
   * Size variant markup.
   */
  protected readonly sizeSnippet = `<rng-button-group
  [labels]="tabs"
  [activeLabel]="activeTab"
  size="small"
  (labelSelected)="onTabSelect($event)"></rng-button-group>

<rng-button-group
  [labels]="tabs"
  [activeLabel]="activeTab"
  size="large"
  (labelSelected)="onTabSelect($event)"></rng-button-group>`;

  /**
   * Handler snippet for `labelSelected`.
   */
  protected readonly handlerSnippet = `onTabSelect(label: string): void {
  this.activeTab = label;
}`;

  /**
   * Full example component snippet.
   */
  protected readonly fullSnippet = `import { ButtonGroupComponent } from '@im4all/roolith-ng';

@Component({
  imports: [ButtonGroupComponent]
})
export class ExampleComponent {
  tabs = ['Overview', 'Details', 'History'];
  activeTab = 'Overview';

  onTabSelect(label: string): void {
    this.activeTab = label;
  }
}`;

  /**
   * Full template markup.
   */
  protected readonly fullTemplateSnippet = `<rng-button-group
  [labels]="tabs"
  [activeLabel]="activeTab"
  (labelSelected)="onTabSelect($event)"></rng-button-group>`;

  protected tabs = ['Overview', 'Details', 'History'];
  protected activeTab = 'Overview';

  /**
   * Handles `labelSelected` from `rng-button-group` and updates the active tab.
   *
   * @param label The label that was selected.
   *
   * @returns void
   */
  protected onTabSelect(label: string): void {
    this.activeTab = label;
  }
}
