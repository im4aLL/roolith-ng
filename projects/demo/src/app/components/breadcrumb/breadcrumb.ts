import { Component } from '@angular/core';
import { BreadcrumbComponent, IBreadcrumbItem } from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-breadcrumb',
  imports: [CodeBlock, DocPager, BreadcrumbComponent],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss',
})
export class Breadcrumb {
  /**
   * Snippet for importing `BreadcrumbComponent`.
   */
  protected readonly importSnippet = `import { BreadcrumbComponent } from '@im4all/roolith-ng';

@Component({
  imports: [BreadcrumbComponent]
})`;

  /**
   * Snippet for the `IBreadcrumbItem` data model.
   */
  protected readonly dataSnippet = `import { IBreadcrumbItem } from '@im4all/roolith-ng';

breadcrumbs: IBreadcrumbItem[] = [
  { label: 'Home', link: '/home' },
  { label: 'Daily shift overview', link: '/shifts' },
  { label: 'Shift summary' },
];`;

  /**
   * Basic template markup.
   */
  protected readonly basicSnippet = `<rng-breadcrumb
  [data]="breadcrumbs"
  (clickEvent)="onBreadcrumbClick($event)"></rng-breadcrumb>`;

  /**
   * Markup showing the fallback when `link` is omitted.
   */
  protected readonly withoutLinkSnippet = `breadcrumbs: IBreadcrumbItem[] = [
  { label: 'Home', link: '/' },
  { label: 'Category', link: '/category' },
  { label: 'Current page' }, // no link -> renders href="#", styled as active
];`;

  /**
   * Handler for the `clickEvent` output.
   */
  protected readonly clickHandlerSnippet = `import { IBreadcrumbItem } from '@im4all/roolith-ng';

onBreadcrumbClick(item: IBreadcrumbItem): void {
  // default navigation is prevented - handle routing yourself
  console.log(item.label, item.link);
  // e.g. this.router.navigateByUrl(item.link ?? '/');
}`;

  /**
   * Full example combining data and handler.
   */
  protected readonly fullSnippet = `import { BreadcrumbComponent, IBreadcrumbItem } from '@im4all/roolith-ng';

@Component({
  imports: [BreadcrumbComponent]
})
export class ExampleComponent {
  breadcrumbs: IBreadcrumbItem[] = [
    { label: 'Home', link: '/home' },
    { label: 'Library', link: '/library' },
    { label: 'Data' },
  ];

  onBreadcrumbClick(item: IBreadcrumbItem): void {
    console.log('Clicked:', item);
  }
}`;

  /**
   * Full template markup for the combined example.
   */
  protected readonly fullTemplateSnippet = `<rng-breadcrumb
  [data]="breadcrumbs"
  (clickEvent)="onBreadcrumbClick($event)"></rng-breadcrumb>`;

  protected readonly basicBreadcrumbs: IBreadcrumbItem[] = [
    { label: 'Home', link: '/home' },
    { label: 'Daily shift overview', link: '/shifts' },
    { label: 'Shift summary' },
  ];

  protected readonly withLinksBreadcrumbs: IBreadcrumbItem[] = [
    { label: 'Home', link: '/' },
    { label: 'Components', link: '/guide/components' },
    { label: 'Breadcrumb' },
  ];

  protected readonly noLinkBreadcrumbs: IBreadcrumbItem[] = [
    { label: 'Home', link: '/' },
    { label: 'Category', link: '/category' },
    { label: 'Current page' },
  ];

  protected lastClicked: IBreadcrumbItem | null = null;

  /**
   * Handles `clickEvent` from `rng-breadcrumb` and stores the last clicked item for the demo.
   *
   * @param item The breadcrumb item that was clicked.
   *
   * @returns void
   */
  protected onBreadcrumbClick(item: IBreadcrumbItem): void {
    this.lastClicked = item;
  }

  /**
   * Handles `clickEvent` from the full example.
   *
   * @param item The breadcrumb item that was clicked.
   *
   * @returns void
   */
  protected onFullClick(item: IBreadcrumbItem): void {
    this.lastClicked = item;
  }
}
