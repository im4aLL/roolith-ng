# Table

## Import

```ts
import { TableComponent } from 'roolith-ng';
// or import the full set of table sub-components
import { IMPORT_TABLE } from 'roolith-ng';
```

```ts
@Component({
  imports: [...IMPORT_TABLE]
  // or: imports: [TableComponent, TableSortComponent, TableHeaderCheckboxComponent, TableCheckboxComponent, TableStickyDirective]
})
```

## Usage

### Basic table

```ts
import { ITableColumn, ITableData } from 'roolith-ng';

columns: ITableColumn[] = [
  { field: 'name', label: 'Name' },
  { field: 'role', label: 'Role' },
  { field: 'status', label: 'Status' },
];

data: ITableData[] = [
  { name: 'Alice', role: 'Engineer', status: 'Active' },
  { name: 'Bob', role: 'Manager', status: 'Inactive' },
];
```

```html
<rng-table
  [data]="data"
  [columns]="columns" />
```

### Sortable columns

```html
<rng-table
  [data]="data"
  [columns]="columns"
  [sortableColumns]="['name', 'status']"
  [defaultSort]="{ field: 'name', direction: 'asc' }"></rng-table>
```

### Paginated table

```html
<rng-table
  [data]="data"
  [columns]="columns"
  [paginate]="true"
  [perPage]="10"
  [maxPageItem]="5"></rng-table>
```

### Row selection

```ts
onSelectionChange(selectedRows: unknown[]): void {
  console.log(selectedRows);
}
```

```html
<rng-table
  [data]="data"
  [columns]="columns"
  [allowSelection]="true"
  (selectionChange)="onSelectionChange($event)"></rng-table>
```

### Column alignment and width

Use the optional `align` and `width` properties on a column to control text alignment and column width.

```ts
import { ITableColumn } from 'roolith-ng';

columns: ITableColumn[] = [
  { field: 'name', label: 'Name', width: 200 },
  { field: 'role', label: 'Role', align: 'center', width: 150 },
  { field: 'amount', label: 'Amount', align: 'right' },
];
```

```html
<rng-table
  [data]="data"
  [columns]="columns" />
```

### Column with transform function

Use the optional `func` property on a column to derive the displayed value from the full row object instead of reading a field directly.

> **Note:** Only use `func` when the transformation cannot be done upfront. For better performance, prefer transforming the data before passing it to `[data]` so the function is not called on every change detection cycle.

```ts
import { ITableColumn, ITableData } from 'roolith-ng';

columns: ITableColumn[] = [
  { field: 'name', label: 'Name' },
  {
    field: 'rate',
    label: 'Rate',
    func: (row: ITableData): string => `${row['rate']} ${row['rateType']}`,
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

      return `${from} – ${to} ${row['rangeUnit']}`;
    },
  },
];
```

```html
<rng-table
  [data]="data"
  [columns]="columns" />
```

### Limit cell content

Set `[limitCellContent]="true"` to truncate overflowing cell text with an ellipsis instead of wrapping. Useful when columns have a fixed width and you want to keep rows to a single line.

```html
<rng-table
  [data]="data"
  [columns]="columns"
  [limitCellContent]="true" />
```

### Truncate cell content with tooltip

Set `truncate` on a column definition to cap the displayed text at a character limit and show the full value in a tooltip on hover. Configure the tooltip width and position via the same object.

```ts
import { ITableColumn } from 'roolith-ng';

columns: ITableColumn[] = [
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
];
```

```html
<rng-table
  [data]="data"
  [columns]="columns" />
```

### Search filtering

```html
<rng-table
  [data]="data"
  [columns]="columns"
  [searchTerm]="searchQuery"></rng-table>
```

### Sticky columns

```ts
stickyConfig: ITableStickyConfig = {
  numberOfColumns: 2,
  width: [60, 200],
};
```

```html
<rng-table
  [data]="data"
  [columns]="columns"
  [stickyConfig]="stickyConfig"></rng-table>
```

### Sticky header

Set `[stickyHeader]="true"` to keep the table header fixed while the body scrolls. `maxHeight` is **required** when `stickyHeader` is enabled — it constrains the scrollable area.

```html
<rng-table
  [data]="data"
  [columns]="columns"
  [stickyHeader]="true"
  maxHeight="400px" />
```

### Clickable cells

Set `clickable: true` on a column definition to render its cells as links. When clicked, the `cellClickEvent` output emits an `ITableCellClickEvent` containing the row and the field name.

```ts
import { ITableColumn, ITableCellClickEvent } from 'roolith-ng';

columns: ITableColumn[] = [
  { field: 'name', label: 'Name', clickable: true },
  { field: 'role', label: 'Role' },
];

onCellClick(event: ITableCellClickEvent): void {
  console.log(event.field, event.row);
}
```

