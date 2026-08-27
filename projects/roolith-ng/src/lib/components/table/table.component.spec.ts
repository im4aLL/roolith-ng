import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import {
  ITableCellClickEvent,
  ITableCellEditEvent,
  ITableColumn,
  ITableData,
  ITableSortChangeEvent,
  ITableStickyConfig,
} from './data-access/table.interface';
import { vi } from 'vitest';

const mockColumns: ITableColumn[] = [
  { field: 'name', label: 'Name' },
  { field: 'age', label: 'Age' },
];

const mockTableData: ITableData[] = [
  { name: 'Alice', age: 30 },
  { name: 'Charlie', age: 25 },
  { name: 'Bob', age: 35 },
];

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    fixture.componentRef.setInput('data', mockTableData);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('_init / _setLocalItems', () => {
    it('should populate items and filteredItems from data input', () => {
      expect(component.items().length).toBe(3);
      expect(component.filteredItems().length).toBe(3);
    });

    it('should re-init items when data input changes', async () => {
      fixture.componentRef.setInput('data', [{ name: 'Dan', age: 40 }]);
      await fixture.whenStable();

      expect(component.items().length).toBe(1);
    });
  });

  describe('_setColumnData', () => {
    it('should build columnData from columns with sortable flag', async () => {
      fixture.componentRef.setInput('columns', mockColumns);
      fixture.componentRef.setInput('sortableColumns', ['name']);
      await fixture.whenStable();
      component['_setColumnData']();

      const nameCol = component.columnData().find((col) => col.field === 'name');
      const ageCol = component.columnData().find((col) => col.field === 'age');

      expect(nameCol?.sortable).toBe(true);
      expect(ageCol?.sortable).toBe(false);
    });

    it('should apply defaultSort direction to matching column', async () => {
      fixture.componentRef.setInput('columns', mockColumns);
      fixture.componentRef.setInput('sortableColumns', ['name']);
      fixture.componentRef.setInput('defaultSort', { field: 'name', direction: 'asc' });
      await fixture.whenStable();
      component['_setColumnData']();

      const nameCol = component.columnData().find((col) => col.field === 'name');

      expect(nameCol?.sortDirection).toBe('asc');
    });
  });

  describe('onSortChange', () => {
    beforeEach(async () => {
      fixture.componentRef.setInput('columns', mockColumns);
      fixture.componentRef.setInput('sortableColumns', ['name', 'age']);
      await fixture.whenStable();
      component['_setColumnData']();
    });

    it('should sort items ascending by field', () => {
      const event: ITableSortChangeEvent = { name: 'name', direction: 'asc' };
      component.onSortChange(event);

      expect(component.items()[0]['name']).toBe('Alice');
    });

    it('should sort items descending by field', () => {
      const event: ITableSortChangeEvent = { name: 'name', direction: 'desc' };
      component.onSortChange(event);

      expect(component.items()[0]['name']).toBe('Charlie');
    });

    it('should reset sort when direction is default', () => {
      component.onSortChange({ name: 'name', direction: 'asc' });
      component.onSortChange({ name: 'name', direction: 'default' });

      expect(component.items().length).toBe(3);
    });

    it('should reset other sortable columns to default when one is sorted', () => {
      component.onSortChange({ name: 'name', direction: 'asc' });
      component.onSortChange({ name: 'age', direction: 'desc' });

      const nameCol = component.columnData().find((col) => col.field === 'name');
      expect(nameCol?.sortDirection).toBe('default');
    });
  });

  describe('onPaginationChange', () => {
    beforeEach(async () => {
      const manyRows = Array.from({ length: 25 }, (_, index) => ({ name: `Item ${index}`, age: index }));
      fixture.componentRef.setInput('data', manyRows);
      fixture.componentRef.setInput('paginate', true);
      await fixture.whenStable();
    });

    it('should slice items to perPage on pageChange', () => {
      component.onPaginationChange({ type: 'pageChange', page: 2, rowsPerPage: 10 });

      expect(component.currentPage()).toBe(2);
      expect(component.filteredItems().length).toBe(10);
    });

    it('should update perPage and reset to page 1 on pageSizeChange', () => {
      component.onPaginationChange({ type: 'pageSizeChange', page: 1, rowsPerPage: 25 });

      expect(component.perPage()).toBe(25);
      expect(component.currentPage()).toBe(1);
    });
  });

  describe('getStickyColumnDataByIndex', () => {
    it('should return null when stickyConfig is not set', () => {
      expect(component.getStickyColumnDataByIndex(0)).toBeNull();
    });

    it('should return sticky data for a valid index', async () => {
      const config: ITableStickyConfig = { numberOfColumns: 2, width: [100, 150] };
      fixture.componentRef.setInput('stickyConfig', config);
      await fixture.whenStable();

      const result = component.getStickyColumnDataByIndex(1);

      expect(result?.index).toBe(1);
      expect(result?.width).toBe(150);
      expect(result?.left).toBe(100);
    });

    it('should return null for an out-of-range index', async () => {
      const config: ITableStickyConfig = { numberOfColumns: 1, width: [100] };
      fixture.componentRef.setInput('stickyConfig', config);
      await fixture.whenStable();

      expect(component.getStickyColumnDataByIndex(5)).toBeNull();
    });
  });

  describe('onCellClick', () => {
    it('should emit cellClickEvent with row and field', () => {
      const emitted: ITableCellClickEvent[] = [];
      component.cellClickEvent.subscribe((event) => emitted.push(event));
      const row = mockTableData[0];

      component.onCellClick(row, 'name');

      expect(emitted).toHaveLength(1);
      expect(emitted[0]).toEqual({ row, field: 'name' });
    });
  });

  describe('isCellClickable', () => {
    it('should return false when column is not clickable', () => {
      const column: ITableColumn = { field: 'name', label: 'Name', clickable: false };

      expect(component.isCellClickable(column, {})).toBe(false);
    });

    it('should return true when column is clickable and no skipClickableFn', () => {
      const column: ITableColumn = { field: 'name', label: 'Name', clickable: true };

      expect(component.isCellClickable(column, {})).toBe(true);
    });

    it('should return false when skipClickableFn returns true', () => {
      const row = { name: 'Alice' };
      const column: ITableColumn = { field: 'name', label: 'Name', clickable: true, skipClickableFn: () => true };

      expect(component.isCellClickable(column, row)).toBe(false);
    });

    it('should return true when skipClickableFn returns false', () => {
      const row = { name: 'Alice' };
      const column: ITableColumn = { field: 'name', label: 'Name', clickable: true, skipClickableFn: () => false };

      expect(component.isCellClickable(column, row)).toBe(true);
    });
  });

  describe('toggleRow / isRowExpanded', () => {
    it('should expand a row by index', () => {
      component.toggleRow(mockTableData[0], 0);

      expect(component.isRowExpanded(0)).toBe(true);
    });

    it('should collapse an already expanded row', () => {
      component.toggleRow(mockTableData[0], 0);
      component.toggleRow(mockTableData[0], 0);

      expect(component.isRowExpanded(0)).toBe(false);
    });

    it('should expand multiple rows independently', () => {
      component.toggleRow(mockTableData[0], 0);
      component.toggleRow(mockTableData[1], 1);

      expect(component.isRowExpanded(0)).toBe(true);
      expect(component.isRowExpanded(1)).toBe(true);
    });
  });

  describe('isShowExpandButton', () => {
    it('should return false when expandableRows is false', async () => {
      fixture.componentRef.setInput('expandableRows', false);
      await fixture.whenStable();

      expect(component.isShowExpandButton(mockTableData[0])).toBe(false);
    });

    it('should return true when expandableRows is true and no skip function', async () => {
      fixture.componentRef.setInput('expandableRows', true);
      await fixture.whenStable();

      expect(component.isShowExpandButton(mockTableData[0])).toBe(true);
    });

    it('should return false when skipExpandableRowFn returns true for the row', async () => {
      fixture.componentRef.setInput('expandableRows', true);
      fixture.componentRef.setInput('skipExpandableRowFn', () => true);
      await fixture.whenStable();

      expect(component.isShowExpandButton(mockTableData[0])).toBe(false);
    });
  });

  describe('_setItems', () => {
    it('should set items and filteredItems to the provided data', () => {
      const data: ITableData[] = [{ name: 'Dan', age: 40 }];
      component['_setItems'](data);

      expect(component.items()).toEqual(data);
      expect(component.filteredItems()).toEqual(data);
    });

    it('should set items and filteredItems to empty array when no argument is passed', () => {
      component['_setItems']();

      expect(component.items()).toEqual([]);
      expect(component.filteredItems()).toEqual([]);
    });

    it('should return the component instance for chaining', () => {
      const result = component['_setItems']([]);

      expect(result).toBe(component);
    });
  });

  describe('_getFilteredData', () => {
    it('should filter rows containing the search term in any column', () => {
      const result = component['_getFilteredData']('alice');

      expect(result.length).toBe(1);
      expect(result[0]['name']).toBe('Alice');
    });

    it('should return empty array when no match', () => {
      const result = component['_getFilteredData']('xyz');

      expect(result).toHaveLength(0);
    });

    it('should be case-insensitive (caller lowercases term)', () => {
      const result = component['_getFilteredData']('charlie');

      expect(result.length).toBe(1);
      expect(result[0]['name']).toBe('Charlie');
    });

    it('should skip null and undefined values without throwing', () => {
      fixture.componentRef.setInput('data', [
        { name: null, age: undefined },
        { name: 'Alice', age: 30 },
      ]);

      expect(() => component['_getFilteredData']('alice')).not.toThrow();
    });
  });

  describe('totalRecords', () => {
    it('should equal the number of items', () => {
      expect(component.totalRecords()).toBe(3);
    });
  });

  describe('_searchTermChanged', () => {
    it('should filter items matching the search term', () => {
      fixture.componentRef.setInput('searchTerm', 'alice');
      component['_searchTermChanged']();

      expect(component.items().length).toBe(1);
      expect(component.items()[0]['name']).toBe('Alice');
    });

    it('should return all items when search term is cleared', () => {
      fixture.componentRef.setInput('searchTerm', 'alice');
      component['_searchTermChanged']();
      fixture.componentRef.setInput('searchTerm', null);
      component['_searchTermChanged']();

      expect(component.items().length).toBe(3);
    });

    it('should return empty items when no rows match', () => {
      fixture.componentRef.setInput('searchTerm', 'xyz');
      component['_searchTermChanged']();

      expect(component.items().length).toBe(0);
    });
  });

  describe('_runSorting', () => {
    it('should return this for chaining when no active sort', () => {
      const result = component['_runSorting']();

      expect(result).toBe(component);
    });

    it('should sort items when a column has an active sort direction', async () => {
      fixture.componentRef.setInput('columns', mockColumns);
      fixture.componentRef.setInput('sortableColumns', ['name']);
      await fixture.whenStable();
      component['_setColumnData']();
      component.onSortChange({ name: 'name', direction: 'asc' });
      component.items.set([...component.data()]);
      component['_runSorting']();

      expect(component.items()[0]['name']).toBe('Alice');
    });
  });

  describe('_resetPagination', () => {
    it('should return this without paginating when paginate is false', () => {
      const result = component['_resetPagination']();

      expect(result).toBe(component);
    });

    it('should go to page 1 when paginate is true', async () => {
      const manyRows = Array.from({ length: 25 }, (_, idx) => ({ name: `Item ${idx}`, age: idx }));
      fixture.componentRef.setInput('data', manyRows);
      fixture.componentRef.setInput('paginate', true);
      await fixture.whenStable();
      component.currentPage.set(3);
      component['_resetPagination']();

      expect(component.currentPage()).toBe(1);
    });
  });

  describe('_validateCellEdit', () => {
    it('should return true when column has no editValidatorFn', () => {
      fixture.componentRef.setInput('columns', [{ field: 'name', label: 'Name' }]);
      const result = component['_validateCellEdit']({ field: 'name', newValue: 'Bob', oldValue: 'Alice', row: {} });

      expect(result).toBe(true);
    });

    it('should return true when editValidatorFn passes', () => {
      fixture.componentRef.setInput('columns', [{ field: 'name', label: 'Name', editValidatorFn: () => true }]);
      const result = component['_validateCellEdit']({ field: 'name', newValue: 'Bob', oldValue: 'Alice', row: {} });

      expect(result).toBe(true);
    });

    it('should return false when editValidatorFn fails', () => {
      fixture.componentRef.setInput('columns', [{ field: 'name', label: 'Name', editValidatorFn: () => false }]);
      const result = component['_validateCellEdit']({ field: 'name', newValue: '', oldValue: 'Alice', row: {} });

      expect(result).toBe(false);
    });
  });

  describe('_storeCellEdits', () => {
    it('should add a new edit to _cellEdits', () => {
      const row: ITableData = { name: 'Alice', _trackKey: 'key-1' };
      component['_storeCellEdits']({ field: 'name', newValue: 'Bob', oldValue: 'Alice', row });

      expect(component['_cellEdits']()).toHaveLength(1);
      expect(component['_cellEdits']()[0].newValue).toBe('Bob');
    });

    it('should update an existing edit for the same row and field', () => {
      const row: ITableData = { name: 'Alice', _trackKey: 'key-1' };
      component['_storeCellEdits']({ field: 'name', newValue: 'Bob', oldValue: 'Alice', row });
      component['_storeCellEdits']({ field: 'name', newValue: 'Charlie', oldValue: 'Alice', row });

      expect(component['_cellEdits']()).toHaveLength(1);
      expect(component['_cellEdits']()[0].newValue).toBe('Charlie');
    });

    it('should store separate edits for different fields', () => {
      const row: ITableData = { name: 'Alice', age: 30, _trackKey: 'key-1' };
      component['_storeCellEdits']({ field: 'name', newValue: 'Bob', oldValue: 'Alice', row });
      component['_storeCellEdits']({ field: 'age', newValue: 25, oldValue: 30, row });

      expect(component['_cellEdits']()).toHaveLength(2);
    });
  });

  describe('onCellFocus', () => {
    const createFocusEvent = (text: string, type: 'focus' | 'blur' = 'blur'): FocusEvent => {
      const el = document.createElement('div');
      let currentText = text;

      Object.defineProperty(el, 'innerText', {
        get: () => currentText,
        set: (value: string) => {
          currentText = value;
        },
        configurable: true,
      });

      return { target: el, type } as unknown as FocusEvent;
    };

    it('should clear placeholder text on focus when old value is empty', () => {
      fixture.componentRef.setInput('nullValuePlaceholder', '-');
      const row: ITableData = { name: null, _trackKey: 'key-1' };
      const focusEvent = createFocusEvent('-', 'focus');

      component.onCellFocus(row, 'name', focusEvent);

      expect((focusEvent.target as HTMLElement).innerText).toBe('');
    });

    it('should keep existing text on focus when old value is present', () => {
      fixture.componentRef.setInput('nullValuePlaceholder', '-');
      const row: ITableData = { name: 'ABC', _trackKey: 'key-1' };
      const focusEvent = createFocusEvent('ABC', 'focus');

      component.onCellFocus(row, 'name', focusEvent);

      expect((focusEvent.target as HTMLElement).innerText).toBe('ABC');
    });
  });

  describe('onCellEdit', () => {
    const createFocusEvent = (text: string, type: 'focus' | 'blur' = 'blur'): FocusEvent => {
      const el = document.createElement('div');
      let currentText = text;

      Object.defineProperty(el, 'innerText', {
        get: () => currentText,
        set: (value: string) => {
          currentText = value;
        },
        configurable: true,
      });

      return { target: el, type } as unknown as FocusEvent;
    };

    it('should emit cellEditEvent when value changes', () => {
      const emitted: ITableCellEditEvent[] = [];
      component.cellEditEvent.subscribe((event) => emitted.push(event));
      const row: ITableData = { name: 'Alice', _trackKey: 'key-1' };

      component.onCellEdit(row, 'name', createFocusEvent('Bob'));

      expect(emitted).toHaveLength(1);
      expect(emitted[0].newValue).toBe('Bob');
      expect(emitted[0].oldValue).toBe('Alice');
    });

    it('should not emit when new value equals old value', () => {
      const emitted: ITableCellEditEvent[] = [];
      component.cellEditEvent.subscribe((event) => emitted.push(event));
      const row: ITableData = { name: 'Alice', _trackKey: 'key-1' };

      component.onCellEdit(row, 'name', createFocusEvent('Alice'));

      expect(emitted).toHaveLength(0);
    });

    it('should not emit when old value is empty and blur value is empty', () => {
      fixture.componentRef.setInput('nullValuePlaceholder', '-');
      const emitted: ITableCellEditEvent[] = [];
      component.cellEditEvent.subscribe((event) => emitted.push(event));
      const row: ITableData = { name: null, _trackKey: 'key-1' };
      const blurEvent = createFocusEvent('', 'blur');

      component.onCellEdit(row, 'name', blurEvent);

      expect(emitted).toHaveLength(0);
      expect(row['name']).toBeNull();
      expect((blurEvent.target as HTMLElement).innerText).toBe('-');
    });

    it('should restore placeholder and skip validation when old value is empty and blur value is empty', () => {
      fixture.componentRef.setInput('nullValuePlaceholder', '-');
      fixture.componentRef.setInput('columns', [{ field: 'name', label: 'Name', editValidatorFn: () => false }]);

      const emitted: ITableCellEditEvent[] = [];
      component.cellEditEvent.subscribe((event) => emitted.push(event));

      const row: ITableData = { name: null, _trackKey: 'key-1' };
      const blurEvent = createFocusEvent('', 'blur');

      component.onCellEdit(row, 'name', blurEvent);

      expect(emitted).toHaveLength(0);
      expect(row['name']).toBeNull();
      expect(row['_isEdited']).toBeUndefined();
      expect((blurEvent.target as HTMLElement).innerText).toBe('-');
    });

    it('should mark the row as _isEdited', () => {
      const row: ITableData = { name: 'Alice', _trackKey: 'key-1' };

      component.onCellEdit(row, 'name', createFocusEvent('Bob'));

      expect(row['_isEdited']).toBe(true);
    });

    it('should not emit when editValidatorFn fails', () => {
      fixture.componentRef.setInput('columns', [{ field: 'name', label: 'Name', editValidatorFn: () => false }]);
      const emitted: ITableCellEditEvent[] = [];
      component.cellEditEvent.subscribe((event) => emitted.push(event));
      const row: ITableData = { name: 'Alice', _trackKey: 'key-1' };

      component.onCellEdit(row, 'name', createFocusEvent('Bob'));

      expect(emitted).toHaveLength(0);
    });

    it('should emit special characters unchanged when value changes', () => {
      const emitted: ITableCellEditEvent[] = [];
      component.cellEditEvent.subscribe((event) => emitted.push(event));
      const row: ITableData = { name: 'OLD', _trackKey: 'key-1' };

      component.onCellEdit(row, 'name', createFocusEvent('REF-001/A#1'));

      expect(emitted).toHaveLength(1);
      expect(emitted[0].newValue).toBe('REF-001/A#1');
      expect(row['name']).toBe('REF-001/A#1');
    });

    it('should remove error class when reverting invalid edit back to original value', async () => {
      fixture.componentRef.setInput('columns', [
        {
          field: 'name',
          label: 'Name',
          editValidatorFn: (value: string | number | null) => `${value ?? ''}`.length >= 3,
        },
      ]);
      await fixture.whenStable();

      const emitted: ITableCellEditEvent[] = [];
      component.cellEditEvent.subscribe((event) => emitted.push(event));

      const row: ITableData = { name: 'Alice', _trackKey: 'key-1' };
      const cellElement = document.createElement('div');
      cellElement.setAttribute('data-field', 'name');
      cellElement.setAttribute('data-key', 'key-1');
      document.body.appendChild(cellElement);

      try {
        cellElement.innerText = 'Bo';
        component.onCellEdit(row, 'name', { target: cellElement } as unknown as FocusEvent);

        expect(cellElement.classList.contains('rng-table__cell--edit-error')).toBe(true);

        cellElement.innerText = 'Alice';
        component.onCellEdit(row, 'name', { target: cellElement } as unknown as FocusEvent);

        expect(cellElement.classList.contains('rng-table__cell--edit-error')).toBe(false);
        expect(row['_isEdited']).toBeUndefined();
        expect(emitted).toHaveLength(0);
      } finally {
        cellElement.remove();
      }
    });
  });

  describe('clearAllEdits', () => {
    it('should clear _cellEdits signal', () => {
      const row: ITableData = { name: 'Alice', _trackKey: 'key-1' };
      component['_cellEdits'].set([{ field: 'name', newValue: 'Bob', oldValue: 'Alice', row }]);
      component.clearAllEdits();

      expect(component['_cellEdits']()).toHaveLength(0);
    });

    it('should remove _isEdited from filteredItems', () => {
      component.filteredItems.set([{ name: 'Bob', _isEdited: true, _trackKey: 'key-1' }]);
      component.clearAllEdits();

      expect(component.filteredItems()[0]['_isEdited']).toBeUndefined();
    });

    it('should leave items without _isEdited unchanged', () => {
      component.filteredItems.set([{ name: 'Alice', _trackKey: 'key-1' }]);
      component.clearAllEdits();

      expect(component.filteredItems()[0]['name']).toBe('Alice');
    });
  });

  describe('saveEdits', () => {
    it('should clear _cellEdits signal', () => {
      const row: ITableData = { name: 'Alice', _trackKey: 'key-1' };
      component['_cellEdits'].set([{ field: 'name', newValue: 'Bob', oldValue: 'Alice', row }]);
      component.saveEdits();

      expect(component['_cellEdits']()).toHaveLength(0);
    });

    it('should remove _isEdited from filteredItems', () => {
      component.filteredItems.set([{ name: 'Bob', _isEdited: true, _trackKey: 'key-1' }]);
      component.saveEdits();

      expect(component.filteredItems()[0]['_isEdited']).toBeUndefined();
    });

    it('should leave items without _isEdited unchanged', () => {
      component.filteredItems.set([{ name: 'Alice', _trackKey: 'key-1' }]);
      component.saveEdits();

      expect(component.filteredItems()[0]['name']).toBe('Alice');
    });
  });

  describe('cellValue', () => {
    it('should return empty string when value is null and no nullValuePlaceholder is set', () => {
      fixture.componentRef.setInput('nullValuePlaceholder', null);
      expect(component.cellValue(null)).toBe('');
    });

    it('should return empty string when value is undefined and no nullValuePlaceholder is set', () => {
      fixture.componentRef.setInput('nullValuePlaceholder', null);
      expect(component.cellValue(undefined)).toBe('');
    });

    it('should return the value as string when no nullValuePlaceholder is set', () => {
      fixture.componentRef.setInput('nullValuePlaceholder', null);
      expect(component.cellValue('Alice')).toBe('Alice');
    });

    it('should return the number value as string when no nullValuePlaceholder is set', () => {
      fixture.componentRef.setInput('nullValuePlaceholder', null);
      expect(component.cellValue(42)).toBe('42');
    });

    it('should return nullValuePlaceholder when value is null', () => {
      fixture.componentRef.setInput('nullValuePlaceholder', 'N/A');
      expect(component.cellValue(null)).toBe('N/A');
    });

    it('should return nullValuePlaceholder when value is undefined', () => {
      fixture.componentRef.setInput('nullValuePlaceholder', 'N/A');
      expect(component.cellValue(undefined)).toBe('N/A');
    });

    it('should return nullValuePlaceholder when value is an empty string', () => {
      fixture.componentRef.setInput('nullValuePlaceholder', 'N/A');
      expect(component.cellValue('')).toBe('N/A');
    });

    it('should return nullValuePlaceholder when value is a whitespace-only string', () => {
      fixture.componentRef.setInput('nullValuePlaceholder', 'N/A');
      expect(component.cellValue('   ')).toBe('N/A');
    });

    it('should return the value as string when nullValuePlaceholder is set and value is present', () => {
      fixture.componentRef.setInput('nullValuePlaceholder', 'N/A');
      expect(component.cellValue('Alice')).toBe('Alice');
    });

    it('should return the number value as string when nullValuePlaceholder is set and value is present', () => {
      fixture.componentRef.setInput('nullValuePlaceholder', 'N/A');
      expect(component.cellValue(0)).toBe('0');
    });
  });

  describe('_initializePagination', () => {
    it('should do nothing when paginate is false', async () => {
      const manyRows = Array.from({ length: 25 }, (_, index) => ({ name: `Item ${index}`, age: index }));
      fixture.componentRef.setInput('data', manyRows);
      fixture.componentRef.setInput('paginate', false);
      await fixture.whenStable();
      component['_initializePagination']();

      expect(component.filteredItems().length).toBe(25);
    });

    it('should do nothing when items is empty', async () => {
      fixture.componentRef.setInput('data', []);
      fixture.componentRef.setInput('paginate', true);
      await fixture.whenStable();
      component['_initializePagination']();

      expect(component.filteredItems().length).toBe(0);
    });

    it('should do nothing when items count fits within one page', async () => {
      fixture.componentRef.setInput('data', mockTableData);
      fixture.componentRef.setInput('paginate', true);
      await fixture.whenStable();
      component['_initializePagination']();

      // 3 items ≤ perPage (10) → no slicing
      expect(component.filteredItems().length).toBe(3);
    });

    it('should slice items to perPage on first page', async () => {
      const manyRows = Array.from({ length: 25 }, (_, index) => ({ name: `Item ${index}`, age: index }));
      fixture.componentRef.setInput('data', manyRows);
      fixture.componentRef.setInput('paginate', true);
      await fixture.whenStable();

      expect(component.filteredItems().length).toBe(10);
      expect(component.currentPage()).toBe(1);
    });

    it('should reset currentPage to 1 when it exceeds total pages', async () => {
      const manyRows = Array.from({ length: 25 }, (_, index) => ({ name: `Item ${index}`, age: index }));
      fixture.componentRef.setInput('data', manyRows);
      fixture.componentRef.setInput('paginate', true);
      await fixture.whenStable();

      component.currentPage.set(3);

      const fewerRows = Array.from({ length: 15 }, (_, index) => ({ name: `Item ${index}`, age: index }));
      fixture.componentRef.setInput('data', fewerRows);
      await fixture.whenStable();

      expect(component.currentPage()).toBe(1);
    });

    it('should keep currentPage when it is still within total pages', async () => {
      const manyRows = Array.from({ length: 25 }, (_, index) => ({ name: `Item ${index}`, age: index }));
      fixture.componentRef.setInput('data', manyRows);
      fixture.componentRef.setInput('paginate', true);
      await fixture.whenStable();

      component.currentPage.set(2);
      component['_initializePagination']();

      expect(component.currentPage()).toBe(2);
    });
  });
});
