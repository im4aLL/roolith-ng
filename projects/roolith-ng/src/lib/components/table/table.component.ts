import { NgTemplateOutlet, SlicePipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  contentChildren,
  DestroyRef,
  DOCUMENT,
  effect,
  inject,
  input,
  model,
  OnChanges,
  OnInit,
  output,
  signal,
  SimpleChanges,
  TemplateRef,
  viewChild,
  viewChildren,
} from '@angular/core';
import { outputToObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { uniqueId } from '../../utils';
import { orderBy } from 'lodash-es';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { IPaginationEvent, PageSizeOptionType } from '../pagination/data-access/pagination.interface';
import { PaginationComponent } from '../pagination/pagination.component';
import { TooltipComponent } from '../tooltip/tooltip.component';
import {
  ITabelCellTemplateData,
  ITableCellClickEvent,
  ITableCellEditEvent,
  ITableColumn,
  ITableColumnData,
  ITableData,
  ITableSortChangeEvent,
  ITableSortColumn,
  ITableStickyConfig,
  ITableStickyDirectiveData,
  SortDirectionType,
} from './data-access/table.interface';
import { DEFAULT_MAX_CELL_EDIT_LENGTH, TableCellEditDirective } from './directives/table-cell-edit.directive';
import { TableCellDirective } from './directives/table-cell.directive';
import { TableStickyDirective } from './directives/table-sticky.directive';
import { TableCheckboxComponent } from './table-checkbox/table-checkbox.component';
import { TableHeaderCheckboxComponent } from './table-header-checkbox/table-header-checkbox.component';
import { TableSortComponent } from './table-sort/table-sort.component';

@Component({
  selector: 'rng-table',
  imports: [
    NgTemplateOutlet,
    TableSortComponent,
    TableHeaderCheckboxComponent,
    TableCheckboxComponent,
    PaginationComponent,
    TableStickyDirective,
    ButtonComponent,
    IconComponent,
    TableCellEditDirective,
    TooltipComponent,
    SlicePipe,
  ],
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, AfterViewInit, OnChanges {
  public data = input.required<ITableData[], ITableData[]>({
    transform: (value: ITableData[]) => {
      return value.map((item) => ({
        ...item,
        _trackKey: uniqueId(),
      }));
    },
  });
  public columns = input<ITableColumn[]>([]);
  public readonly defaultMaxCellEditLength = DEFAULT_MAX_CELL_EDIT_LENGTH;

  /**
   * Local states
   */
  public items = signal<ITableData[]>([]);
  public filteredItems = signal<ITableData[]>([]);
  public columnData = signal<ITableColumnData[]>([]);
  private _destroyRef = inject(DestroyRef);

  /**
   * Sorting
   */
  public sortableColumns = input<string[]>([]);
  public defaultSort = input<ITableSortColumn | null>(null);

  /**
   * Pagination
   */
  public paginate = input<boolean>(false);
  public maxPageItem = input<number>(10);
  public perPage = model<PageSizeOptionType>(10);
  public totalRecords = computed(() => this.items().length);
  public currentPage = signal<number>(1);

  /**
   * Template content
   */
  public headerTemplate = contentChild<TemplateRef<void>>('rngTableHeader');
  public bodyTemplate =
    contentChild<TemplateRef<{ $implicit: ITableData; columns: ITableColumn[]; index: number }>>('rngTableBody');
  public footerTemplate = contentChild<TemplateRef<void>>('rngTableFooter');
  public noRecordTemplate = contentChild<TemplateRef<void>>('rngTableNoRecord');

  /**
   * Checkboxes for selection
   */
  public allowSelection = input<boolean>(false);
  public selectionChange = output<unknown[]>();
  private _headerCheckbox = contentChild(TableHeaderCheckboxComponent, { descendants: true });
  private _bodyCheckboxes = contentChildren(TableCheckboxComponent, { descendants: true });
  private _headerCheckboxView = viewChild(TableHeaderCheckboxComponent);
  private _bodyCheckboxesView = viewChildren(TableCheckboxComponent);

  private _selectedRows = computed(() => {
    const result: Array<unknown> = [];
    const checkboxes = this._getBodyCheckboxes();

    checkboxes.forEach((checkbox) => {
      const data = checkbox.value();

      if (checkbox.fieldValue()) {
        result.push(data);
      }
    });

    return result;
  });

  private _selectedRowsEffect = effect(() => {
    this.selectionChange.emit(this._selectedRows());
  });

  private _isAllChecked = computed(() => {
    const checkboxes = this._getBodyCheckboxes();

    return checkboxes.length > 0 && checkboxes.every((checkbox) => checkbox.fieldValue());
  });

  private _isSomeChecked = computed(() => {
    const checkboxes = this._getBodyCheckboxes();

    return checkboxes.some((checkbox) => checkbox.fieldValue());
  });

  private _headerCheckboxStateEffect = effect(() => {
    const headerCheckbox = this._getHeaderCheckbox();

    if (!headerCheckbox) {
      return;
    }

    const isAllChecked = this._isAllChecked();
    const isSomeChecked = this._isSomeChecked();

    headerCheckbox.fieldValue.set(isAllChecked);
    headerCheckbox.indeterminate.set(!isAllChecked && isSomeChecked);
  });

  /**
   * Sticky columns
   */
  public stickyConfig = input<ITableStickyConfig | null>(null);
  private _stickyColumnData = computed<ITableStickyDirectiveData[]>(() => {
    const config = this.stickyConfig();

    if (!config) {
      return [];
    }

    const { numberOfColumns, width } = config;
    const result: ITableStickyDirectiveData[] = [];

    for (let i = 0; i < numberOfColumns; i++) {
      result.push({
        index: i,
        width: width[i] ?? 0,
        left: width.slice(0, i).reduce((acc, curr) => acc + curr, 0),
      });
    }

    return result;
  });

  /**
   * Search
   */
  public searchTerm = input<string | null>(null);

  /**
   * Expandable rows
   */
  public expandableRows = input<boolean>(false);
  public expandedRowIndexes = signal<number[]>([]);
  public skipExpandableRowFn = input<((row: ITableData) => boolean) | null>(null);
  public expandedRowTemplate =
    contentChild<TemplateRef<{ $implicit: ITableData; columns: ITableColumn[]; index: number }>>('rngTableExpandedRow');

  /**
   * Cell Edit
   */
  public cellEditEvent = output<ITableCellEditEvent>();
  private _cellEdits = signal<ITableCellEditEvent[]>([]);
  private _document = inject(DOCUMENT);
  private _cellEditErrorClassName = 'rng-table__cell--edit-error';

  /**
   * Custom cell templates
   */
  private _customCellTemplates = contentChildren(TableCellDirective);
  public customCellTemplateData = computed<ITabelCellTemplateData>(() => {
    return this._customCellTemplates().reduce<ITabelCellTemplateData>((acc, directive) => {
      const fieldName = directive.rngTableCell();
      if (fieldName) {
        acc[fieldName] = directive.templateRef;
      }
      return acc;
    }, {});
  });

  /**
   * Misc
   */
  public nullValuePlaceholder = input<string | null>(null);
  public noDataText = input<string>('No records found');
  public limitCellContent = input<boolean>(false);
  public stickyHeader = input<boolean>(false);
  public maxHeight = input<string>('300px');
  public cellClickEvent = output<ITableCellClickEvent>();

  ngOnInit(): void {
    this._init();
  }

  ngAfterViewInit(): void {
    this._watchHeaderCheckbox();
  }

  /**
   * Respond to changes in input properties. If the data input changes, update the local items, column data, and pagination accordingly.
   *
   * @param changes SimpleChanges<TableComponent>
   * @return void
   */
  // eslint-disable-next-line complexity
  ngOnChanges(changes: SimpleChanges<TableComponent>): void {
    let isAnythingChanged = false;

    if (changes.data && !changes.data.isFirstChange()) {
      isAnythingChanged = true;
      this._init();
    }

    if ((changes.columns || changes.sortableColumns || changes.defaultSort) && !changes.columns?.isFirstChange()) {
      isAnythingChanged = true;
      this._initSorting();
    }

    if ((changes.paginate || changes.perPage) && !changes.paginate?.isFirstChange()) {
      isAnythingChanged = true;
      this._initializePagination();
    }

    if (changes.searchTerm && !changes.searchTerm.isFirstChange()) {
      isAnythingChanged = true;
      this._searchTermChanged();
    }

    if (isAnythingChanged) {
      this._resetSelection();
    }
  }

  /**
   * Initialize the table by setting local items, column data, and pagination based on the current input properties.
   *
   * @return void
   */
  private _init(): void {
    this._setLocalItems();
    this._setColumnData();
    this._initializePagination();
  }

  /**
   * Initialize sorting by building column data with sorting information
   * and triggering the initial sort based on the defaultSort input.
   *
   * @returns
   */
  private _initSorting(): void {
    const defaultSort = this.defaultSort();
    const columns = this.columns();

    if (!defaultSort || columns.length === 0) {
      return;
    }

    this._setColumnData();
  }

  /**
   * Set items base data
   *
   * @return void
   */
  private _setLocalItems(): void {
    this.items.set(this.data());
    this.filteredItems.set(this.data());
  }

  /* ====================================== Checkbox ================================================ */

  /**
   * If header checkbox is present, subscribe to its change event and update body checkboxes accordingly.
   * This allows for "select all" functionality in the table.
   *
   * @returns void
   */
  private _watchHeaderCheckbox(): void {
    const headerCheckbox = this._getHeaderCheckbox();

    if (!headerCheckbox) {
      return;
    }

    outputToObservable(headerCheckbox.changeEvent)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (isChecked) => {
          this._getBodyCheckboxes().forEach((checkbox) => checkbox.fieldValue.set(isChecked));
        },
        error: (err) => {
          console.error('Error in header checkbox change event subscription:', err);
        },
      });
  }

  /**
   * Get body checkbox component instances
   *
   * @returns TableCheckboxComponent[]
   */
  private _getBodyCheckboxes(): Readonly<TableCheckboxComponent[]> {
    return this.allowSelection() ? this._bodyCheckboxesView() : this._bodyCheckboxes();
  }

  /**
   * Get header checkbox component instance
   *
   * @returns TableHeaderCheckboxComponent
   */
  private _getHeaderCheckbox(): TableHeaderCheckboxComponent | null {
    const headerCheckbox = this.allowSelection() ? this._headerCheckboxView() : this._headerCheckbox();

    return headerCheckbox || null;
  }

  /**
   * Reset all body checkboxes to unchecked state.
   *
   * @returns this
   */
  private _resetSelection(): this {
    this._getBodyCheckboxes().forEach((checkbox) => checkbox.fieldValue.set(false));
    return this;
  }

  /* ====================================== Sorting ================================================ */

  /**
   * Build column data with sorting information and trigger sort
   *
   * @return void
   */
  private _setColumnData(): void {
    const defaultSort = this.defaultSort();
    const columnData: ITableColumnData[] = this.columns().map((col) => ({
      ...col,
      sortable: this.sortableColumns().includes(col.field),
      sortDirection: defaultSort && defaultSort.field === col.field ? defaultSort.direction : 'default',
    }));

    this.columnData.set(columnData);
    this._sortByColumnData();
  }

  /**
   * Sort the items based on the current sortDirection of the columns in columnData.
   * If no columns are sorted, it resets to the original data order.
   *
   * @returns void
   */
  private _sortByColumnData(): void {
    const columnData = this.columnData();

    const sortableColumn = columnData.find((col) => col.sortDirection !== 'default');
    if (!sortableColumn) {
      this.items.set(this.data());

      if (this.paginate()) {
        this._initializePagination();
      } else {
        this.filteredItems.set(this.data());
      }

      return;
    }

    this._sortItems(sortableColumn.field, sortableColumn.sortDirection);
  }

  /**
   * Sorts the items based on the specified field and direction. If direction is 'default', it resets the items to the original data order.
   *
   * @param field string
   * @param direction SortDirectionType
   * @returns void
   */
  private _sortItems(field: string, direction: SortDirectionType): void {
    const updateFilteredItems = (): void => {
      if (this.paginate()) {
        this._initializePagination();
      } else {
        this.filteredItems.set(this.items());
      }
    };

    if (direction === 'default') {
      this.items.set(this.data());
      updateFilteredItems();
      return;
    }

    const items = orderBy(this.items(), [field], [direction]);
    this.items.set(items);

    updateFilteredItems();
  }

  /**
   * Handler for sort change events emitted by TableSortComponent.
   * Updates the sortDirection of the corresponding column in columnData, and resets the sortDirection of all other columns to 'default'.
   *
   * @param event ITableSortChangeEvent
   * @return void
   */
  public onSortChange(event: ITableSortChangeEvent): void {
    const currentColumnData = this.columnData();

    const newColumnData: ITableColumnData[] = currentColumnData.map((col) => {
      if (col.field === event.name) {
        return { ...col, sortDirection: event.direction };
      } else if (col.sortable) {
        return { ...col, sortDirection: 'default' };
      } else {
        return col;
      }
    });

    this.columnData.set(newColumnData);
    this._sortByColumnData();
  }

  /* ====================================== Pagination ================================================ */

  /**
   * Initialize pagination by setting the filteredItems to the first page of items
   * based on the current perPage value.
   *
   * @returns void
   */
  private _initializePagination(): void {
    if (!this.paginate()) {
      return;
    }

    if (this.items().length === 0) {
      this.filteredItems.set([]);
      return;
    }

    if (this.items().length <= this.perPage()) {
      this.currentPage.set(1);
      this.filteredItems.set(this.items());
      return;
    }

    const totalPages = Math.ceil(this.items().length / this.perPage());
    const currentPage = this.currentPage();
    const newCurrentPage = currentPage > totalPages ? 1 : currentPage;
    this.currentPage.set(newCurrentPage);

    this._goToPage(this.currentPage());
  }

  /**
   * Handle pagination component change events
   *
   * @param event IPaginationEvent
   * @return void
   */
  public onPaginationChange(event: IPaginationEvent): void {
    switch (event.type) {
      case 'pageChange':
      case 'nextPage':
      case 'previousPage':
        this._goToPage(event.page || this.currentPage());
        break;
      case 'pageSizeChange':
        this._handleRowPerPageChange(event.rowsPerPage as PageSizeOptionType);
        break;
      default:
        break;
    }
  }

  /**
   * Change the current page of items based on the specified page number and current perPage value.
   *
   * @param page number
   * @return void
   */
  private _goToPage(page: number): void {
    this.currentPage.set(page);

    const startIndex = (page - 1) * this.perPage();
    const endIndex = startIndex + this.perPage();

    const paginatedItems = this.items().slice(startIndex, endIndex);
    this.filteredItems.set(paginatedItems);
    setTimeout(() => {
      this._syncCellEditsAfterPagination();
    });
  }

  /**
   * Handle changes to the number of rows per page. Updates the perPage state and resets to the first page.
   *
   * @param rowsPerPage PageSizeOptionType
   * @return void
   */
  private _handleRowPerPageChange(rowsPerPage: PageSizeOptionType): void {
    this.perPage.set(rowsPerPage);
    this._goToPage(1);
  }

  /* ====================================== Sticky ================================================ */

  /**
   * Get sticky column data by index. This is used to determine the styling and positioning of sticky columns in the table.
   *
   * @param index number
   * @returns ITableStickyDirectiveData | null
   */
  public getStickyColumnDataByIndex(index: number): ITableStickyDirectiveData | null {
    if (!this.stickyConfig()) {
      return null;
    }

    const stickyColumnData = this._stickyColumnData();
    return stickyColumnData[index] || null;
  }

  /* ====================================== Search ================================================ */

  private _searchTermChanged(): void {
    const searchTerm = this.searchTerm()?.toLowerCase() ?? null;

    if (!searchTerm) {
      this._init();
      return;
    }

    const filtered = this._getFilteredData(searchTerm);
    this._setItems(filtered)._runSorting()._resetPagination();
  }

  /**
   * Filter the data based on the provided search term.
   *
   * @param searchTerm string
   * @returns ITableData[]
   */
  private _getFilteredData(searchTerm: string): ITableData[] {
    return this.data().filter((item) => {
      return Object.values(item).some((value) => {
        if (value === null || value === undefined) {
          return false;
        }

        return String(value).toLowerCase().includes(searchTerm);
      });
    });
  }

  /**
   * Set the items and filteredItems signals with the provided data.
   *
   * @param data ITableData[]
   * @returns this
   */
  private _setItems(data: ITableData[] = []): this {
    this.items.set(data);
    this.filteredItems.set(data);

    return this;
  }

  /**
   * Re-apply sorting to the current items based on the current sort state in columnData.
   *
   * @returns this
   */
  private _runSorting(): this {
    const columnData = this.columnData();
    const sortableColumn = columnData.find((col) => col.sortDirection !== 'default');

    if (!sortableColumn) {
      return this;
    }

    this._sortItems(sortableColumn.field, sortableColumn.sortDirection);
    return this;
  }

  /**
   * Reset pagination to the first page.
   *
   * @returns this
   */
  private _resetPagination(): this {
    if (!this.paginate()) {
      return this;
    }

    this._goToPage(1);
    return this;
  }

  /* ====================================== Cell Click ================================================ */

  /**
   * Handle cell click events for clickable columns.
   *
   * @param row ITableData
   * @param field string
   * @returns void
   */
  public onCellClick(row: ITableData, field: string): void {
    this.cellClickEvent.emit({ row, field });
  }

  /**
   * Determine if a cell is clickable based on the column's clickable property
   * and an optional skip function that can conditionally disable clickability for specific rows.
   *
   * @param column ITableColumn
   * @param row ITableData
   * @returns boolean
   */
  public isCellClickable(column: ITableColumn, row: ITableData): boolean {
    if (!column.clickable) {
      return false;
    }

    if (!column.skipClickableFn) {
      return true;
    }

    return !column.skipClickableFn(row);
  }

  /* ====================================== Row Expand ================================================ */

  /**
   * Handle row expand events for expandable rows.
   *
   * @param row ITableData
   * @param rowIndex number
   * @returns void
   */
  public toggleRow(row: ITableData, rowIndex: number): void {
    const expandedIndexes = this.expandedRowIndexes();

    if (expandedIndexes.includes(rowIndex)) {
      this.expandedRowIndexes.set(expandedIndexes.filter((index) => index !== rowIndex));
    } else {
      this.expandedRowIndexes.set([...expandedIndexes, rowIndex]);
    }
  }

  /**
   * Check if a row is expanded based on its index.
   *
   * @param rowIndex number
   * @returns boolean
   */
  public isRowExpanded(rowIndex: number): boolean {
    return this.expandedRowIndexes().includes(rowIndex);
  }

  /**
   * Determine whether to show the expand button for a given row based on the expandableRows input and an optional skip function.
   *
   * @param row ITableData
   * @returns boolean
   */
  public isShowExpandButton(row: ITableData): boolean {
    return this.expandableRows() && (!this.skipExpandableRowFn() || !this.skipExpandableRowFn()?.(row));
  }

  /* ====================================== Row Cell Edit ================================================ */

  /**
   * Handle cell edit events for editable columns.
   *
   * @param row ITableData
   * @param field string
   * @param event FocusEvent
   * @returns void
   */
  public onCellEdit(row: ITableData, field: string, event: FocusEvent): void {
    const target = event.target as HTMLElement;
    const newValue = target.innerText.trim();
    const oldValue = row[field];
    const isOldValueEmpty = oldValue === null || oldValue === undefined || (typeof oldValue === 'string' && oldValue.trim() === '');
    const isUnchanged = `${newValue}` === `${oldValue}` || (isOldValueEmpty && newValue === '');

    const editEventData: ITableCellEditEvent = { newValue, oldValue, field, row };
    const isValidCellEdit = this._validateCellEdit(editEventData);

    if (isUnchanged) {
      target.innerText = `${this.cellValue(oldValue as string | number | null | undefined)}`;
      return;
    }

    if (!isValidCellEdit) {
      return;
    }

    if (newValue === '') {
      target.innerText = oldValue ?? this.nullValuePlaceholder();
    }

    row[field] = newValue;
    // eslint-disable-next-line dot-notation
    row['_isEdited'] = true;

    this.cellEditEvent.emit(editEventData);
    this._storeCellEdits(editEventData);
  }

  /**
   * Handle focus events for editable columns.
   *
   * @param row ITableData
   * @param field string
   * @param event FocusEvent
   * @returns void
   */
  public onCellFocus(row: ITableData, field: string, event: FocusEvent): void {
    const target = event.target as HTMLElement;
    const oldValue = row[field];
    const currentText = target.innerText.trim();
    const isOldValueEmpty =
      oldValue === null || oldValue === undefined || (typeof oldValue === 'string' && oldValue.trim() === '');

    this._clearPlaceholderText(target, currentText, isOldValueEmpty);
  }

  /**
   * Clear placeholder text on focus when the underlying value is empty.
   *
   * @param target HTMLElement
   * @param currentText string
   * @param isOldValueEmpty boolean
   * @returns void
   */
  private _clearPlaceholderText(target: HTMLElement, currentText: string, isOldValueEmpty: boolean): void {
    const placeholder = this.nullValuePlaceholder();
    const shouldClearPlaceholder = placeholder && isOldValueEmpty && currentText === placeholder.trim();

    if (!shouldClearPlaceholder) {
      return;
    }

    target.innerText = '';
  }

  /**
   * Reattach previous value to cell after pagination
   * This is necessary because pagination re-renders the cells, which can cause loss of unsaved edits.
   * By syncing cell edits after pagination, we ensure that any unsaved changes are preserved and
   * visible to the user even after navigating through pages.
   *
   * Note: This method is not needed if we disable pagination from parent component.
   *
   * @returns void
   */
  private _syncCellEditsAfterPagination(): void {
    const currentEdits = this._cellEdits();

    if (currentEdits.length === 0) {
      return;
    }

    currentEdits.forEach((edit) => {
      const cellElement = this._getCellElement(edit.row, edit.field);

      if (!cellElement) {
        return;
      }

      cellElement.setAttribute('data-previous-value', `${edit.oldValue ?? this.nullValuePlaceholder()}`);

      const currentValue = cellElement.innerText.trim();

      if (`${currentValue}` === `${edit.newValue}`) {
        return;
      }

      cellElement.innerText = `${edit.newValue ?? this.nullValuePlaceholder()}`;

      this._validateCellEdit(edit);
    });
  }

  /**
   * Validate cell edits using the optional editValidatorFn provided in the column definition.
   * If validation fails, it adds a visual indication of the error on the cell.
   *
   * @param editEvent ITableCellEditEvent
   * @returns boolean
   */
  private _validateCellEdit(editEvent: ITableCellEditEvent): boolean {
    const validatorFn = this.columns().find((col) => col.field === editEvent.field)?.editValidatorFn;

    if (!validatorFn) {
      return true;
    }

    const isValid = validatorFn(editEvent.newValue);

    if (!isValid) {
      this._addCellEditError(editEvent);
    } else {
      this._removeCellEditError(editEvent);
    }

    return isValid;
  }

  /**
   * Add cell edit error by adding a specific CSS class to the cell
   *
   * @param editEvent ITableCellEditEvent
   * @returns void
   */
  private _addCellEditError(editEvent: ITableCellEditEvent): void {
    const cellElement = this._getCellElement(editEvent.row, editEvent.field);

    if (!cellElement) {
      return;
    }

    cellElement.classList.add(this._cellEditErrorClassName);
  }

  /**
   * Remove cell edit error by removing the specific CSS class from the cell
   *
   * @param editEvent ITableCellEditEvent
   * @returns void
   */
  private _removeCellEditError(editEvent: ITableCellEditEvent): void {
    const cellElement = this._getCellElement(editEvent.row, editEvent.field);

    if (!cellElement) {
      return;
    }

    cellElement.classList.remove(this._cellEditErrorClassName);
  }

  /**
   * Get the cell element for a given row and field.
   *
   * @param row ITableData
   * @param field string
   * @returns HTMLElement | null
   */
  private _getCellElement(row: ITableData, field: string): HTMLElement | null {
    return this._document.querySelector(`div[data-field="${field}"][data-key="${row._trackKey}"]`);
  }

  /**
   * Store cell edits allows for tracking changes made to cells, which can be useful for features like bulk saving or discarding changes.
   *
   * @param editEvent ITableCellEditEvent
   * @returns void
   */
  private _storeCellEdits(editEvent: ITableCellEditEvent): void {
    // sync state
    // We need to save all the edits because after pagination we need to re-apply the unsaved edits to the new DOM elements.
    // If we only save the latest edit, we would lose all previous unsaved edits after pagination.
    const currentEdits = this._cellEdits();
    const existingEditIndex = currentEdits.findIndex(
      (edit) => edit.row._trackKey === editEvent.row._trackKey && edit.field === editEvent.field,
    );

    if (existingEditIndex !== -1) {
      currentEdits[existingEditIndex] = editEvent;
    } else {
      currentEdits.push(editEvent);
    }

    this._cellEdits.set([...currentEdits]);

    // DOM update
    const cellElement = this._getCellElement(editEvent.row, editEvent.field);
    const hasPreviousValueAttribute = cellElement?.hasAttribute('data-previous-value');

    if (!cellElement || hasPreviousValueAttribute) {
      return;
    }

    cellElement.setAttribute('data-previous-value', `${editEvent.oldValue ?? this.nullValuePlaceholder()}`);
  }

  /**
   * Clear all edits by removing the _isEdited property from each item in the items signal.
   * This can be used to reset the edit state of the table after saving or discarding changes.
   *
   * @returns void
   */
  public clearAllEdits(): void {
    const oldValueElements = this._document.querySelectorAll(`div[data-previous-value]`);
    oldValueElements.forEach((element) => {
      const previousValue = element.getAttribute('data-previous-value');
      element.textContent = previousValue ?? this.nullValuePlaceholder();
      element.removeAttribute('data-previous-value');
      element.classList.remove(this._cellEditErrorClassName);
    });

    this.filteredItems.update((items) => {
      return items.map((item) => {
        if (!item._isEdited) {
          return item;
        }

        const newItem = { ...item };
        delete newItem._isEdited;
        return newItem;
      });
    });

    this._cellEdits.set([]);
  }

  /**
   * Save edits by clearing the cellEdits signal and removing the _isEdited property from each item in the filteredItems signal.
   *
   * @returns void
   */
  public saveEdits(): void {
    const oldValueElements = this._document.querySelectorAll(`div[data-previous-value]`);
    oldValueElements.forEach((element) => {
      element.removeAttribute('data-previous-value');
      element.classList.remove(this._cellEditErrorClassName);
    });

    this._cellEdits.set([]);

    this.filteredItems.update((items) => {
      return items.map((item) => {
        if (item._isEdited) {
          const newItem = { ...item };
          delete newItem._isEdited;
          return newItem;
        }

        return item;
      });
    });
  }

  /* ====================== Misc ====================== */
  /**
   * Return the display value for a cell, using the nullValuePlaceholder if the value is null, undefined, or an empty string.
   *
   * @param value string | null | undefined | number
   * @returns string | number
   */
  public cellValue(value: string | null | undefined | number): string | number {
    if (!this.nullValuePlaceholder()) {
      return `${value ?? ''}`;
    }

    if (value === null || value === undefined || (typeof value === 'string' && value.trim() === '')) {
      return `${this.nullValuePlaceholder()}`;
    }

    return `${value}`;
  }
}