```html
<rng-table
  [data]="data"
  [columns]="columns"
  (cellClickEvent)="onCellClick($event)" />
```

#### Skip clickable for specific rows

Set `skipClickableFn` on a column to conditionally suppress the link for individual rows. When the function returns `true` for a row, that cell is rendered as plain text instead of a link.

```ts
columns: ITableColumn[] = [
  {
    field: 'name',
    label: 'Name',
    clickable: true,
    skipClickableFn: (row: ITableData): boolean => !row['isActive'],
  },
  { field: 'role', label: 'Role' },
];
```

### Editable cells

Set `editable: true` on a column definition to make its cells inline-editable. The cell renders as a `contenteditable` element. On blur, if the value has changed, the `cellEditEvent` output emits an `ITableCellEditEvent` with the old and new values. Input is restricted to alphanumeric characters and spaces.

```ts
import { ITableColumn, ITableCellEditEvent } from 'roolith-ng';

columns: ITableColumn[] = [
  { field: 'name', label: 'Name', editable: true },
  { field: 'role', label: 'Role' },
];

onCellEdit(event: ITableCellEditEvent): void {
  console.log(event.field, event.oldValue, event.newValue);
}
```

```html
<rng-table
  #tableRef
  [data]="data"
  [columns]="columns"
  (cellEditEvent)="onCellEdit($event)" />
```

#### Validating edited values

Set `editValidatorFn` on a column to validate the new value before it is committed. The function receives the current cell value and must return `true` to accept it. When it returns `false`, the cell is styled as invalid and `cellEditEvent` is **not** emitted.

```ts
columns: ITableColumn[] = [
  {
    field: 'quantity',
    label: 'Quantity',
    editable: true,
    editValidatorFn: (value: string | number | null): boolean => {
      const num = Number(value);
      return !isNaN(num) && num > 0;
    },
  },
];
```

Edited rows are tracked internally with an `_isEdited` flag. Use the public methods to save or discard all pending edits:

```ts
// get a reference to the component
public tableRef = viewChild<TableComponent>('tableRef');

// persist edits (clears the _isEdited flag, keeps new values)
this.tableRef()?.saveEdits();

// discard edits (reverts cells to their original values)
this.tableRef()?.clearAllEdits();
```

### Expandable rows

Set `[expandableRows]="true"` to add a toggle button in a leading column. Clicking it expands that row and renders the `#rngTableExpandedRow` template below it. If no template is provided, the row index is shown by default.

The expanded row template receives:

- `$implicit` — the row data object (`ITableData`)
- `columns` — the resolved column definitions (`ITableColumn[]`)
- `index` — the row index (`number`)

```html
<rng-table
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
</rng-table>
```

#### Skip expand button for specific rows

Pass a `[skipExpandableRowFn]` predicate to hide the expand toggle for rows that should not be expandable. When the function returns `true` for a row, the toggle button is not rendered for that row.

```ts
skipExpandRow = (row: ITableData): boolean => !row['hasDetails'];
```

```html
<rng-table
  [data]="data"
  [columns]="columns"
  [expandableRows]="true"
  [skipExpandableRowFn]="skipExpandRow">
  <ng-template
    #rngTableExpandedRow
    let-row>
    <p>{{ row['details'] }}</p>
  </ng-template>
</rng-table>
```

### Custom cell template

Use the `rngTableCell` directive on an `ng-template` to override the rendering of a specific column's cells. The value of `rngTableCell` must match the `field` of the target column. The directive only applies to non-editable, non-`func` cells — `editable` and `func` columns are unaffected.

The template context exposes:

- `$implicit` — the raw cell value (`row[field]`)
- `row` — the full row data object (`ITableData`)
- `field` — the column field key (`string`)

```ts
import { ITableColumn, TableCellDirective } from 'roolith-ng';

columns: ITableColumn[] = [
  { field: 'name', label: 'Name' },
  { field: 'rate', label: 'Rate' },
];
```

```html
<rng-table
  [data]="data"
  [columns]="columns">
  <ng-template
    rngTableCell="rate"
    let-value
    let-row="row">
    $ {{ value }}
  </ng-template>
</rng-table>
```

Multiple `rngTableCell` templates can be provided simultaneously — one per column field.

```html
<rng-table
  [data]="data"
  [columns]="columns">
  <ng-template
    rngTableCell="rate"
    let-value>
    $ {{ value }}
  </ng-template>
  <ng-template
    rngTableCell="status"
    let-value>
    <rng-badge [label]="value" />
  </ng-template>
</rng-table>
```

### Custom no-record template

Provide a `#rngTableNoRecord` template to display custom content when the table has no data. If omitted, the `noDataText` input value is shown instead.

```html
<rng-table
  [data]="data"
  [columns]="columns">
  <ng-template #rngTableNoRecord>
    <span>No results match your search.</span>
  </ng-template>
</rng-table>
```

