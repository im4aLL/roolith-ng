import { Component, computed, signal, viewChild } from '@angular/core';
import {
  BadgeComponent,
  ButtonComponent,
  ITableCellClickEvent,
  ITableCellEditEvent,
  ITableColumn,
  ITableData,
  ITableExportStrategy,
  ITableStickyConfig,
  SearchInputComponent,
  TableCellDirective,
  TableComponent,
  TableCsvExportStrategy,
  TableExporter,
  TableJsonExportStrategy,
} from '@im4all/roolith-ng';
import { CodeBlock } from '../../shared/code-block/code-block';
import { DocPager } from '../../shared/doc-pager/doc-pager';

@Component({
  selector: 'rng-doc-table',
  imports: [CodeBlock, DocPager, TableComponent, TableCellDirective, BadgeComponent, ButtonComponent, SearchInputComponent],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class Table {
  /**
   * Snippet for importing `TableComponent`.
   */
  protected readonly importSnippet = `import { TableComponent } from '@im4all/roolith-ng';

@Component({
  imports: [TableComponent]
})`;

  /**
   * Snippet for importing the full table set via `IMPORT_TABLE`.
   */
  protected readonly importAllSnippet = `import { IMPORT_TABLE } from '@im4all/roolith-ng';

@Component({
  imports: [...IMPORT_TABLE]
  // includes TableComponent, TableSortComponent, TableHeaderCheckboxComponent,
  // TableCheckboxComponent, TableStickyDirective, TableCellEditDirective, TableCellDirective
})`;

  /**
   * Basic columns definition.
   */
  protected readonly basicColumnsSnippet = `import { ITableColumn, ITableData } from '@im4all/roolith-ng';

columns: ITableColumn[] = [
  { field: 'name', label: 'Name' },
  { field: 'role', label: 'Role' },
  { field: 'status', label: 'Status' },
];

data: ITableData[] = [
  { name: 'Alice', role: 'Engineer', status: 'Active' },
  { name: 'Bob', role: 'Manager', status: 'Inactive' },
];`;

  /**
   * Basic template markup.
   */
  protected readonly basicSnippet = `<rng-table
  [data]="data"
  [columns]="columns" />`;

  /**
   * Sortable columns markup.
   */
  protected readonly sortableSnippet = `<rng-table
  [data]="data"
  [columns]="columns"
  [sortableColumns]="['name', 'status']"
  [defaultSort]="{ field: 'name', direction: 'asc' }"></rng-table>`;

  /**
   * Sortable TS setup - `ITableSortColumn`.
   */
  protected readonly sortableTsSnippet = `sortableColumns = ['name', 'status'];
defaultSort = { field: 'name', direction: 'asc' } as const;`;

  /**
   * Paginated table markup.
   */
  protected readonly paginatedSnippet = `<rng-table
  [data]="data"
  [columns]="columns"
  [paginate]="true"
  [perPage]="10"
  [maxPageItem]="5"></rng-table>`;

  /**
   * Row selection markup.
   */
  protected readonly selectionSnippet = `<rng-table
  [data]="data"
  [columns]="columns"
  [allowSelection]="true"
  (selectionChange)="onSelectionChange($event)"></rng-table>`;

  /**
   * Handler for `selectionChange`.
   */
  protected readonly selectionHandlerSnippet = `onSelectionChange(selectedRows: unknown[]): void {
  console.log(selectedRows);
}`;

  /**
   * Column alignment and width snippet.
   */
  protected readonly alignSnippet = `columns: ITableColumn[] = [
  { field: 'name', label: 'Name', width: 200 },
  { field: 'role', label: 'Role', align: 'center', width: 150 },
  { field: 'amount', label: 'Amount', align: 'right' },
];`;

  /**
   * Column `func` transform snippet.
   */
  protected readonly funcSnippet = `columns: ITableColumn[] = [
  { field: 'name', label: 'Name' },
  {
    field: 'rate',
    label: 'Rate',
    func: (row: ITableData): string => \`\${row['rate']} \${row['rateType']}\`,
  },
  {
    field: 'range',
    label: 'Range',
    func: (row: ITableData): string | null => {
      const from = row['rangeFrom'];
      const to = row['rangeTo'];

      if (from == null && to == null) {
        return null;
      }

      return \`\${from} - \${to} \${row['rangeUnit']}\`;
    },
  },
];`;

  /**
   * `limitCellContent` markup.
   */
  protected readonly limitCellSnippet = `<rng-table
  [data]="data"
  [columns]="columns"
  [limitCellContent]="true" />`;

  /**
   * Truncate with tooltip columns snippet.
   */
  protected readonly truncateSnippet = `columns: ITableColumn[] = [
  { field: 'name', label: 'Name' },
  {
    field: 'description',
    label: 'Description',
    truncate: {
      maxContentLength: 50,
      tooltipWidth: '200px',
      tooltipPosition: 'top',
    },
  },
];`;

  /**
   * Search filtering markup with `rng-search-input`.
   */
  protected readonly searchSnippet = `<rng-search-input [(value)]="searchQuery" placeholder="Search..." />

<rng-table
  [data]="data"
  [columns]="columns"
  [searchTerm]="searchQuery()"></rng-table>`;

  /**
   * Search TS setup with `rng-search-input`.
   */
  protected readonly searchTsSnippet = `import { SearchInputComponent } from '@im4all/roolith-ng';

searchQuery = signal<string | null>(null);`;

  /**
   * Sticky columns config snippet.
   */
  protected readonly stickySnippet = `stickyConfig: ITableStickyConfig = {
  numberOfColumns: 2,
  width: [60, 200],
};`;

  /**
   * Sticky columns template snippet.
   */
  protected readonly stickyTemplateSnippet = `<rng-table
  [data]="data"
  [columns]="columns"
  [stickyConfig]="stickyConfig"></rng-table>`;

  /**
   * Sticky header markup.
   */
  protected readonly stickyHeaderSnippet = `<rng-table
  [data]="data"
  [columns]="columns"
  [stickyHeader]="true"
  maxHeight="400px" />`;

  /**
   * Clickable cells columns snippet.
   */
  protected readonly clickableSnippet = `columns: ITableColumn[] = [
  { field: 'name', label: 'Name', clickable: true },
  { field: 'role', label: 'Role' },
];

onCellClick(event: ITableCellClickEvent): void {
  console.log(event.field, event.row);
}`;

  /**
   * Clickable cells template snippet.
   */
  protected readonly clickableTemplateSnippet = `<rng-table
  [data]="data"
  [columns]="columns"
  (cellClickEvent)="onCellClick($event)" />`;

  /**
   * Skip clickable snippet.
   */
  protected readonly skipClickableSnippet = `columns: ITableColumn[] = [
  {
    field: 'name',
    label: 'Name',
    clickable: true,
    skipClickableFn: (row: ITableData): boolean => !row['isActive'],
  },
  { field: 'role', label: 'Role' },
];`;

  /**
   * Editable cells columns snippet.
   */
  protected readonly editableSnippet = `columns: ITableColumn[] = [
  { field: 'name', label: 'Name', editable: true },
  { field: 'role', label: 'Role' },
];

onCellEdit(event: ITableCellEditEvent): void {
  console.log(event.field, event.oldValue, event.newValue);
}`;

  /**
   * Editable cells template snippet.
   */
  protected readonly editableTemplateSnippet = `<rng-table
  #tableRef
  [data]="data"
  [columns]="columns"
  (cellEditEvent)="onCellEdit($event)" />`;

  /**
   * Edit validator snippet.
   */
  protected readonly editValidatorSnippet = `columns: ITableColumn[] = [
  {
    field: 'quantity',
    label: 'Quantity',
    editable: true,
    editValidatorFn: (value: string | number | null): boolean => {
      const num = Number(value);
      return !isNaN(num) && num > 0;
    },
  },
];`;

  /**
   * Save / clear edits snippet.
   */
  protected readonly saveClearSnippet = `public tableRef = viewChild<TableComponent>('tableRef');

// persist edits (clears the _isEdited flag, keeps new values)
this.tableRef()?.saveEdits();

// discard edits (reverts cells to their original values)
this.tableRef()?.clearAllEdits();`;

  /**
   * Expandable rows template snippet.
   */
  protected readonly expandableSnippet = `<rng-table
  [data]="data"
  [columns]="columns"
  [expandableRows]="true">
  <ng-template
    #rngTableExpandedRow
    let-row
    let-columns="columns"
    let-rowIndex="index">
    <p>Details for row {{ rowIndex }}: {{ row | json }}</p>
  </ng-template>
</rng-table>`;

  /**
   * Skip expand snippet.
   */
  protected readonly skipExpandSnippet = `skipExpandRow = (row: ITableData): boolean => !row['hasDetails'];`;

  /**
   * Skip expand template snippet.
   */
  protected readonly skipExpandTemplateSnippet = `<rng-table
  [data]="data"
  [columns]="columns"
  [expandableRows]="true"
  [skipExpandableRowFn]="skipExpandRow">
  <ng-template
    #rngTableExpandedRow
    let-row>
    <p>{{ row['details'] }}</p>
  </ng-template>
</rng-table>`;

  /**
   * Custom cell template snippet.
   */
  protected readonly customCellSnippet = `<rng-table
  [data]="data"
  [columns]="columns">
  <ng-template
    rngTableCell="rate"
    let-value
    let-row="row">
    $ {{ value }}
  </ng-template>
  <ng-template
    rngTableCell="status"
    let-value>
    <rng-badge [label]="value" />
  </ng-template>
</rng-table>`;

  /**
   * Custom cell directive import snippet.
   */
  protected readonly customCellImportSnippet = `import { ITableColumn, TableCellDirective } from '@im4all/roolith-ng';

columns: ITableColumn[] = [
  { field: 'name', label: 'Name' },
  { field: 'rate', label: 'Rate' },
];`;

  /**
   * No-record template snippet.
   */
  protected readonly noRecordSnippet = `<rng-table
  [data]="data"
  [columns]="columns">
  <ng-template #rngTableNoRecord>
    <span>No results match your search.</span>
  </ng-template>
</rng-table>`;

  /**
   * Custom header / body / footer templates snippet.
   */
  protected readonly customTemplatesSnippet = `<!-- Custom header -->
<rng-table [data]="data" [columns]="columns">
  <ng-template #rngTableHeader>
    <tr><th>Custom header row</th></tr>
  </ng-template>
</rng-table>

<!-- Custom body row -->
<rng-table [data]="data" [columns]="columns">
  <ng-template #rngTableBody let-row let-columns="columns" let-rowIndex="index">
    <tr><td>{{ row | json }}</td></tr>
  </ng-template>
</rng-table>

<!-- Custom footer -->
<rng-table [data]="data" [columns]="columns">
  <ng-template #rngTableFooter>
    <tr><td colspan="3">Footer sum or actions</td></tr>
  </ng-template>
</rng-table>`;

  /**
   * Export - TableExporter usage snippet.
   */
  protected readonly exportImportSnippet = `import {
  TableExporter,
  TableCsvExportStrategy,
  TableJsonExportStrategy,
  ITableExportStrategy,
} from '@im4all/roolith-ng';`;

  /**
   * Export - download snippet.
   */
  protected readonly exportDownloadSnippet = `private _download(strategy: ITableExportStrategy): void {
  const exporter = new TableExporter();
  exporter.setStrategy(strategy);
  exporter.download(this.tableData(), this.tableColumns(), 'my_report');
}

onActionClick(item: IDropdownItem): void {
  switch (item.value) {
    case 'downloadCsv':
      this._download(new TableCsvExportStrategy());
      break;
    case 'downloadJson':
      this._download(new TableJsonExportStrategy());
      break;
  }
}`;

  /**
   * Export - export() vs download() snippet.
   */
  protected readonly exportVsDownloadSnippet = `const exporter = new TableExporter();
exporter.setStrategy(new TableCsvExportStrategy());

// returns CSV string
const csv = exporter.export(data, columns);

// triggers browser download as my_report.csv
exporter.download(data, columns, 'my_report');`;

  /**
   * Custom export strategy snippet.
   */
  protected readonly customStrategySnippet = `import { ITableExportStrategy, ITableColumn, ITableData } from '@im4all/roolith-ng';

export class TableTsvExportStrategy implements ITableExportStrategy {
  public readonly extension = 'tsv';
  public readonly mimeType = 'text/tab-separated-values;charset=utf-8;';

  public export(data: ITableData[], columns: ITableColumn[]): string {
    const headers = columns.map((col) => col.label).join('\\t');
    const rows = data.map((row) => columns.map((col) => row[col.field] ?? '').join('\\t'));
    return [headers, ...rows].join('\\n');
  }
}`;

  /**
   * Full example snippet.
   */
  protected readonly fullSnippet = `import {
  TableComponent,
  ITableColumn,
  ITableData,
  TableCellDirective,
  TableExporter,
  TableCsvExportStrategy,
} from '@im4all/roolith-ng';

@Component({
  imports: [TableComponent, TableCellDirective]
})
export class ExampleComponent {
  columns: ITableColumn[] = [
    { field: 'name', label: 'Name', clickable: true },
    { field: 'role', label: 'Role', align: 'center' },
    {
      field: 'description',
      label: 'Description',
      truncate: { maxContentLength: 40, tooltipWidth: '220px', tooltipPosition: 'top' },
    },
  ];

  data: ITableData[] = [
    { name: 'Alice', role: 'Engineer', description: 'Detailed notes about the user role and responsibilities...' },
  ];

  onCellClick(event: ITableCellClickEvent): void {
    console.log(event.field, event.row);
  }

  downloadCsv(): void {
    const exporter = new TableExporter();
    exporter.setStrategy(new TableCsvExportStrategy());
    exporter.download(this.data, this.columns, 'report');
  }
}`;

  /**
   * Full template snippet.
   */
  protected readonly fullTemplateSnippet = `<rng-table
  [data]="data"
  [columns]="columns"
  [sortableColumns]="['name']"
  [defaultSort]="{ field: 'name', direction: 'asc' }"
  [paginate]="true"
  [perPage]="10"
  [allowSelection]="true"
  [stickyHeader]="true"
  maxHeight="400px"
  [searchTerm]="searchQuery"
  (selectionChange)="onSelectionChange($event)"
  (cellClickEvent)="onCellClick($event)">
  <ng-template rngTableCell="role" let-value>
    <rng-badge [label]="value" />
  </ng-template>
  <ng-template #rngTableNoRecord>No records found.</ng-template>
  <ng-template #rngTableExpandedRow let-row>
    <p>{{ row | json }}</p>
  </ng-template>
</rng-table>`;

  // Live data - basic
  protected readonly basicColumns = signal<ITableColumn[]>([
    { field: 'name', label: 'Name' },
    { field: 'role', label: 'Role' },
    { field: 'status', label: 'Status' },
  ]);

  protected readonly basicData = signal<ITableData[]>([
    { name: 'Alice', role: 'Engineer', status: 'Active' },
    { name: 'Bob', role: 'Manager', status: 'Inactive' },
    { name: 'Carol', role: 'Designer', status: 'Active' },
    { name: 'David', role: 'Intern', status: 'Pending' },
  ]);

  // Sortable
  protected readonly sortableColumns = signal<ITableColumn[]>([
    { field: 'name', label: 'Name' },
    { field: 'role', label: 'Role' },
    { field: 'status', label: 'Status' },
  ]);

  protected readonly sortableData = signal<ITableData[]>([
    { name: 'Charlie', role: 'Designer', status: 'Pending' },
    { name: 'Alice', role: 'Engineer', status: 'Active' },
    { name: 'Bob', role: 'Manager', status: 'Active' },
    { name: 'David', role: 'Engineer', status: 'Inactive' },
    { name: 'Eve', role: 'Manager', status: 'Active' },
  ]);

  protected readonly sortableFields = signal<string[]>(['name', 'status']);
  protected readonly defaultSort = signal<{ field: string; direction: 'asc' | 'desc' | 'default' }>({
    field: 'name',
    direction: 'asc',
  });

  // Pagination
  protected readonly paginatedColumns = signal<ITableColumn[]>([
    { field: 'id', label: 'ID' },
    { field: 'name', label: 'Name' },
    { field: 'role', label: 'Role' },
    { field: 'status', label: 'Status' },
  ]);

  protected readonly paginatedData = signal<ITableData[]>(
    Array.from({ length: 24 }, (_, index) => ({
      id: index + 1,
      name: `User ${index + 1}`,
      role: ['Engineer', 'Manager', 'Designer', 'Intern'][index % 4],
      status: ['Active', 'Pending', 'Inactive'][index % 3],
    })),
  );

  // Selection
  protected readonly selectionColumns = signal<ITableColumn[]>([
    { field: 'name', label: 'Name' },
    { field: 'role', label: 'Role' },
    { field: 'status', label: 'Status' },
  ]);

  protected readonly selectionData = signal<ITableData[]>([
    { name: 'Alice', role: 'Engineer', status: 'Active' },
    { name: 'Bob', role: 'Manager', status: 'Inactive' },
    { name: 'Carol', role: 'Designer', status: 'Active' },
  ]);

  protected readonly selectedRows = signal<unknown[]>([]);

  // Alignment and width
  protected readonly alignColumns = signal<ITableColumn[]>([
    { field: 'name', label: 'Name', width: 180 },
    { field: 'role', label: 'Role', align: 'center', width: 140 },
    { field: 'amount', label: 'Amount', align: 'right', width: 120 },
  ]);

  protected readonly alignData = signal<ITableData[]>([
    { name: 'Alice Johnson', role: 'Engineer', amount: '$12,500' },
    { name: 'Bob Smith', role: 'Manager', amount: '$8,300' },
    { name: 'Carol Lee', role: 'Designer', amount: '$9,750' },
  ]);

  // Func transform
  protected readonly funcColumns = signal<ITableColumn[]>([
    { field: 'name', label: 'Name' },
    {
      field: 'rate',
      label: 'Rate',
      // eslint-disable-next-line dot-notation
      func: (row: ITableData): string => `${row['rate']} ${row['rateType']}`,
    },
    {
      field: 'range',
      label: 'Range',
      func: (row: ITableData): string | null => {
        // eslint-disable-next-line dot-notation
        const from = row['rangeFrom'];
        // eslint-disable-next-line dot-notation
        const to = row['rangeTo'];

        if (from === null && to === null) {
          return null;
        }

        // eslint-disable-next-line dot-notation
        return `${from} - ${to} ${row['rangeUnit']}`;
      },
    },
  ]);

  protected readonly funcData = signal<ITableData[]>([
    { name: 'Alpha', rate: 25, rateType: 'USD/h', rangeFrom: 10, rangeTo: 20, rangeUnit: 'km' },
    { name: 'Beta', rate: 40, rateType: 'EUR/h', rangeFrom: null, rangeTo: null, rangeUnit: 'km' },
    { name: 'Gamma', rate: 30, rateType: 'GBP/h', rangeFrom: 5, rangeTo: 15, rangeUnit: 'mi' },
  ]);

  // Limit cell content
  protected readonly limitColumns = signal<ITableColumn[]>([
    { field: 'name', label: 'Name', width: 140 },
    { field: 'bio', label: 'Bio', width: 220 },
    { field: 'role', label: 'Role', width: 120 },
  ]);

  protected readonly limitData = signal<ITableData[]>([
    {
      name: 'Alice Johnson',
      role: 'Engineer',
      bio: 'Extremely long biography text that would normally wrap onto multiple lines and increase row height beyond a single line.',
    },
    {
      name: 'Bob Smith',
      role: 'Manager',
      bio: 'Another very long piece of text describing responsibilities, achievements and ongoing projects in detail across many words.',
    },
  ]);

  // Truncate with tooltip
  protected readonly truncateColumns = signal<ITableColumn[]>([
    { field: 'name', label: 'Name', width: 140 },
    {
      field: 'description',
      label: 'Description',
      truncate: {
        maxContentLength: 40,
        tooltipWidth: '220px',
        tooltipPosition: 'top',
      },
    },
  ]);

  protected readonly truncateData = signal<ITableData[]>([
    {
      name: 'Alpha',
      description: 'This is a very long description that exceeds forty characters and will be truncated with a tooltip.',
    },
    { name: 'Beta', description: 'Short description.' },
    {
      name: 'Gamma',
      description: 'Another lengthy description that demonstrates the ellipsis and hover tooltip showing full content.',
    },
  ]);

  // Search
  protected readonly searchColumns = signal<ITableColumn[]>([
    { field: 'name', label: 'Name' },
    { field: 'role', label: 'Role' },
    { field: 'email', label: 'Email' },
  ]);

  protected readonly searchData = signal<ITableData[]>([
    { name: 'Alice', role: 'Engineer', email: 'alice@example.com' },
    { name: 'Bob', role: 'Manager', email: 'bob@example.com' },
    { name: 'Carol', role: 'Designer', email: 'carol@example.com' },
    { name: 'David', role: 'Engineer', email: 'david@example.com' },
  ]);

  protected readonly searchQuery = signal<string | null>(null);
  protected readonly filteredCount = computed(() => {
    const term = (this.searchQuery() ?? '').toLowerCase().trim();
    if (!term) return this.searchData().length;
    return this.searchData().filter((item) => Object.values(item).some((value) => String(value).toLowerCase().includes(term))).length;
  });

  // Sticky columns
  protected readonly stickyColumns = signal<ITableColumn[]>([
    { field: 'id', label: 'ID', width: 80 },
    { field: 'name', label: 'Name', width: 180 },
    { field: 'role', label: 'Role', width: 140 },
    { field: 'team', label: 'Team', width: 140 },
    { field: 'location', label: 'Location', width: 160 },
    { field: 'status', label: 'Status', width: 120 },
  ]);

  protected readonly stickyData = signal<ITableData[]>(
    Array.from({ length: 6 }, (_, index) => ({
      id: index + 1,
      name: `Member ${index + 1}`,
      role: ['Engineer', 'Designer', 'Manager'][index % 3],
      team: `Team ${String.fromCharCode(65 + (index % 3))}`,
      location: ['Dhaka', 'Berlin', 'Tokyo', 'New York'][index % 4],
      status: ['Active', 'Pending'][index % 2],
    })),
  );

  protected readonly stickyConfig = signal<ITableStickyConfig>({
    numberOfColumns: 2,
    width: [80, 180],
  });

  // Sticky header
  protected readonly stickyHeaderColumns = signal<ITableColumn[]>([
    { field: 'id', label: 'ID' },
    { field: 'name', label: 'Name' },
    { field: 'role', label: 'Role' },
    { field: 'status', label: 'Status' },
  ]);

  protected readonly stickyHeaderData = signal<ITableData[]>(
    Array.from({ length: 20 }, (_, index) => ({
      id: index + 1,
      name: `User ${index + 1}`,
      role: ['Engineer', 'Manager', 'Designer', 'QA'][index % 4],
      status: ['Active', 'Inactive'][index % 2],
    })),
  );

  // Clickable
  protected readonly clickableColumns = signal<ITableColumn[]>([
    { field: 'name', label: 'Name', clickable: true },
    { field: 'role', label: 'Role' },
    { field: 'status', label: 'Status' },
  ]);

  protected readonly clickableData = signal<ITableData[]>([
    { name: 'Alice', role: 'Engineer', status: 'Active' },
    { name: 'Bob', role: 'Manager', status: 'Inactive' },
    { name: 'Carol', role: 'Designer', status: 'Active' },
  ]);

  protected readonly lastClicked = signal<ITableCellClickEvent | null>(null);

  protected readonly skipClickableColumns = signal<ITableColumn[]>([
    {
      field: 'name',
      label: 'Name',
      clickable: true,
      // eslint-disable-next-line dot-notation
      skipClickableFn: (row: ITableData): boolean => !row['isActive'],
    },
    { field: 'role', label: 'Role' },
  ]);

  protected readonly skipClickableData = signal<ITableData[]>([
    { name: 'Alice', role: 'Engineer', isActive: true },
    { name: 'Bob', role: 'Manager', isActive: false },
    { name: 'Carol', role: 'Designer', isActive: true },
  ]);

  // Editable
  protected readonly editableColumns = signal<ITableColumn[]>([
    { field: 'name', label: 'Name', editable: true },
    { field: 'role', label: 'Role' },
  ]);

  protected readonly editableData = signal<ITableData[]>([
    { name: 'Alice', role: 'Engineer' },
    { name: 'Bob', role: 'Manager' },
    { name: 'Carol', role: 'Designer' },
  ]);

  protected readonly validatorColumns = signal<ITableColumn[]>([
    { field: 'name', label: 'Name', editable: true },
    {
      field: 'quantity',
      label: 'Quantity',
      editable: true,
      editValidatorFn: (value: string | number | null): boolean => {
        const num = Number(value);
        return !isNaN(num) && num > 0;
      },
    },
  ]);

  protected readonly validatorData = signal<ITableData[]>([
    { name: 'Widget A', quantity: 10 },
    { name: 'Widget B', quantity: 5 },
    { name: 'Widget C', quantity: 0 },
  ]);

  protected readonly lastEdit = signal<ITableCellEditEvent | null>(null);
  protected readonly editableTableRef = viewChild<TableComponent>('editableTableRef');

  // Expandable
  protected readonly expandableColumns = signal<ITableColumn[]>([
    { field: 'name', label: 'Name' },
    { field: 'role', label: 'Role' },
    { field: 'status', label: 'Status' },
  ]);

  protected readonly expandableData = signal<ITableData[]>([
    { name: 'Alice', role: 'Engineer', status: 'Active', details: 'Alice works on the core platform and owns the API layer.' },
    { name: 'Bob', role: 'Manager', status: 'Pending', details: 'Bob leads the product team and reviews sprint planning.' },
    { name: 'Carol', role: 'Designer', status: 'Active', details: 'Carol manages design systems and component libraries.' },
  ]);

  protected readonly conditionalExpandableData = signal<ITableData[]>([
    { name: 'Alice', role: 'Engineer', hasDetails: true, details: 'Has expandable details.' },
    { name: 'Bob', role: 'Manager', hasDetails: false, details: '' },
    { name: 'Carol', role: 'Designer', hasDetails: true, details: 'Also expandable.' },
  ]);

  // Custom cell template
  protected readonly customCellColumns = signal<ITableColumn[]>([
    { field: 'name', label: 'Name' },
    { field: 'rate', label: 'Rate' },
    { field: 'status', label: 'Status' },
  ]);

  protected readonly customCellData = signal<ITableData[]>([
    { name: 'Alice', rate: 45, status: 'Active' },
    { name: 'Bob', rate: 30, status: 'Pending' },
    { name: 'Carol', rate: 60, status: 'Inactive' },
  ]);

  // No record / placeholder
  protected readonly noRecordColumns = signal<ITableColumn[]>([
    { field: 'name', label: 'Name' },
    { field: 'role', label: 'Role' },
  ]);

  protected readonly emptyData = signal<ITableData[]>([]);

  protected readonly placeholderColumns = signal<ITableColumn[]>([
    { field: 'name', label: 'Name' },
    { field: 'note', label: 'Note' },
  ]);

  protected readonly placeholderData = signal<ITableData[]>([
    { name: 'Alice', note: null },
    { name: 'Bob', note: undefined },
    { name: 'Carol', note: 'Has a note' },
  ]);

  // Export
  protected readonly exportColumns = signal<ITableColumn[]>([
    { field: 'name', label: 'Name' },
    { field: 'role', label: 'Role' },
    { field: 'status', label: 'Status' },
  ]);

  protected readonly exportData = signal<ITableData[]>([
    { name: 'Alice', role: 'Engineer', status: 'Active' },
    { name: 'Bob', role: 'Manager', status: 'Inactive' },
    { name: 'Carol', role: 'Designer', status: 'Active' },
  ]);

  protected readonly lastExportPreview = signal<string>('');

  // Full demo
  protected readonly fullColumns = signal<ITableColumn[]>([
    { field: 'name', label: 'Name', clickable: true },
    { field: 'role', label: 'Role', align: 'center' },
    {
      field: 'description',
      label: 'Description',
      truncate: { maxContentLength: 36, tooltipWidth: '220px', tooltipPosition: 'top' },
    },
  ]);

  protected readonly fullData = signal<ITableData[]>([
    {
      name: 'Alice',
      role: 'Engineer',
      description: 'Owns the API layer and works on performance improvements across the platform.',
    },
    {
      name: 'Bob',
      role: 'Manager',
      description: 'Leads product planning and coordinates cross-team delivery milestones.',
    },
    {
      name: 'Carol',
      role: 'Designer',
      description: 'Maintains the design system and component documentation with accessibility focus.',
    },
    {
      name: 'David',
      role: 'QA',
      description: 'Ensures release quality through automation and manual testing strategies.',
    },
    {
      name: 'Eve',
      role: 'Engineer',
      description: 'Builds shared utilities and contributes to open source tooling.',
    },
    {
      name: 'Frank',
      role: 'Manager',
      description: 'Coordinates cross-functional initiatives and unblocks delivery teams.',
    },
    {
      name: 'Grace',
      role: 'Designer',
      description: 'Crafts user journeys and prototypes for new product surfaces.',
    },
    {
      name: 'Heidi',
      role: 'Engineer',
      description: 'Optimizes frontend performance and accessibility compliance.',
    },
    {
      name: 'Ivan',
      role: 'QA',
      description: 'Designs test plans and maintains the CI quality gates.',
    },
    {
      name: 'Judy',
      role: 'Manager',
      description: 'Owns roadmap planning and stakeholder communication.',
    },
    {
      name: 'Mallory',
      role: 'Engineer',
      description: 'Implements backend services and data pipelines.',
    },
    {
      name: 'Oscar',
      role: 'Designer',
      description: 'Maintains the icon set and visual language documentation.',
    },
  ]);

  protected readonly fullSearch = signal<string | null>(null);

  /**
   * Predicate to skip expand button for rows without details.
   *
   * @param row The row data object.
   *
   * @returns Whether the expand button should be hidden.
   */
  protected skipExpandFn(row: ITableData): boolean {
    // eslint-disable-next-line dot-notation
    return !row['hasDetails'];
  }

  /**
   * Handles `selectionChange` for the selection demo.
   *
   * @param selected The array of selected row data.
   *
   * @returns void
   */
  protected onSelectionChange(selected: unknown[]): void {
    this.selectedRows.set(selected);
  }

  /**
   * Handles `cellClickEvent` for the clickable demos.
   *
   * @param event The cell click payload with `row` and `field`.
   *
   * @returns void
   */
  protected onCellClick(event: ITableCellClickEvent): void {
    this.lastClicked.set(event);
  }

  /**
   * Handles `cellEditEvent` for the editable demos.
   *
   * @param event The edit payload with `field`, `oldValue` and `newValue`.
   *
   * @returns void
   */
  protected onCellEdit(event: ITableCellEditEvent): void {
    this.lastEdit.set(event);
  }

  /**
   * Updates the search term for the live search demo.
   *
   * @param value The new search string from the input.
   *
   * @returns void
   */
  protected onSearchChange(value: string | null): void {
    this.searchQuery.set(value);
  }

  /**
   * Updates the search term for the full demo.
   *
   * @param value The new search string.
   *
   * @returns void
   */
  protected onFullSearchChange(value: string | null): void {
    this.fullSearch.set(value);
  }

  /**
   * Clears the pending search filter.
   *
   * @returns void
   */
  protected clearSearch(): void {
    this.searchQuery.set(null);
  }

  /**
   * Clears the full demo search.
   *
   * @returns void
   */
  protected clearFullSearch(): void {
    this.fullSearch.set(null);
  }

  /**
   * Persists all pending inline edits in the editable table.
   *
   * @returns void
   */
  protected saveEditableEdits(): void {
    this.editableTableRef()?.saveEdits();
  }

  /**
   * Reverts all pending inline edits in the editable table.
   *
   * @returns void
   */
  protected clearEditableEdits(): void {
    this.editableTableRef()?.clearAllEdits();
  }

  /**
   * Generates a CSV preview string using `TableExporter`.
   *
   * @returns void
   */
  protected previewCsv(): void {
    const exporter = new TableExporter();
    exporter.setStrategy(new TableCsvExportStrategy());
    this.lastExportPreview.set(exporter.export(this.exportData(), this.exportColumns()));
  }

  /**
   * Generates a JSON preview string using `TableExporter`.
   *
   * @returns void
   */
  protected previewJson(): void {
    const exporter = new TableExporter();
    exporter.setStrategy(new TableJsonExportStrategy());
    this.lastExportPreview.set(exporter.export(this.exportData(), this.exportColumns()));
  }

  /**
   * Triggers a CSV browser download for the export demo data.
   *
   * @returns void
   */
  protected downloadCsv(): void {
    const exporter = new TableExporter();
    exporter.setStrategy(new TableCsvExportStrategy());
    exporter.download(this.exportData(), this.exportColumns(), 'table_report');
  }

  /**
   * Triggers a JSON browser download for the export demo data.
   *
   * @returns void
   */
  protected downloadJson(): void {
    const exporter = new TableExporter();
    exporter.setStrategy(new TableJsonExportStrategy());
    exporter.download(this.exportData(), this.exportColumns(), 'table_report');
  }

  /**
   * Demonstrates a custom export strategy without triggering a download.
   *
   * @param data The rows to export.
   * @param columns The column definitions.
   *
   * @returns The exported string.
   */
  protected exportWithCustomStrategy(data: ITableData[], columns: ITableColumn[]): string {
    const custom: ITableExportStrategy = {
      extension: 'tsv',
      mimeType: 'text/tab-separated-values;charset=utf-8;',
      export: (rows: ITableData[], cols: ITableColumn[]): string => {
        const headers = cols.map((col) => col.label).join('\t');
        const lines = rows.map((row) => cols.map((col) => row[col.field] ?? '').join('\t'));
        return [headers, ...lines].join('\n');
      },
    };

    const exporter = new TableExporter();
    exporter.setStrategy(custom);
    return exporter.export(data, columns);
  }

  /**
   * Handles custom edit key filtering for the preview export demo.
   *
   * Uses the custom strategy to generate the preview so callers can see TSV output.
   *
   * @returns void
   */
  protected previewTsv(): void {
    this.lastExportPreview.set(this.exportWithCustomStrategy(this.exportData(), this.exportColumns()));
  }
}
