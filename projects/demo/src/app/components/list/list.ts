import { Component } from '@angular/core';
import { IListItem, ListComponent } from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-list',
  imports: [CodeBlock, DocPager, ListComponent],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {
  /**
   * Snippet for importing `ListComponent`.
   */
  protected readonly importSnippet = `import { ListComponent } from '@im4all/roolith-ng';

@Component({
  imports: [ListComponent]
})`;

  /**
   * Basic usage markup - list without titles.
   */
  protected readonly basicSnippet = `<rng-list [items]="items" />`;

  /**
   * Basic data for the content-only demo.
   */
  protected readonly basicDataSnippet = `import { IListItem } from '@im4all/roolith-ng';

items: IListItem[] = [
  { content: 'Item one' },
  { content: 'Item two' },
  { content: 'Item three' },
];`;

  /**
   * With titles data - each item has a header.
   */
  protected readonly withTitlesDataSnippet = `items: IListItem[] = [
  { title: 'First', content: 'Description for item one' },
  { title: 'Second', content: 'Description for item two' },
];`;

  /**
   * With titles template markup - same selector, titles render automatically.
   */
  protected readonly withTitlesSnippet = `<rng-list [items]="items" />`;

  /**
   * Rendered structure per item when `title` is present.
   */
  protected readonly structureSnippet = `<li class="rng-list__item">
  <div class="rng-list__header">First</div>
  <div class="rng-list__content">Description for item one</div>
</li>`;

  /**
   * Rendered structure per item when `title` is omitted.
   */
  protected readonly structureWithoutTitleSnippet = `<li class="rng-list__item">
  <div class="rng-list__content">Item one</div>
</li>`;

  /**
   * Full example combining plain and titled items.
   */
  protected readonly fullSnippet = `import { IListItem, ListComponent } from '@im4all/roolith-ng';

@Component({
  imports: [ListComponent]
})
export class ExampleComponent {
  items: IListItem[] = [
    { content: 'Item one - content only' },
    { title: 'Features', content: 'All essential features included' },
    { title: 'Support', content: '24/7 customer support available' },
    { content: 'Final note without a title' },
  ];
}`;

  /**
   * Full template markup.
   */
  protected readonly fullTemplateSnippet = `<rng-list [items]="items" />`;

  protected readonly basicItems: IListItem[] = [
    { content: 'Item one' },
    { content: 'Item two' },
    { content: 'Item three' },
  ];

  protected readonly withTitlesItems: IListItem[] = [
    { title: 'First', content: 'Description for item one' },
    { title: 'Second', content: 'Description for item two' },
  ];

  protected readonly mixedItems: IListItem[] = [
    { title: 'Getting Started', content: 'Install the package and import ListComponent' },
    { title: 'Usage', content: 'Pass an array of IListItem to the items input' },
    { content: 'No title - just content rendered inside rng-list__content' },
  ];

  protected readonly fullItems: IListItem[] = [
    { content: 'Item one - content only' },
    { title: 'Features', content: 'All essential features included' },
    { title: 'Support', content: '24/7 customer support available' },
    { content: 'Final note without a title' },
  ];
}