## API

### `rng-table` Inputs

| Input                  | Type                                   | Required | Default              | Description                                                                          |
| ---------------------- | -------------------------------------- | -------- | -------------------- | ------------------------------------------------------------------------------------ |
| `data`                 | `ITableData[]`                         | Yes      | —                    | Array of row data objects                                                            |
| `columns`              | `ITableColumn[]`                       | No       | `[]`                 | Column definitions (field + label)                                                   |
| `sortableColumns`      | `string[]`                             | No       | `[]`                 | List of `field` values that should be sortable                                       |
| `defaultSort`          | `ITableSortColumn \| null`             | No       | `null`               | Initial sort state                                                                   |
| `paginate`             | `boolean`                              | No       | `false`              | Enables built-in pagination                                                          |
| `maxPageItem`          | `number`                               | No       | `10`                 | Max visible page number buttons in pagination                                        |
| `perPage`              | `PageSizeOptionType`                   | No       | `10`                 | Rows per page (two-way bindable via `[(perPage)]`)                                   |
| `allowSelection`       | `boolean`                              | No       | `false`              | Enables row checkboxes and header select-all                                         |
| `stickyConfig`         | `ITableStickyConfig \| null`           | No       | `null`               | Pins the first N columns with defined widths                                         |
| `searchTerm`           | `string \| null`                       | No       | `null`               | Filters visible rows by this term across all fields                                  |
| `limitCellContent`     | `boolean`                              | No       | `false`              | Truncates overflowing cell text with an ellipsis                                     |
| `stickyHeader`         | `boolean`                              | No       | `false`              | Pins the header row while the body scrolls                                           |
| `maxHeight`            | `string`                               | No\*     | `'300px'`            | Max height of the scrollable body. **Required when `stickyHeader` is `true`**        |
| `nullValuePlaceholder` | `string`                               | No       | `''`                 | Text shown when a cell value is `null` or `undefined`                                |
| `noDataText`           | `string`                               | No       | `'No records found'` | Message shown when no data is present and no `#rngTableNoRecord` template is provided |
| `expandableRows`       | `boolean`                              | No       | `false`              | Adds a leading toggle column to expand/collapse individual rows                      |
| `skipExpandableRowFn`  | `(row: ITableData) => boolean \| null` | No       | `null`               | When provided, hides the expand button for rows where the function returns `true`    |

### `rng-table` Outputs

| Output            | Payload                | Description                                                         |
| ----------------- | ---------------------- | ------------------------------------------------------------------- |
| `selectionChange` | `unknown[]`            | Emits the array of selected row data objects                        |
| `cellClickEvent`  | `ITableCellClickEvent` | Emits when a `clickable` cell is clicked                            |
| `cellEditEvent`   | `ITableCellEditEvent`  | Emits when an `editable` cell loses focus and its value has changed |

### `rng-table` Content templates

| Template reference    | Context variables                                                   | Description                                                           |
| --------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `#rngTableHeader`      | —                                                                   | Custom content rendered in the `<thead>` area                         |
| `#rngTableBody`        | `$implicit: ITableData`, `columns: ITableColumn[]`, `index: number` | Overrides the default row rendering                                   |
| `#rngTableFooter`      | —                                                                   | Custom content rendered below the table body                          |
| `#rngTableNoRecord`    | —                                                                   | Shown when the table has no data (overrides `noDataText`)             |
| `#rngTableExpandedRow` | `$implicit: ITableData`, `columns: ITableColumn[]`, `index: number` | Content rendered inside the expanded row; requires `[expandableRows]` |

### `rngTableCell` directive

Apply `rngTableCell="<field>"` to an `ng-template` inside `<rng-table>` to provide a custom cell renderer for a specific column. Can be used multiple times — once per column field.

| Context variable | Type         | Description                       |
| ---------------- | ------------ | --------------------------------- |
| `$implicit`      | `unknown`    | The raw cell value (`row[field]`) |
| `row`            | `ITableData` | The full row data object          |
| `field`          | `string`     | The column field key of the cell  |

### ITableColumn

