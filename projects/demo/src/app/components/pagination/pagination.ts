import { Component, computed, signal } from '@angular/core';
import { IPaginationEvent, PageSizeOptionType, PaginationComponent } from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-pagination',
  imports: [CodeBlock, DocPager, PaginationComponent],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {
  /**
   * Snippet for importing `PaginationComponent`.
   */
  protected readonly importSnippet = `import { PaginationComponent } from '@im4all/roolith-ng';

@Component({
  imports: [PaginationComponent]
})`;

  /**
   * Basic usage markup - total with `selectedPageNumber` and `changeEvent`.
   */
  protected readonly basicSnippet = `<rng-pagination
  [total]="total"
  [selectedPageNumber]="currentPage"
  (changeEvent)="onPageChange($event)"></rng-pagination>`;

  /**
   * Basic component state for page tracking.
   */
  protected readonly basicTsSnippet = `total = 120;
currentPage = signal(1);

onPageChange(event: IPaginationEvent): void {
  if (event.page) this.currentPage.set(event.page);
}`;

  /**
   * Custom `perPage` and `maxPageItem` markup.
   */
  protected readonly customSnippet = `<rng-pagination
  [total]="total"
  [perPage]="25"
  [maxPageItem]="5"
  [selectedPageNumber]="currentPage"
  (changeEvent)="onPageChange($event)"></rng-pagination>`;

  /**
   * Handler that covers all `IPaginationEvent` type values.
   */
  protected readonly eventHandlerSnippet = `onPageChange(event: IPaginationEvent): void {
  switch (event.type) {
    case 'pageChange':
    case 'nextPage':
    case 'previousPage':
      this.currentPage.set(event.page!);
      this.loadData();
      break;
    case 'pageSizeChange':
      this.pageSize.set(event.rowsPerPage!);
      this.currentPage.set(1);
      this.loadData();
      break;
  }
}`;

  /**
   * Visibility behaviour - zero and single-page notes.
   */
  protected readonly visibilitySnippet = `<!-- Not rendered - total is 0 -->
<rng-pagination [total]="0" [selectedPageNumber]="1" (changeEvent)="onPageChange($event)"></rng-pagination>

<!-- Single page - navigation hidden, meta (rows per page + info) still visible -->
<rng-pagination [total]="8" [selectedPageNumber]="1" (changeEvent)="onPageChange($event)"></rng-pagination>`;

  /**
   * Wiring pagination to a data slice - computed slice from a larger array.
   */
  protected readonly dataSnippet = `items = Array.from({ length: 47 }, (_, i) => \`Item \${i + 1}\`);
currentPage = signal(1);
pageSize = signal<PageSizeOptionType>(10);

pagedItems = computed(() => {
  const start = (this.currentPage() - 1) * this.pageSize();
  return this.items.slice(start, start + this.pageSize());
});

onPageChange(event: IPaginationEvent): void {
  if (event.type === 'pageSizeChange') {
    this.pageSize.set(event.rowsPerPage!);
    this.currentPage.set(1);
    return;
  }
  if (event.page) this.currentPage.set(event.page);
}`;

  /**
   * Wiring pagination to a data slice - template.
   */
  protected readonly dataTemplateSnippet = `<ul>
  @for (item of pagedItems(); track item) {
    <li>{{ item }}</li>
  }
</ul>

<rng-pagination
  [total]="items.length"
  [perPage]="pageSize()"
  [selectedPageNumber]="currentPage()"
  (changeEvent)="onPageChange($event)"></rng-pagination>`;

  /**
   * Full example combining `perPage`, `maxPageItem` and full event handling.
   */
  protected readonly fullSnippet = `import { PaginationComponent, IPaginationEvent, PageSizeOptionType } from '@im4all/roolith-ng';

@Component({
  imports: [PaginationComponent]
})
export class ExampleComponent {
  total = 120;
  currentPage = signal(1);
  pageSize = signal<PageSizeOptionType>(10);

  onPageChange(event: IPaginationEvent): void {
    switch (event.type) {
      case 'pageChange':
      case 'nextPage':
      case 'previousPage':
        this.currentPage.set(event.page!);
        this.loadData();
        break;
      case 'pageSizeChange':
        this.pageSize.set(event.rowsPerPage!);
        this.currentPage.set(1);
        this.loadData();
        break;
    }
  }

  loadData(): void {
    // fetch page this.currentPage() with this.pageSize()
  }
}`;

  /**
   * Full template for the combined example.
   */
  protected readonly fullTemplateSnippet = `<rng-pagination
  [total]="total"
  [perPage]="pageSize()"
  [maxPageItem]="5"
  [selectedPageNumber]="currentPage()"
  (changeEvent)="onPageChange($event)"></rng-pagination>`;

  protected readonly basicTotal = signal(120);
  protected readonly basicPage = signal(1);
  protected readonly basicTotalPages = computed(() => Math.ceil(this.basicTotal() / 10));

  protected readonly customTotal = signal(120);
  protected readonly customPage = signal(1);
  protected readonly customTotalPages = computed(() => Math.ceil(this.customTotal() / 25));

  protected readonly eventTotal = signal(120);
  protected readonly eventPage = signal(1);
  protected readonly eventPageSize = signal<PageSizeOptionType>(10);
  protected readonly lastEvent = signal<IPaginationEvent | null>(null);

  protected readonly visibilityTotal = signal(47);
  protected readonly visibilityPage = signal(1);

  protected readonly dataTotalItems = Array.from({ length: 47 }, (_, i) => `Item ${i + 1}`);
  protected readonly dataPage = signal(1);
  protected readonly dataPageSize = signal<PageSizeOptionType>(10);
  protected readonly pagedItems = computed(() => {
    const start = (this.dataPage() - 1) * this.dataPageSize();
    return this.dataTotalItems.slice(start, start + this.dataPageSize());
  });

  protected readonly fullTotal = signal(120);
  protected readonly fullPage = signal(1);
  protected readonly fullPageSize = signal<PageSizeOptionType>(10);
  protected readonly fullTotalPages = computed(() => Math.ceil(this.fullTotal() / this.fullPageSize()));

  /**
   * Handles `changeEvent` for the basic demo.
   *
   * @param event The pagination event payload.
   *
   * @returns void
   */
  protected onBasicPageChange(event: IPaginationEvent): void {
    if (event.page) this.basicPage.set(event.page);
  }

  /**
   * Handles `changeEvent` for the custom `perPage`/`maxPageItem` demo.
   *
   * @param event The pagination event payload.
   *
   * @returns void
   */
  protected onCustomPageChange(event: IPaginationEvent): void {
    if (event.type === 'pageSizeChange' && event.rowsPerPage) {
      this.customPage.set(1);
      return;
    }

    if (event.page) this.customPage.set(event.page);
  }

  /**
   * Handles `changeEvent` for the event-types demo and records the last event.
   *
   * Covers all four `type` values. For `pageSizeChange` the page resets to `1` and `rowsPerPage` is used.
   *
   * @param event The pagination event payload.
   *
   * @returns void
   */
  protected onEventPageChange(event: IPaginationEvent): void {
    this.lastEvent.set(event);

    switch (event.type) {
      case 'pageChange':
      case 'nextPage':
      case 'previousPage':
        if (event.page) this.eventPage.set(event.page);
        break;
      case 'pageSizeChange':
        if (event.rowsPerPage) this.eventPageSize.set(event.rowsPerPage as PageSizeOptionType);
        this.eventPage.set(1);
        break;
    }
  }

  /**
   * Handles `changeEvent` for the visibility demo.
   *
   * @param event The pagination event payload.
   *
   * @returns void
   */
  protected onVisibilityPageChange(event: IPaginationEvent): void {
    if (event.type === 'pageSizeChange' && event.rowsPerPage) {
      this.visibilityPage.set(1);
      return;
    }

    if (event.page) this.visibilityPage.set(event.page);
  }

  /**
   * Handles `changeEvent` for the data-slice demo.
   *
   * Syncs both `currentPage` and `pageSize` so the computed `pagedItems` updates.
   *
   * @param event The pagination event payload.
   *
   * @returns void
   */
  protected onDataPageChange(event: IPaginationEvent): void {
    if (event.type === 'pageSizeChange' && event.rowsPerPage) {
      this.dataPageSize.set(event.rowsPerPage as PageSizeOptionType);
      this.dataPage.set(1);
      return;
    }

    if (event.page) this.dataPage.set(event.page);
  }

  /**
   * Handles `changeEvent` for the full example.
   *
   * @param event The pagination event payload.
   *
   * @returns void
   */
  protected onFullPageChange(event: IPaginationEvent): void {
    switch (event.type) {
      case 'pageChange':
      case 'nextPage':
      case 'previousPage':
        if (event.page) this.fullPage.set(event.page);
        break;
      case 'pageSizeChange':
        if (event.rowsPerPage) this.fullPageSize.set(event.rowsPerPage as PageSizeOptionType);
        this.fullPage.set(1);
        break;
    }
  }

  /**
   * Resets the event demo to its initial state.
   *
   * @returns void
   */
  protected resetEventDemo(): void {
    this.eventPage.set(1);
    this.eventPageSize.set(10);
    this.lastEvent.set(null);
  }

  /**
   * Resets the data demo to page 1 with default page size.
   *
   * @returns void
   */
  protected resetDataDemo(): void {
    this.dataPage.set(1);
    this.dataPageSize.set(10);
  }
}
