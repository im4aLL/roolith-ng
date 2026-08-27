import { ITableColumn, ITableData } from '../table.interface';
import { ITableExportStrategy } from './table-exporter.interface';

export class TableCsvExportStrategy implements ITableExportStrategy {
  public readonly extension = 'csv';
  public readonly mimeType = 'text/csv;charset=utf-8;';

  /**
   * Serialize an array of records to a CSV string.
   *
   * The first row is derived from the object keys of the first record.
   * @returns string
   */
  public export(data: ITableData[], columns: ITableColumn[]): string {
    if (data.length === 0 || columns.length === 0) {
      return '';
    }

    const transformedData = this._createCollectionForExport(columns, data);
    const headers = Object.keys(transformedData[0]);
    const headerRow = headers.map((header) => this._escapeCell(header)).join(',');
    const dataRows = transformedData.map((row) =>
      headers.map((header) => this._escapeCell(String(row[header] ?? ''))).join(','),
    );

    return [headerRow, ...dataRows].join('\r\n');
  }

  /**
   * Wraps a cell value in quotes if it contains a comma, quote, or newline.
   *
   * @param value string
   * @returns string
   */
  private _escapeCell(value: string): string {
    const hasSpecialChars = /[",\r\n]/.test(value);

    if (!hasSpecialChars) {
      return value;
    }

    return `"${value.replace(/"/g, '""')}"`;
  }

  /**
   * Transforms the original data and columns into a new collection suitable for export.
   *
   * @param columns ITableColumn[]
   * @param data ITableData[]
   * @returns ITableData[]
   */
  private _createCollectionForExport(columns: ITableColumn[], data: ITableData[]): ITableData[] {
    return data.map((row) =>
      columns.reduce<ITableData>((acc, column) => ({ ...acc, [column.label]: row[column.field] }), {}),
    );
  }
}