| Property          | Type                                                                                       | Description                                                                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `field`           | `string`                                                                                   | Key in the row data object                                                                                                                     |
| `label`           | `string`                                                                                   | Column header display text                                                                                                                     |
| `func`            | `(row: ITableData) => string \| number \| null`                                            | Optional transform function; when provided, its return value is displayed instead of `row[field]`                                              |
| `align`           | `'left' \| 'center' \| 'right'`                                                            | Text alignment for both the header and cells (defaults to `'left'`)                                                                            |
| `width`           | `number`                                                                                   | Column width in pixels                                                                                                                         |
| `editable`        | `boolean`                                                                                  | Renders the cell as an inline-editable field; triggers `cellEditEvent` on change                                                               |
| `editValidatorFn` | `(value: string \| number \| null) => boolean`                                             | Optional validator called before committing an edit; when it returns `false` the cell is marked invalid and `cellEditEvent` is not emitted     |
| `clickable`       | `boolean`                                                                                  | Renders the cell as a link button; triggers `cellClickEvent` on click                                                                          |
| `skipClickableFn` | `(row: ITableData) => boolean`                                                             | When provided, suppresses the link for rows where the function returns `true`                                                                  |
| `truncate`        | `{ maxContentLength: number; tooltipWidth: string; tooltipPosition: TooltipPositionType }` | When set, truncates cell content at `maxContentLength` characters and shows the full value in a `rng-tooltip` with the given width and position |

### ITableCellClickEvent

| Property | Type         | Description                               |
| -------- | ------------ | ----------------------------------------- |
| `row`    | `ITableData` | The full row data object that was clicked |
| `field`  | `string`     | The column field key of the clicked cell  |

### ITableCellEditEvent

| Property   | Type                       | Description                              |
| ---------- | -------------------------- | ---------------------------------------- |
| `row`      | `ITableData`               | The full row data object that was edited |
| `field`    | `string`                   | The column field key of the edited cell  |
| `newValue` | `string \| number \| null` | The value after editing                  |
| `oldValue` | `string \| number \| null` | The value before editing                 |

### ITableSortColumn

| Property    | Type                           | Description            |
| ----------- | ------------------------------ | ---------------------- |
| `field`     | `string`                       | Column field to sort   |
| `direction` | `'asc' \| 'desc' \| 'default'` | Initial sort direction |

### ITableStickyConfig

| Property          | Type       | Description                                            |
| ----------------- | ---------- | ------------------------------------------------------ |
| `numberOfColumns` | `number`   | Number of columns to pin from the left                 |
| `width`           | `number[]` | Width in pixels for each sticky column (index-matched) |

### Public methods

| Method            | Description                                                                                    |
| ----------------- | ---------------------------------------------------------------------------------------------- |
| `saveEdits()`     | Commits all pending cell edits — removes the `_isEdited` flag while keeping the updated values |
| `clearAllEdits()` | Reverts all edited cells back to their original values and clears the `_isEdited` flag         |

---

## Export

The table ships with a strategy-based export system. Import the classes from `roolith-ng`:

```ts
import { TableExporter, TableCsvExportStrategy, TableJsonExportStrategy, ITableExportStrategy } from 'roolith-ng';
```

### TableExporter

`TableExporter` is the context class. Set a strategy, then call `download()` to trigger a browser file download, or `export()` to get the serialised string.

| Method                              | Description                                                                                                             |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `setStrategy(strategy)`             | Sets the active `ITableExportStrategy`                                                                                  |
| `export(data, columns)`             | Returns the serialized string using the active strategy                                                                 |
| `download(data, columns, filename)` | Serializes and triggers a `<a>` download. Extension and MIME type come from the strategy. Throws if no strategy is set. |

### Built-in strategies

| Class                     | Extension | MIME type                         | Description                                                             |
| ------------------------- | --------- | --------------------------------- | ----------------------------------------------------------------------- |
| `TableCsvExportStrategy`  | `csv`     | `text/csv;charset=utf-8;`         | Exports column-labelled CSV rows. Cells with commas/quotes are escaped. |
| `TableJsonExportStrategy` | `json`    | `application/json;charset=utf-8;` | Exports an array of objects keyed by camelCased column labels.          |

### Custom strategy

Implement `ITableExportStrategy` to add a new format:

```ts
import { ITableExportStrategy, ITableColumn, ITableData } from 'roolith-ng';

export class TableTsvExportStrategy implements ITableExportStrategy {
  public readonly extension = 'tsv';
  public readonly mimeType = 'text/tab-separated-values;charset=utf-8;';

  public export(data: ITableData[], columns: ITableColumn[]): string {
    const headers = columns.map((col) => col.label).join('\t');
    const rows = data.map((row) => columns.map((col) => row[col.field] ?? '').join('\t'));
    return [headers, ...rows].join('\n');
  }
}
```

### Usage example

```ts
import {
  IDropdownItem,
  ITableExportStrategy,
  TableCsvExportStrategy,
  TableExporter,
  TableJsonExportStrategy,
} from 'roolith-ng';

public onActionItemClick(item: IDropdownItem): void {
  switch (item.value) {
    case 'downloadCsv':
      this._download(new TableCsvExportStrategy());
      break;
    case 'downloadJson':
      this._download(new TableJsonExportStrategy());
      break;
  }
}

private _download(strategy: ITableExportStrategy): void {
  const exporter = new TableExporter();
  exporter.setStrategy(strategy);
  exporter.download(this.tableData(), this.tableColumns(), 'my_report');
}
```
