import { ChangeDetectionStrategy, Component, computed, effect, input, output, signal } from '@angular/core';
import { ISelectInput } from '../inputs/select/data-access/select-input.interface';
import { SelectInputComponent } from '../inputs/select/select-input.component';
import { IPaginationEvent, PageSizeOptionType } from './data-access/pagination.interface';
import { PAGINATION_PAGE_SIZE_OPTIONS } from './data-access/pagination.const';

@Component({
  selector: 'rng-pagination',
  imports: [SelectInputComponent],
  templateUrl: './pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  public total = input.required<number>();
  public maxPageItem = input<number>(10);
  public perPage = input<PageSizeOptionType>(10);
  public selectedPageNumber = input<number>(1);

  public changeEvent = output<IPaginationEvent>();

  /**
   * Local states
   */
  public rowsPerPage = signal<PageSizeOptionType>(PAGINATION_PAGE_SIZE_OPTIONS[0]);
  public currentPage = signal<number>(1);
  public pageNumbers = signal<Array<number | null>>([]);
  public pageSizeOptions = signal<ISelectInput[]>(
    PAGINATION_PAGE_SIZE_OPTIONS.map((size) => ({ label: `${size} rows`, value: size })),
  );

  /**
   * Computed states
   */
  public selectedPageSizeOption = computed(() => {
    const option = this.pageSizeOptions().find((opt) => opt.value === this.rowsPerPage());

    return option || undefined;
  });
  public isShowPagination = computed(() => this.totalPages() > 1);
  public totalPages = computed<number>(() => {
    return Math.ceil(this.total() / this.rowsPerPage());
  });
  public infoText = computed(() => {
    return `Total record${this.total() > 0 ? 's' : ''} ${this.total()}. Showing page ${this.currentPage()} out of ${this.totalPages()}.`;
  });

  /**
   * Effects
   */
  private _perPageEffect = effect(() => {
    this.rowsPerPage.set(this.perPage());
  });

  private _selectedPageEffect = effect(() => {
    this.currentPage.set(this.selectedPageNumber());
  });

  private _currentPageNumberEffect = effect(() => {
    this._generatePageNumbers();
  });

  /**
   * Generate page numbers based on total pages and max page items to display.
   *
   * if number of pages is less than or equal to max page items, show all pages.
   * if [1, 2, 4, 5, 6, 7, 8, 9, 10] and current page is 1, show [1, 2, 3, ..., 9, 10]
   *
   * currentPage	Output
   * 1	[1, 2, 3, 4, '...', 10]
   * 2	[1, 2, 3, 4, '...', 10]
   * 5	[1, '...', 4, 5, 6, '...', 10]
   * 9	[1, '...', 7, 8, 9, 10]
   * 10	[1, '...', 7, 8, 9, 10]
   *
   * @returns void
   */
  // eslint-disable-next-line max-lines-per-function
  private _generatePageNumbers(): void {
    const totalPages = this.totalPages();
    const currentPage = this.currentPage();
    const maxPageItem = this.maxPageItem();

    if (totalPages <= 0) {
      this.pageNumbers.set([]);
      return;
    }

    // If everything fits → show all
    if (totalPages <= maxPageItem) {
      this.pageNumbers.set(Array.from({ length: totalPages }, (_, i) => i + 1));
      return;
    }

    const pages: (number | null)[] = [];

    // Always include first page
    pages.push(1);

    // How many middle slots we can show
    const middleCount = maxPageItem - 2; // excluding first & last

    let start = currentPage - Math.floor(middleCount / 2);
    let end = currentPage + Math.floor(middleCount / 2);

    // Adjust when near edges
    if (start < 2) {
      start = 2;
      end = start + middleCount - 1;
    }

    if (end > totalPages - 1) {
      end = totalPages - 1;
      start = end - middleCount + 1;
    }

    // Left dots
    if (start > 2) {
      pages.push(null);
    }

    // Middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Right dots
    if (end < totalPages - 1) {
      pages.push(null);
    }

    // Always include last page
    pages.push(totalPages);

    this.pageNumbers.set(pages);
  }

  /**
   * Handle page change events for previous, next, and specific page clicks.
   *
   * @param event Event
   * @param payload IPaginationEvent
   * @returns void
   */
  public onPageChange(event: Event, payload: IPaginationEvent): void {
    event.preventDefault();

    let newPage = this.currentPage();

    switch (payload.type) {
      case 'previousPage':
        newPage = Math.max(1, newPage - 1);
        break;
      case 'nextPage':
        newPage = Math.min(this.totalPages(), newPage + 1);
        break;
      case 'pageChange':
        newPage = payload.page || newPage;
        break;
      default:
        return;
    }

    if (newPage === this.currentPage()) {
      return;
    }

    this.currentPage.set(newPage);

    this.changeEvent.emit({ page: newPage, type: payload.type });
  }

  /**
   * Handle changes to the rows per page selection. Reset to page 1 and regenerate page numbers when page size changes.
   *
   * @param event ISelectInput | undefined
   * @returns void
   */
  public onRowPerPageChange(event: ISelectInput | undefined): void {
    if (!event) {
      return;
    }

    const newSize = event.value as PageSizeOptionType;

    if (newSize === this.rowsPerPage()) {
      return;
    }

    this.rowsPerPage.set(newSize);
    this.currentPage.set(1);

    this.changeEvent.emit({ page: 1, type: 'pageSizeChange', rowsPerPage: newSize });
  }
}
